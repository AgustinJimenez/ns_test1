import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ActionBarComponent } from "~/components/action-bar/action-bar.component";

const routes: Routes = 
[
    { path: "", component: ActionBarComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ActionBarRoutingModule { }
