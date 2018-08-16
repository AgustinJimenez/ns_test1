import { Component, Input } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";

@Component({
  selector: 'AppActionBar',
  templateUrl: './action-bar.component.html',
  styleUrls: ['./action-bar.component.css'],
  moduleId: module.id,
})
export class ActionBarComponent
{
  @Input("title") title: string = null;

  constructor() 
  { 
  }


  onDrawerButtonTap(): void 
  {
    const sideDrawer = <RadSideDrawer>app.getRootView();
    sideDrawer.showDrawer();
  }

}
