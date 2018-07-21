import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { WebPageComponent } from "~/pages/web_page/web_page.component";

const routes: Routes = [
    { path: "", component: WebPageComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class WebPageRoutingModule { }
