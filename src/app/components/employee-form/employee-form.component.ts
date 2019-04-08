import { Component, OnInit } from "@angular/core";
import { NavParams, PopoverController } from "@ionic/angular";
import { employee } from "src/app/pages/employees/interfaces/employee";
import { EMPService } from "src/app/services/EMP.service";
import { EmployeesService } from "src/app/pages/employees/services/employees.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { employeeData } from "src/app/pages/employees/interfaces/employeeData";
import { EventEmitter } from "events";

@Component({
  selector: "app-employee-form",
  templateUrl: "./employee-form.component.html",
  styleUrls: ["./employee-form.component.scss"]
})
export class EmployeeFormComponent implements OnInit {
  employee: employee;
  employeeForm: FormGroup;

  constructor(
    private navParams: NavParams,
    private empService: EMPService,
    private employeesService: EmployeesService,
    private formBuilder: FormBuilder,
    private popoverController: PopoverController
  ) {
    this.initEmployeeForm();
  }

  ngOnInit() {
    this.employee = this.navParams.get("employeeData");
    if (this.employee) {
      this.employeeForm
        .get("employee_name")
        .setValue(this.employee.employee_name);
      this.employeeForm
        .get("employee_salary")
        .setValue(this.employee.employee_salary);
      this.employeeForm
        .get("employee_age")
        .setValue(this.employee.employee_age);
      this.employeeForm
        .get("profile_image")
        .setValue(this.employee.profile_image);
    }
  }

  initEmployeeForm() {
    this.employeeForm = this.formBuilder.group({
      employee_name: ["", Validators.required],
      employee_salary: [
        0,
        Validators.compose([Validators.min(0), Validators.required])
      ],
      employee_age: [
        18,
        Validators.compose([Validators.min(10), Validators.required])
      ],
      profile_image: [""]
    });
  }

  saveForm() {
    const employeeData: employeeData = {
      name: this.employeeForm.value.employee_name,
      salary: this.employeeForm.value.employee_salary,
      age: this.employeeForm.value.employee_age
    };
    if (this.employee) {
      this.updateEmployee(employeeData);
    } else {
      this.addEmployee(employeeData);
    }
  }

  addEmployee(employee: employeeData) {
    this.empService.presentLoading();
    this.employeesService.addEmployee(employee).subscribe(
      () => {
        this.empService.hideLoader();
        this.empService.presentToast("Added");
        this.employeeForm.reset();
      },
      err => {
        this.empService.hideLoader();
        console.error(err);

        this.empService.presentToast("A problem happened");
      }
    );
  }

  updateEmployee(newEmployee: employeeData) {
    this.empService.presentLoading();
    this.employeesService
      .updateEmployee(newEmployee, this.employee.id)
      .subscribe(
        () => {
          this.closePopover();
          this.empService.hideLoader();
          this.empService.presentToast("Updated");
        },
        err => {
          this.empService.hideLoader();
          console.error(err);

          this.empService.presentToast("A problem happened");
        }
      );
  }

  closePopover() {
    this.popoverController.dismiss();
  }
}
