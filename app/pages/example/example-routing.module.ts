import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

import { ExampleComponent } from "~/pages/example/example.component";

const routes: Routes = [
    { path: "", component: ExampleComponent }
];

@NgModule({
    imports: [NativeScriptRouterModule.forChild(routes)],
    exports: [NativeScriptRouterModule]
})
export class ExampleRoutingModule { }
