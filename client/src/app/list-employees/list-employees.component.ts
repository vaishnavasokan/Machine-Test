import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})
export class ListEmployeesComponent implements OnInit {

  employeeData
  fromDate
  toDate
  constructor(private es: EmployeeService) { }

  ngOnInit(): void {
    this.es.viewEmployees().subscribe(data => {
      this.employeeData = data;
      console.log("employeeData: ", this.employeeData);
    })
  }

  filterData() {
    this.es.filterByDate(this.fromDate, this.toDate).subscribe(docData => {
      console.log("docData :", docData);
      this.employeeData = docData;
    })
  }
}
