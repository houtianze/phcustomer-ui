import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'

export enum Status {
  Prospective = "prospective",
  Current = "current",
  NonActive = "non-active"
}

export interface Customer {
  name: string,
  email: string,
  phone: string,
  status: Status
}

export interface Note {
  text: string
}

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  constructor(private http: HttpClient) { }
  getHal() {
    return this.http.get(environment.apiServer)
  }

  getCustomers() {
    return this.http.get(environment.apiServer + '/customers')
      .pipe(map(halToCustomerList))
  }

  getNotes() {
    return this.http.get(environment.apiServer + '/notes')
      .pipe(map(halToNoteList))
  }

  getNotesForCustomer(customerId: number) {
    return this.http.get(environment.apiServer + `/customers/${customerId}/notes`)
      .pipe(map(halToNoteList))
  }
}

function halToCustomerList(obj) {
  return obj._embedded.customers
}

function halToNoteList(obj) {
  return obj._embedded.notes
}
