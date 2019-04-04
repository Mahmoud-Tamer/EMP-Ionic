import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { EmployeeFormComponent } from "src/app/components/employee-form/employee-form.component";
import { EmployeesService } from "./services/employees.service";
import { employee } from "./interface/employee";
import { EMPService } from "src/app/services/EMP.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.page.html",
  styleUrls: ["./employees.page.scss"]
})
export class EmployeesPage implements OnInit {
  employees: employee[] = [];
  noEmployees: boolean = false;

  constructor(
    private popoverCtrl: PopoverController,
    private employeesService: EmployeesService,
    private empService: EMPService
  ) {}

  ngOnInit() {
    this.getAllEmployee();
  }

  getAllEmployee() {
    this.employeesService.getAllEmployees().subscribe(
      result => {
        console.log(result);

        if (result.length > 0) {
          this.employees = result;
        } else {
          this.noEmployees = true;
        }
      },
      () => {
        this.empService.presentToast("A problem happened");
      }
    );
  }

  deleteEmployee(employeeId: number, index: number) {
    this.empService.presentLoading();
    this.employeesService.deleteEmployee(employeeId).subscribe(
      () => {
        this.empService.hideLoader();
        this.employees.splice(index, 1);
        this.empService.presentToast("Deleted");
      },
      () => {
        this.empService.hideLoader();
        this.empService.presentToast("A problem happened");
      }
    );
  }

  async openEmployeeFormPopover(employeeData?: employee) {
    const popover = await this.popoverCtrl.create({
      component: EmployeeFormComponent,
      componentProps: { employeeData: employeeData },
      translucent: true,
      animated: false
    });
    return await popover.present();
  }
}
