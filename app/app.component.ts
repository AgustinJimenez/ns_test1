import { Component, OnInit, ViewChild } from "@angular/core";
import { NavigationEnd, Router } from "@angular/router";
import * as app from "tns-core-modules/application/application";
import { RouterExtensions } from "nativescript-angular/router";
import { DrawerTransitionBase, RadSideDrawer, SlideInOnTopTransition } from "nativescript-ui-sidedrawer";
import { filter } from "rxjs/operators";
import * as dialogs from "ui/dialogs";
import * as firebase from "nativescript-plugin-firebase";
import { NavigationExtras } from "@angular/router";
import { setString, getString } from "application-settings";
@Component({
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent implements OnInit 
{
    private debug:boolean = true;
    private _activatedUrl: string;
    private _sideDrawerTransition: DrawerTransitionBase;

    constructor(private router: Router, private routerExtensions: RouterExtensions) 
    {
        // Use the component constructor to inject services.
    }

    ngOnInit(): void 
    {
        firebase.init
        ({
        
            onMessageReceivedCallback: (message: firebase.Message ) => 
            {
                if( this.debug )
                    console.log( "FCM-MESSAGE===> ", message);

                if( message.foreground )
                    dialogs.confirm
                    ({
                        title: "AVISO",
                        message: `${message.body}`,
                        okButtonText: "OK",
                        cancelButtonText: "CANCELAR"
                    })
                    .then( ok => 
                    {
                        if( ok )
                        {
                            if( message.data.link != undefined )
                                this.open_web_page( { url: message.data.link } );
                        }
                            
                        
                    });
                else//background
                {
                    if( this.debug )
                        console.log( "FCM MESSAGE ON BACKGROUND!!!!!" );
                        
                    if( message.data.link != undefined )
                        this.open_web_page( { url: message.data.link } );
                }
                    
                
                //console.log(`Title: ${message.title}`);
                //console.log(`Body: ${message.body}`);
                // if your server passed a custom property called 'foo', then do this:
                
            }
        })
        .then
        (
            instance => 
            {
                if( this.debug )
                    console.log("========================>firebase.init done");
            },
            error => 
            {
                if( this.debug )
                    console.log(`========================>firebase.init error: ${error}`);
            }
        );
        
        firebase.addOnPushTokenReceivedCallback((token) =>
        {
            setString("fcm_token", token);
            
            if( this.debug )
                console.log("\n\n\nFCM-TOKEN="+token, "\nSTORED-TOKEN"+getString("fcm_token")+"\n\n\n" )
        });


        this._activatedUrl = "/home";
        this._sideDrawerTransition = new SlideInOnTopTransition();

        this.router.events.pipe(filter((event: any) => event instanceof NavigationEnd))
        .subscribe((event: NavigationEnd) => this._activatedUrl = event.urlAfterRedirects);
    }

    open_web_page(pagina)
    {
        let navigationExtras: NavigationExtras = { queryParams: pagina };
        this.routerExtensions.navigate(["/web_page"], navigationExtras);
    }

    get sideDrawerTransition(): DrawerTransitionBase 
    {
        return this._sideDrawerTransition;
    }

    isComponentSelected(url: string): boolean 
    {
        return this._activatedUrl === url;
    }

    onNavItemTap(navItemRoute: string): void 
    {
        this.routerExtensions.navigate([navItemRoute], 
        {
            transition: 
            {
                name: "fade"
            },
            clearHistory: true
        });

        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.closeDrawer();
    }
}
