import { Component, OnInit } from "@angular/core";
import { PopoverController } from "@ionic/angular";
import { EmployeeFormComponent } from "src/app/components/employee-form/employee-form.component";
import { EmployeesService } from "./services/employees.service";
import { employee } from "./interfaces/employee";
import { EMPService } from "src/app/services/EMP.service";
import {
  NetworkService,
  ConnectionStatus
} from "src/app/services/network.service";

@Component({
  selector: "app-employees",
  templateUrl: "./employees.page.html",
  styleUrls: ["./employees.page.scss"]
})
export class EmployeesPage implements OnInit {
  employeesArray: employee[] = [];
  noEmployees: boolean = false;
  loading: boolean = true;

  constructor(
    private popoverCtrl: PopoverController,
    private employeesService: EmployeesService,
    private empService: EMPService,
    private networkService: NetworkService
  ) {}

  ngOnInit() {
    this.getAllEmployees(null);

    this.networkService.onNetworkChange().subscribe(status => {
      // status == 0 mean network type is online
      if (status == 0) {
        this.loading = true;
        this.getAllEmployees(null);
      }
    });
  }

  getAllEmployees(event: any) {
    this.employeesService.getAllEmployees().subscribe(
      result => {
        this.loading = false;
        console.log(result);
        if (event) {
          event.target.complete();
        }
        if (result.length > 0) {
          this.employeesArray = result.reverse().slice(0, 10);
        } else {
          this.noEmployees = true;
        }
      },
      () => {
        this.empService.presentToast("A problem happened");
        this.loading = false;
      }
    );
  }

  deleteEmployee(employeeId: number, index: number) {
    this.empService.presentLoading();
    this.employeesService.deleteEmployee(employeeId).subscribe(
      () => {
        this.empService.hideLoader();
        this.employeesArray.splice(index, 1);
        if (this.employeesArray.length == 0) {
          this.noEmployees = true;
        }
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
