import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { map, tap } from "rxjs/operators";
import { employee } from "../interfaces/employee";
import { Observable, from } from "rxjs";
import { employeeData } from "../interfaces/employeeData";
import {
  NetworkService,
  ConnectionStatus
} from "src/app/services/network.service";
import { Storage } from "@ionic/storage";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  private baseUrl: string = "http://dummy.restapiexample.com/";

  private employeesApi: string = this.baseUrl + "api/v1/employees";

  private addEmployeApi: string = this.baseUrl + "api/v1/create";
  private updateEmployeeApi: string = this.baseUrl + "api/v1/update/";
  private deleteEmployeeApi: string = this.baseUrl + "api/v1/delete/";

  constructor(
    private http: Http,
    private networkService: NetworkService,
    private storage: Storage
  ) {}

  getAllEmployees(): Observable<employee[]> {
    if (
      this.networkService.getCurrentNetworkStatus() == ConnectionStatus.Offline
    ) {
      return from(this.getLocalData("employees"));
    } else {
      return this.http.get(this.employeesApi).pipe(
        map(res => res.json()),
        tap(res => {
          let employees = res.slice();
          this.setLocalData(
            "employees",
            employees
              .reverse()
              .slice(0, 10)
              .reverse()
          );
        })
      );
    }
  }

  private setLocalData(key, data) {
    this.storage.set(key, data);
  }

  private getLocalData(key) {
    return this.storage.get(key);
  }

  addEmployee(employee: employeeData) {
    return this.http
      .post(this.addEmployeApi, employee)
      .pipe(map(res => res.text()));
  }

  updateEmployee(employee: employeeData, oldEmployeeId: number) {
    return this.http
      .put(this.updateEmployeeApi + oldEmployeeId, employee)
      .pipe(map(res => res.text()));
  }

  deleteEmployee(employeeId: number) {
    return this.http
      .delete(this.deleteEmployeeApi + employeeId)
      .pipe(map(res => res.text()));
  }
}
