import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpProvider } from "~/providers/HttpProvider";
import { Routes } from "~/config/Routes";
import { RouterExtensions } from "nativescript-angular/router"; 
import { NavigationExtras } from "@angular/router";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit 
{
    public debug:boolean = true;
    public cod_usuario: string ;
    public show_not_found_text = false;
    public paginas: Array<Object> = [];
    public text = 
    {
        items_not_found: "No se encontraron datos."
    };

    public originatingIp = "";
    public status = "";
    public slept = "_";
    public response = "";
    public isBusy = false;

    constructor
    ( 
        public http: HttpProvider, 
        public routes: Routes, 
        private routerExtensions: RouterExtensions 
    ) 
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
        this.isBusy = true;   
        this.http.request( this.routes.get_route("home") ).then( (response:any) => 
        {
            this.paginas = response.paginas;
            this.isBusy = false;
            console.log("here is busy", this.isBusy );
        })
        .catch((error) => 
        {
            this.isBusy = false;
            this.show_not_found_text = true;
        });


    }

    page_was_tapped(pagina)
    {
        let navigationExtras: NavigationExtras = { queryParams: pagina };
        
        this.routerExtensions.navigate(["/web_page"], navigationExtras);
        //this.router.navigate(["web_page"], navigationExtras);
    }











    
}
