import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { from } from 'rxjs';
import { AddEmployeeComponent } from './add-employee//add-employee.component'
import { LoginComponent } from './login/login.component'
import { ListEmployeesComponent } from './list-employees/list-employees.component'
import { HeaderComponent } from './header/header.component'
import { FilterEmployeesComponent } from './filter-employees/filter-employees.component'
import { UserProfileComponent } from './user-profile/user-profile.component'

const routes: Routes = [
  { path: "", component: LoginComponent },
  { path: "addEmployee", component: AddEmployeeComponent },
  { path: "listEmployee", component: ListEmployeesComponent },
  { path: "filterEmployee", component: FilterEmployeesComponent },
  { path: "userProfile", component: UserProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
