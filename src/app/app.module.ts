import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// Chapter 8 Sports Store application
import { StoreModule } from "./store/store.module"


// my application
import { ModelModule } from "./models/model.module";
import { ExternalService } from "./external.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { ErrorHandlerService } from "./errorHandler.service";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ModelModule,
    StoreModule,
    FormsModule
  ],
  providers: [
    ExternalService, ErrorHandlerService,
    { provide: HTTP_INTERCEPTORS, useExisting: ErrorHandlerService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
