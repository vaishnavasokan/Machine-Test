import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }

  public checkLogin(userName, userPassword) {
    let data = { userName: userName, userPassword: userPassword }
    return this.http.post("http://localhost:8080/login", data)
  }

  viewEmployees() {
    let url = "http://localhost:8080/employee/listEmployees";
    return this.http.get(url);
  }

  viewProfile(userName) {
    let url = "http://localhost:8080/employee/viewProfile/" + userName;
    return this.http.get(url);
  }

  public filterByDate(fromDate, toDate) {
    let data = { fromDate: fromDate, toDate: toDate }
    return this.http.post("http://localhost:8080/employee/filterByDate", data)
  }

  public filterByName(firstName, lastName) {
    let data = { firstName: firstName, lastName: lastName }
    return this.http.post("http://localhost:8080/employee/filterByName", data)
  }
}
