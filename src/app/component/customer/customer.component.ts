import { Component, OnInit, Input } from '@angular/core';
import { CustomerService, Customer } from '../../service/customer.service'
import { Observable } from 'rxjs';

import { } from 'ag-grid-angular'
import { map } from 'rxjs/operators';
import { clearResolutionOfComponentResourcesQueue } from '@angular/core/src/metadata/resource_loading';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {
  columnDefs = [
    {headerName: 'Name', field: 'name', sortable: true, filter: true},
    {headerName: 'Email', field: 'email', sortable: true, filter: true},
    {headerName: 'Phone', field: 'phone', sortable: true, filter: true},
    {headerName: 'Status', field: 'status', sortable: true, filter: true, editable: true},
    {headerName: 'Creation Time', field: 'creationTime', width: 240, sortable: true, filter: true},
    {headerName: 'Notes', field: 'notesButton', width: 64}
  ]

  customers: Observable<Customer[]>

  constructor(private customerService: CustomerService) {}

  ngOnInit() {
    this.customers = this.customerService.getCustomers()
      .pipe(map(customers => customers.map(customer => {
        customer.notesButton = 'xxx';
        return customer;})));
  }
}
