import { Component, OnInit, Inject, Injectable } from '@angular/core';
import { Router } from '@angular/router'
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private rt: Router, private es: EmployeeService) { }

  userName
  userPassword
  ngOnInit(): void {
  }

  userLogin() {
    this.es.checkLogin(this.userName, this.userPassword).subscribe(docData => {
      const userType = JSON.parse(JSON.stringify(docData)).userData.userType
      localStorage.setItem("userName", this.userName)
      localStorage.setItem("userType", userType)
      if (userType === "admin")
        this.rt.navigateByUrl("listEmployee")
      else
        this.rt.navigateByUrl("userProfile")
    })
  }

}
