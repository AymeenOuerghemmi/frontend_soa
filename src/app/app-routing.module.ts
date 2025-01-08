import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StudentListComponent } from './students/student-list/student-list.component';
import { StudentFormComponent } from './students/student-form/student-form.component';
import { AddressListComponent } from './address-list/address-list.component';
import { AddressFormComponent } from './address-form/address-form.component';

const routes: Routes = [
  { path: 'addresses', component: AddressListComponent },
  { path: 'addresses/add', component: AddressFormComponent },
  { path: 'addresses/edit/:id', component: AddressFormComponent },
  { path: '', redirectTo: 'students', pathMatch: 'full' },
  { path: 'students', component: StudentListComponent },
  { path: 'students/new', component: StudentFormComponent },
  { path: 'students/edit/:id', component: StudentFormComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
