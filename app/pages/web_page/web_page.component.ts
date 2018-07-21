import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { WebView, LoadEventData } from "tns-core-modules/ui/web-view/web-view";
import { Page } from "tns-core-modules/ui/page/page";
import { TextField } from "tns-core-modules/ui/text-field/text-field";
import { Label } from "tns-core-modules/ui/label/label";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import * as app from "tns-core-modules/application/application";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "WebPage",
    moduleId: module.id,
    templateUrl: "./web_page.component.html"
})
export class WebPageComponent implements OnInit 
{
    public webViewSrc: string = "http://gestion.dls.com.py:8080/administracion";

    @ViewChild("myWebView") webViewRef: ElementRef;

    constructor( private route: ActivatedRoute ) 
    {
        // Use the component constructor to inject providers.
        this.route.params.forEach((params) => { console.log("PARAMS===>", params); });
    }

    onDrawerButtonTap(): void 
    {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void 
    {
        let webview: WebView = this.webViewRef.nativeElement;

        webview.on(WebView.loadFinishedEvent, function (args: LoadEventData) {
            let message;
            if (!args.error) {
                message = "WebView finished loading of " + args.url;
            } else {
                message = "Error loading " + args.url + ": " + args.error;
            }
            console.log("WebView message - " + message);
        }); 
    }

    goBack() {
        let webview: WebView = this.webViewRef.nativeElement;
        if (webview.canGoBack) {
            webview.goBack();
        }
    }

    submit(args: string) {

        if (args.substring(0, 4) === "http") {
            this.webViewSrc = args;
        } else {
            alert("Please, add `http://` or `https://` in front of the URL string");
        }
    }


   
}