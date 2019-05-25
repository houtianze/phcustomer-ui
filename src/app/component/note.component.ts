import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppComponent } from '../app.component';
import { CustomerService, Note } from '../service/customer.service';
import { Observable } from 'rxjs';
import { notStrictEqual } from 'assert';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private appComponent: AppComponent,
    private customerService: CustomerService) { }

  ngOnInit() {
    this.appComponent.setTitle('Notes')
    const customerId = this.route.snapshot.paramMap.get('customerId')
    // console.log("got id:", customerId)
    this.notes = this.customerService.getNotesForCustomer(customerId)
  }

  notes: Observable<Note[]>
}
