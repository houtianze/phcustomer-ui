import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CustomerComponent } from './component/customer.component';
import { NoteComponent } from './component/note.component';

const routes: Routes = [
  {path: '',  redirectTo: 'customers', pathMatch: 'full'},
  {path: 'customers', component: CustomerComponent},
  {path: 'notes/:customerId', component: NoteComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
