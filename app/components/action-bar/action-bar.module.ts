import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { NativeScriptCommonModule } from 'nativescript-angular/common';
import { ActionBarComponent } from "~/components/action-bar/action-bar.component";

@NgModule({
  imports: 
  [
    NativeScriptCommonModule
  ],
  exports: [ActionBarComponent],

  declarations:
  [
    ActionBarComponent
  ],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ActionBarModule { }
