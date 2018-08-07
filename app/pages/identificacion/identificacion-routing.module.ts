import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { IdentificacionComponent } from "~/pages/identificacion/identificacion.component";

const routes: Routes = 
[
    { path: "", component: IdentificacionComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class IdentificacionRoutingModule { }
