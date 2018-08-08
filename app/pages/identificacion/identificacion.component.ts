import { Component, OnInit } from "@angular/core";
import * as app from "tns-core-modules/application/application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpProvider } from "~/providers/HttpProvider";
import { Routes } from "~/config/Routes";
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
        "cod_usuario":""
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
        // Use the component constructor to inject providers.
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
            this.http.request( this.routes.get_route("registro"), {"cod_usuario": this.data.cod_usuario }, {}, "POST" ).then(response => 
            {
                console.log(response);
            })
            .catch(error => 
            {
                if( error.messages )
                    alert( error.messages );
    
                console.log(error);
            });
        
        
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
