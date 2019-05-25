import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators'

import { environment } from '../../environments/environment'
import { Observable } from 'rxjs';

export enum Status {
  Prospective = "prospective",
  Current = "current",
  NonActive = "non-active"
}

export interface HRef {
  href: string
}

export interface Links {
  customer: HRef
  notes: HRef
  self: HRef
}

export interface Customer {
  name: string,
  email: string,
  phone: string,
  status: Status,
  _links: Links
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

  getCustomers(): Observable<Customer[]> {
    return this.http.get(environment.apiServer + '/customers')
      .pipe(map(halToCustomerList))
  }

  getNotes(): Observable<Note[]> {
    return this.http.get(environment.apiServer + '/notes')
      .pipe(map(halToNoteList))
  }

  getNotesForCustomer(customerId): Observable<Note[]> {
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
