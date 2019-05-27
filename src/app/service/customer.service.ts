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
  id: number
  name: string
  email: string
  phone: string
  status: Status
  _links: Links
}

export interface Note {
  id: number
  text: string
  _links: Links
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

  getCustomer(customerId: number): Observable<Customer> {
    return <Observable<Customer>> this.http.get(environment.apiServer + `/customers/${customerId}`)
  }

  saveCustomer(customer: Customer) {
    return this.http.put<Customer>(environment.apiServer + `/customers/${customer.id}`, customer).subscribe()
  }

  getNotes(): Observable<Note[]> {
    return this.http.get(environment.apiServer + '/notes')
      .pipe(map(halToNoteList))
  }

  getNotesForCustomer(customerId: number): Observable<Note[]> {
    return this.http.get(environment.apiServer + `/customers/${customerId}/notes`)
      .pipe(map(halToNoteList))
  }

  addNoteForCustomer(note: Note, customerId: number) {
    // https://www.baeldung.com/spring-data-rest-relationships
    return this.http.post<Note>(environment.apiServer + '/notes', note).subscribe(newNote =>{
      const customerHref = environment.apiServer + `/customers/${customerId}`
      this.http.put(
        newNote._links.self.href + '/customer',
        customerHref,
        { headers: {
          'Content-Type': 'text/uri-list',
          'Accept': '*/*'} }).subscribe(x => window.location.reload())
    })
  }

  removeNote(noteId: number) {
    return this.http.delete(environment.apiServer + `/notes/${noteId}`)
  }

  saveNote(note: Note) {
    return this.http.put<Note>(environment.apiServer + `/notes/${note.id}`, note)
  }
}

function halToCustomerList(obj) {
  return obj._embedded.customers
}

function halToNoteList(obj) {
  return obj._embedded.notes
}
