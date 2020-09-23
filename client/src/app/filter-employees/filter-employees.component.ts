import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-filter-employees',
  templateUrl: './filter-employees.component.html',
  styleUrls: ['./filter-employees.component.css']
})
export class FilterEmployeesComponent implements OnInit {

  employeeData
  firstName
  lastName
  constructor(private es: EmployeeService) { }

  ngOnInit(): void {
    this.es.viewEmployees().subscribe(data => {
      this.employeeData = data;
    })
  }

  filterData() {
    if (!this.firstName && !this.lastName)
      this.ngOnInit()
    else
      this.es.filterByName(this.firstName, this.lastName).subscribe(docData => {
        this.employeeData = docData;
      })
  }
}
