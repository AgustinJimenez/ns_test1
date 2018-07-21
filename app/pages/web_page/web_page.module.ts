import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { WebPageRoutingModule } from "~/pages/web_page/web_page-routing.module";
import { WebPageComponent } from "~/pages/web_page/web_page.component";

@NgModule({
    imports: 
    [
        NativeScriptCommonModule,
        WebPageRoutingModule
    ],
    declarations: 
    [
        WebPageComponent
    ],
    schemas: 
    [
        NO_ERRORS_SCHEMA
    ]
})
export class WebPageModule { }
