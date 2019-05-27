import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CustomerService, Note, Customer } from '../service/customer.service';
import { Observable } from 'rxjs';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  title = "Notes"
  customer: Customer
  notes$: Observable<Note[]>

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.commonService.setTitle(this.title)
    let customerId = parseInt(this.route.snapshot.paramMap.get('customerId'))
    this.customerService.getCustomer(customerId).subscribe(customer => {
      this.customer = customer
    })
    // this.customer = this.commonService.customer
    // if (this.customer) {
    //   this.title = `Notes for ${this.customer.name}`
    // }
    // console.log("got id:", customerId)
    this.notes$ = this.customerService.getNotesForCustomer(customerId)
  }

  addNote(text: string) {
    const note = {id: null, text: text, _links: null}
    this.customerService.addNoteForCustomer(note, this.customer.id)
  }

  removeNote(noteId: string) {
    this.customerService.removeNote(parseInt(noteId)).subscribe(x => window.location.reload())
  }

  saveNote(id: string, text: string) {
    const note = {id: parseInt(id), text: text, _links: null}
    this.customerService.saveNote(note).subscribe(x => window.location.reload())
  }
}
