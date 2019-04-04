import { Component, OnInit } from "@angular/core";
import { NavParams } from "@ionic/angular";
import { employee } from "src/app/pages/employees/interface/employee";
import { EMPService } from "src/app/services/EMP.service";
import { EmployeesService } from "src/app/pages/employees/services/employees.service";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Camera, CameraOptions } from "@ionic-native/camera/ngx";

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
    private camera: Camera
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

  selectImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture(options).then(
      imageData => {
        this.employeeForm.value.profile_image =
          "data:image/jpeg;base64," + imageData;
      },
      err => {
        console.log(err);
      }
    );
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
    if (this.employee) {
      this.updateEmployee();
    } else {
      this.addEmployee();
    }
  }

  addEmployee() {
    this.empService.presentLoading();
    this.employeesService.addEmployee(this.employeeForm.value).subscribe(() => {
      this.empService.hideLoader();
      this.empService.presentToast("Added");
    });
  }

  updateEmployee() {
    console.log(this.employeeForm.value);

    this.empService.presentLoading();
    this.employeesService
      .updateEmployee(this.employeeForm.value, this.employee.id)
      .subscribe(
        () => {
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
}
