import { NgModule } from "@angular/core";
import { Routes } from "@angular/router";
import { NativeScriptRouterModule } from "nativescript-angular/router";

const routes: Routes = 
[
    { path: "", redirectTo: "/home", pathMatch: "full" },
    { path: "home", loadChildren: "./pages/home/home.module#HomeModule" },
    { path: "web_page", loadChildren: "./pages/web_page/web_page.module#WebPageModule" }
];

@NgModule({
    imports: [NativeScriptRouterModule.forRoot(routes)],
    exports: [NativeScriptRouterModule]
})
export class AppRoutingModule { }
