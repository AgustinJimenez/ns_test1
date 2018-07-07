import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "./home-routing.module";
import { HomeComponent } from "./home.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpService } from "./../../services/HttpService";
import { Routes } from "./../../config/Routes";

@NgModule({
    imports: 
    [
        NativeScriptCommonModule,
        HomeRoutingModule,
        HttpClientModule
    ],
    declarations: 
    [
        HomeComponent
    ],
    schemas: 
    [
        NO_ERRORS_SCHEMA
    ],
    providers:
    [
        HttpService,
        Routes
    ]
})
export class HomeModule { }
