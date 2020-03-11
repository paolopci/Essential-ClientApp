import { NgModule } from '@angular/core';
import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { RouterModule, Routes } from "@angular/router";
// Chapter 11: Admin basic
import { AdminComponent } from "./admin.component";
import { OrderAdminComponent } from "./orderAdmin.component";
import { ProductAdminComponent } from "./productAdmin.component";
import { OverviewComponent } from "./overview.component";
import { ProductEditorComponent } from "./productEditor.component";
import { NgxPaginationModule } from 'ngx-pagination';


const routes: Routes = [
  {
    path: "",
    component: AdminComponent,
    children: [
      { path: "products", component: ProductAdminComponent },
      { path: "orders", component: OrderAdminComponent },
      { path: "overviews", component: OverviewComponent },
      { path: "", component: OverviewComponent }
    ]
  }
];

@
NgModule({
  imports: [
    RouterModule,
    FormsModule,
    NgxPaginationModule,
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    AdminComponent,
    OverviewComponent,
    ProductAdminComponent,
    OrderAdminComponent,
    ProductEditorComponent
  ]
})
export class AdminModule {
}
