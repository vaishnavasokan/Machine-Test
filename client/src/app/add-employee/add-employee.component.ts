import { Component, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload'

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {

  constructor() { }

  public uploader: FileUploader = new FileUploader({
    url: 'http://localhost:8080/employee/addEmployee',
    itemAlias: 'profileImage',
    method: 'POST'
  });

  employeeFirstname: string
  employeeLastname: string
  employeeDesignation: string
  employeeAddress: string
  profileImage

  ngOnInit(): void {
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onBuildItemForm = (file: any, form: any) => {
      form.append('employeeFirstname', this.employeeFirstname);
      form.append('employeeLastname', this.employeeLastname);
      form.append('employeeDesignation', this.employeeDesignation);
      form.append('employeeAddress', this.employeeAddress);
      form.append('profileImage', this.profileImage);
    }
  }

  public addEmployee() {
  this.uploader.uploadAll();
}
}
