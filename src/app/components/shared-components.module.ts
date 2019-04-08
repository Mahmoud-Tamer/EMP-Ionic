import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { IonicModule } from "@ionic/angular";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [EmployeeFormComponent],
  entryComponents: [EmployeeFormComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class SharedComponentsModule {}
