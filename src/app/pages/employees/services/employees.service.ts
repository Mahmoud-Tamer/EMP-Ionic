import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { employee } from "../interface/employee";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class EmployeesService {
  private baseUrl: string = environment.baseUrl;

  private employeesApi: string = this.baseUrl + "api/v1/employees";

  private addEmployeApi: string = this.baseUrl + "api/v1/create";
  private updateEmployeeApi: string = this.baseUrl + "api/v1/update/";
  private deleteEmployeeApi: string = this.baseUrl + "api/v1/delete/";

  constructor(private http: Http) {}

  getAllEmployees(): Observable<employee[]> {
    return this.http.get(this.employeesApi).pipe(map(res => res.json()));
  }

  addEmployee(employee: employee) {
    return this.http
      .post(this.addEmployeApi, employee)
      .pipe(map(res => res.text()));
  }

  updateEmployee(employee: employee, oldEmployeeId: number) {
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
