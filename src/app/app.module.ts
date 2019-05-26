import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AgGridModule } from 'ag-grid-angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomerComponent } from './component/customer.component';
import { NoteComponent } from './component/note.component';

import 'hammerjs';

import { MaterialModule } from './material.module';
import { CustomerService } from './service/customer.service';

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
    FormsModule,
    MaterialModule,
    AgGridModule.withComponents(null),
  ],
  providers: [CustomerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
