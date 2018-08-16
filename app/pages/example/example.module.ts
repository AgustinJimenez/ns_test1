import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptCommonModule } from "nativescript-angular/common";

import { ExampleRoutingModule } from "~/pages/example/example-routing.module";
import { ExampleComponent } from "~/pages/example/example.component";

@NgModule({
    imports: 
    [
        NativeScriptCommonModule,
        ExampleRoutingModule
    ],
    declarations: 
    [
        ExampleComponent
    ],
    schemas: 
    [
        NO_ERRORS_SCHEMA
    ]
})
export class ExampleModule { }
