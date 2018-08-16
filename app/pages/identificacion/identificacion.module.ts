import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { IdentificacionRoutingModule } from "~/pages/identificacion/identificacion-routing.module";
import { IdentificacionComponent } from "~/pages/identificacion/identificacion.component";
import { HttpClientModule } from "@angular/common/http";
import { HttpProvider } from "~/providers/Http/HttpProvider";
import { Routes } from "~/config/ServerRoutes/Routes";
import { NativeScriptFormsModule } from "nativescript-angular/forms";
import { ActionBarModule } from "~/components/action-bar/action-bar.module";

@NgModule({
    imports: 
    [
        NativeScriptCommonModule,
        IdentificacionRoutingModule,
        HttpClientModule,
        NativeScriptFormsModule,
        ActionBarModule
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
