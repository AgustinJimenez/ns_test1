import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { IdentificacionRoutingModule } from "~/pages/identificacion/identificacion-routing.module";
import { IdentificacionComponent } from "~/pages/identificacion/identificacion.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpProvider } from "~/providers/HttpProvider";
import { Routes } from "~/config/Routes";

@NgModule({
    imports: 
    [
        NativeScriptCommonModule,
        IdentificacionRoutingModule,
        HttpClientModule
    ],
    declarations: 
    [
        IdentificacionComponent
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
export class IdentificacionModule { }