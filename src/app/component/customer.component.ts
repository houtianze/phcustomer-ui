import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridColumn } from 'ag-grid-angular';
import { CellClickedEvent, ColumnApi, GridApi, GridReadyEvent, CellValueChangedEvent } from 'ag-grid-community';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Customer, CustomerService } from '../service/customer.service';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit, AfterViewInit {
  private columnDefs = [
    {headerName: 'Name', field: 'name', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true},
    {headerName: 'Creation Time', field: 'creationTime', width: 240, sortable: true, filter: true},
    {headerName: 'Notes', field: 'notesButton', width: 64}
  ]
  @ViewChild('agGrid')
  private agGrid: any
  // private gridApi: GridApi
  // private columnApi: ColumnApi
  private customers: Observable<Customer[]>

  constructor(
    private router: Router,
    private commonService: CommonService,
    private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers()
      .pipe(map(customers => customers.map(customer => {
        (<any>customer).notesButton = 'Click...';
        return customer;})));
  }

  ngAfterViewInit(): void {
    console.log(this.agGrid)
  }

  onGridReady(grEvent: GridReadyEvent) {
    // this.gridApi = grEvent.api;
    // this.columnApi = grEvent.columnApi;
  }

  onCellClicked(ccEvent: CellClickedEvent) {
    if (ccEvent.colDef.headerName === 'Notes') {
      // this.router.navigateByUrl(`/notes/${ccEvent.data._links.notes}`)
      this.commonService.customer = ccEvent.data
      var customerId = ccEvent.data.id
      this.router.navigateByUrl(`/notes/${customerId}`)
    }
  }

  onCellValueChanged(event: CellValueChangedEvent) {
    this.customerService.saveCustomer(event.data)
  }
}
