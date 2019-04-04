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
  private employeeApi: string = this.baseUrl + "api/v1/employee/";

  private addEmployeApi: string = this.baseUrl + "api/v1/employees";
  private updateEmployeeApi: string = this.baseUrl + "api/v1/update/";
  private deleteEmployeeApi: string = this.baseUrl + "api/v1/employees/";

  constructor(private http: Http) {}

  getAllEmployees(): Observable<employee[]> {
    return this.http.get(this.employeesApi).pipe(map(res => res.json()));
  }

  getOneEmployee(employeeId: number): Observable<employee> {
    return this.http
      .get(this.employeesApi + employeeId)
      .pipe(map(res => res.json()));
  }

  addEmployee(employee: employee) {
    return this.http
      .post(this.addEmployeApi, employee)
      .pipe(map(res => res.json()));
  }

  updateEmployee(employee: employee) {
    return this.http
      .put(this.updateEmployeeApi + employee.id, employee)
      .pipe(map(res => res.json()));
  }

  deleteEmployee(employeeId: number) {
    return this.http
      .delete(this.deleteEmployeeApi + employeeId)
      .pipe(map(res => res.json()));
  }
}
