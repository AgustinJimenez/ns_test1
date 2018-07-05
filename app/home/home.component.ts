import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpService } from "./../services/HttpService";
import { Routes } from "./../config/Routes";

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

    constructor( public http: HttpService, public routes: Routes ) 
    {
        // Use the component constructor to inject providers.
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












    
}
