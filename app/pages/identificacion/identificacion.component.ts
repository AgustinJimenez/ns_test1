import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpProvider } from "~/providers/Http/HttpProvider";
import { Routes } from "~/config/ServerRoutes/Routes";
import { getString, setString } from "application-settings";
@Component({
    selector: "Identificacion",
    moduleId: module.id,
    templateUrl: "./identificacion.component.html"
})

export class IdentificacionComponent implements OnInit 
{
    public debug:boolean = true;
    public text = 
    {
        items_not_found: "No se encontraron datos."
    };
    public data:{ cod_usuario: string } = 
    {
        "cod_usuario": null
    };

    public options = 
    {
        title: "Race selection",
        message: "Are you sure you want to be a Unicorn?",
        okButtonText: "Yes",
        cancelButtonText: "No",
        neutralButtonText: "Cancel"
    };

    constructor
    ( 
        public http: HttpProvider, 
        public routes: Routes
    ) 
    {
        //setString("cod_usuario", "HOLA");
        // Use the component constructor to inject providers.
        this.data.cod_usuario = getString("cod_usuario");
    }

    onDrawerButtonTap(): void 
    {
        const sideDrawer = <RadSideDrawer>app.getRootView();
        sideDrawer.showDrawer();
    }

    ngOnInit(): void 
    {
        // Init your component properties here.
        //this.request_pages();
    }

    submit_button_was_tapped()
    {
        console.log( "COD_USUARIO="+this.data.cod_usuario );

        if( !this.data.cod_usuario )
            this.show_cod_usuario_empty_message();
        else
            this.http.request( this.routes.get_route("registro"), this.data , {}, "POST" ).then( (response:any) => 
            {
                console.log(response);
                if( response.messages )
                    alert( response.messages );

                    setString("cod_usuario", this.data.cod_usuario);

            })
            .catch(error => 
            {
                if( error.error && error.messages )
                    alert( error.messages );
    
                console.log(error);
            });
        
        
    }

    private save_local_cod_usuario()
    {   
        setString("cod_usuario", this.data.cod_usuario);
    }

    private show_cod_usuario_empty_message()
    {
        alert
        ({
            title: "AVISO",
            message: "INGRESE CODIGO DE USUARIO",
            okButtonText: "OK"
        });
        
    }

    private show_invalid_user_message()
    {
        alert
        ({
            title: "AVISO",
            message: "EL USUARIO ES INVALIDO",
            okButtonText: "OK"
        });
        
    }










    
}
