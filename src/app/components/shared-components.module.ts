import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { EmployeeFormComponent } from "./employee-form/employee-form.component";
import { IonicModule } from "@ionic/angular";
import { Camera } from "@ionic-native/camera/ngx";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

@NgModule({
  declarations: [EmployeeFormComponent],
  entryComponents: [EmployeeFormComponent],
  imports: [CommonModule, IonicModule, FormsModule, ReactiveFormsModule],
  providers: [Camera]
})
export class SharedComponentsModule {}
