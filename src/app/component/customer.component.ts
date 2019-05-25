import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { } from 'ag-grid-angular';
import { CellClickedEvent, ColumnApi, GridApi, GridReadyEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, CustomerService } from '../service/customer.service';


@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  private columnDefs = [
    {headerName: 'Name', field: 'name', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true},
    {headerName: 'Creation Time', field: 'creationTime', width: 240, sortable: true, filter: true},
    {headerName: 'Notes', field: 'notesButton', width: 64}
  ]
  private customers: Observable<Customer[]>
  private gridApi: GridApi
  private columnApi: ColumnApi

  constructor(
    private router: Router,
    private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers()
      .pipe(map(customers => customers.map(customer => {
        (<any>customer).notesButton = 'Click...';
        return customer;})));
  }

  onGridReady(grEvent: GridReadyEvent) {
    this.gridApi = grEvent.api;
    this.columnApi = grEvent.columnApi;
  }

  onCellClicked(ccEvent: CellClickedEvent) {
    if (ccEvent.colDef.headerName === 'Notes') {
      // this.router.navigateByUrl(`/notes/${ccEvent.data._links.notes}`)
      var customerHRef: string[] = ccEvent.data._links.customer.href.split('/')
      var customerId = customerHRef[customerHRef.length - 1]
      this.router.navigateByUrl(`/notes/${customerId}`)
    }
  }
}
