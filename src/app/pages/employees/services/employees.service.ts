import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { environment } from "src/environments/environment";
import { map } from "rxjs/operators";
import { employee } from "../interface/employee";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class CRUDEmployeeService {
  private baseUrl: string = environment.baseUrl;

  private employeesApi: string = this.baseUrl + "api/v1/employees";

  private addEmployeApi: string = this.baseUrl + "api/v1/create";
  private updateAndDeleteEmployeeApi: string = this.baseUrl + "api/v1/update/";

  constructor(private http: Http) {}

  getAllEmployees(): Observable<employee[]> {
    return this.http.get(this.employeesApi).pipe(map(res => res.json()));
  }

  addEmployee(employee: employee) {
    return this.http
      .post(this.addEmployeApi, employee)
      .pipe(map(res => res.json()));
  }

  updateEmployee(employee: employee) {
    return this.http
      .put(this.updateAndDeleteEmployeeApi + employee.id, employee)
      .pipe(map(res => res.json()));
  }

  deleteEmployee(employeeId: number) {
    return this.http
      .delete(this.updateAndDeleteEmployeeApi + employeeId)
      .pipe(map(res => res.json()));
  }
}
