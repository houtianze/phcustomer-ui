import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerService } from './service/customer.service';
import { CustomerComponent } from './component/customer.component';
import { NoteComponent } from './component/note.component';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  declarations: [
    AppComponent,
    CustomerComponent,
    NoteComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    AgGridModule.withComponents(null),
    MatCardModule
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
