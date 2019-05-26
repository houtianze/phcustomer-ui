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
  notes: Observable<Note[]>

  constructor(
    private route: ActivatedRoute,
    private commonService: CommonService,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.customer = this.commonService.customer
    if (this.customer) {
      this.title = `Notes for ${this.customer.name}`
    }
    this.commonService.setTitle(this.title)
    const customerId = this.route.snapshot.paramMap.get('customerId')
    // console.log("got id:", customerId)
    this.notes = this.customerService.getNotesForCustomer(customerId)
  }
}
