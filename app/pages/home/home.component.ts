import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpProvider } from "~/providers/Http/HttpProvider";
import { Routes } from "~/config/ServerRoutes/Routes";
import { RouterExtensions } from "nativescript-angular/router"; 
import { getString } from "application-settings";
@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html",
    styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit 
{
    public debug:boolean = true;
    public show_not_found_text = false;
    public paginas: { title: string, url: string }[] = [];
    public text = 
    {
        items_not_found: "No se encontraron datos.",
        cod_usuario: null
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
        this.text.cod_usuario = getString("cod_usuario");
        // Use the component constructor to inject providers.
    }

    ngOnInit(): void 
    {
        console.log( "COD-USUARIO-ONINIT="+this.text.cod_usuario  );
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
        
        this.http.request( this.routes.get_route("home") )
        .then( (response:any) => 
        {
            console.log("HOME REQUEST END============>");
            this.paginas = (response.paginas!=undefined)?response.paginas:[];
            this.isBusy = false;
            this.show_not_found_text = false;
        })
        .catch((error) => 
        {
            this.request_not_found();
        });

    }

    request_not_found()
    {
        this.isBusy = false;   
        this.show_not_found_text = true;
    }

    page_was_tapped(pagina)
    {
        this.routerExtensions.navigate(["/web_page"],
        {
            queryParams: pagina   
        });
        //this.router.navigate(["web_page"], navigationExtras);
    }











    
}
