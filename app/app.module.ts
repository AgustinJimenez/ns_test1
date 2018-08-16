import { NgModule, NO_ERRORS_SCHEMA } from "@angular/core";
import { NativeScriptModule } from "nativescript-angular/nativescript.module";
import { NativeScriptUISideDrawerModule } from "nativescript-ui-sidedrawer/angular/side-drawer-directives";

import { AppRoutingModule } from "~/app-routing.module";
import { AppComponent } from "~/app.component";
import { ActionBarModule } from "~/components/action-bar/action-bar.module";
@NgModule({
    bootstrap: 
    [
        AppComponent
    ],
    imports: 
    [
        AppRoutingModule,
        NativeScriptModule,
        NativeScriptUISideDrawerModule,
        ActionBarModule

    ],
    declarations: 
    [
        AppComponent
    ],
    schemas:
    [
        NO_ERRORS_SCHEMA
    ]
})
export class AppModule { }
