import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application/application";
//import { PageRoute } from "nativescript-angular/router";
//import { switchMap } from "rxjs/operators";
import { ActivatedRoute } from "@angular/router";


@Component({
    selector: "WebPage",
    moduleId: module.id,
    templateUrl: "./web_page.component.html",
    styleUrls: ["./web_page-component.css"]
})
export class WebPageComponent implements OnInit 
{
    public title = "helloooo";
    public webViewSrc: string = "http://gestion.dls.com.py:8080/administracion";
    public loading_indicator;

    @ViewChild("myWebView") webViewRef: ElementRef;
    @ViewChild("iconRotate") icon_rotate: ElementRef;
    @ViewChild("WebViewContainer") web_view_container: ElementRef;

    constructor( /*private pageRoute: PageRoute*/ private route: ActivatedRoute ) 
    {
        // Use the component constructor to inject providers.

        this.route.queryParams.subscribe((pagina) => 
        { 
            console.log("PARAMS HERE===>", pagina);
            this.title = pagina.title
            this.webViewSrc = pagina.url;
        });
        
        /*
        this.pageRoute.activatedRoute
        .pipe( switchMap(activatedRoute => activatedRoute.params ) )
        .forEach((params) => 
        { 
            //this.webViewSrc = params.url;
            console.log("PARAMS HERE===>", params);
        });
        */
        
    }

    onDrawerButtonTap(): void 
    {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void 
    {
        let webview: WebView = this.webViewRef.nativeElement;
        // console.log( WebView );
        // let icon: View = this.icon_rotate.nativeElement

        webview.on( WebView.loadStartedEvent, function( args: LoadEventData)
        {
            console.log("loadStarted-isBusy=", (this.isBusy)?"true":"false");
        });

        webview.on( WebView.loadFinishedEvent, function (args: LoadEventData) 
        {
            let message;
         
            if (!args.error) 
            {
                message = "======>WebView finished loading of " + args.url;
            } 
            else 
            {

                message = "========>Error loading " + args.url + ": " + args.error;
            }
            console.log("loadFinishedEvent-isBusy=", (this.isBusy)?"true":"false" );

        }); 
    }

    goBack() 
    {
        let webview: WebView = this.webViewRef.nativeElement;
        if (webview.canGoBack) 
        {
            webview.goBack();
        }
    }


   
}