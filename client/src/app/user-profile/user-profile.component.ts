import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../employee.service';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  employeeData
  userName
  constructor(private es: EmployeeService) { }

  ngOnInit(): void {
    this.userName = localStorage.getItem("userName")
    this.es.viewProfile(this.userName).subscribe(data => {
      this.employeeData = data;
    })
  }

}
