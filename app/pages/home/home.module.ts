import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { HomeRoutingModule } from "~/pages/home/home-routing.module";
import { HomeComponent } from "~/pages/home/home.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpProvider } from "./../../providers/HttpProvider";
import { Routes } from "~/config/Routes";

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
        HttpProvider,
        Routes
    ]
})
export class HomeModule { }
