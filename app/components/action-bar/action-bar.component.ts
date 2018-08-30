import { Component, Input, ViewChild } from '@angular/core';
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { RouterExtensions } from "nativescript-angular/router";
@Component({
  selector: 'AppActionBar',
  templateUrl: './action-bar.component.html',
  //styleUrls: ['./action-bar.component.css'],
  moduleId: module.id,
})

export class ActionBarComponent
{
  constructor(private routerExtensions: RouterExtensions) 
  { 
    
  }

  @Input("title") title: string = null;

  public onNavItemTap(navItemRoute: string): void 
  {
      this.routerExtensions.navigate([navItemRoute], 
      {
          transition: 
          {
              name: "fade"
          },
          clearHistory: true
      });

      (<RadSideDrawer>app.getRootView()).closeDrawer();
  }


  onDrawerButtonTap(): void 
  {
    (<RadSideDrawer>app.getRootView()).showDrawer();
  }

}
