import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { Routes, RouterModule } from "@angular/router";

import { IonicModule } from "@ionic/angular";

import { EmployeesPage } from "./employees.page";
import { SharedComponentsModule } from "src/app/components/shared-components.module";

const routes: Routes = [
  {
    path: "",
    component: EmployeesPage
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SharedComponentsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [EmployeesPage]
})
export class EmployeesPageModule {}
