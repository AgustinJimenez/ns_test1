import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpProvider } from "./../../providers/HttpProvider";
import { Routes } from "~/config/Routes";
import { EventData } from "tns-core-modules/data/observable/observable";
import { Button } from "tns-core-modules/ui/button/button";
import { RouterExtensions } from "nativescript-angular/router";
import { ActivatedRoute } from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit 
{
    public debug:boolean = true;
    public cod_usuario: string ;
    public paginas: Array<Object> = [];

    constructor
    ( 
        public http: HttpProvider, 
        public routes: Routes, 
        private routerExtensions: RouterExtensions ,
        private route: ActivatedRoute
    ) 
    {
        // Use the component constructor to inject providers.
        this.route.params.forEach((params) => { console.log("PARAMS===>", params); });
    }

    ngOnInit(): void 
    {
        // Init your component properties here.
        this.request_pages();
    }

    onDrawerButtonTap(): void 
    {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    request_pages()
    {
        this.http.request( this.routes.get_route("home") ).then( (response:any) => 
        {
            this.paginas = response.paginas;
        });

    }

    page_was_tapped(url)
    {
        //let button = <Button>args.object;
        //this.routerExtensions.navigate(["/web_page"], {});
    }











    
}
