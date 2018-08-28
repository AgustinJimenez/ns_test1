import { Component, OnInit } from "@angular/core";
import { HttpProvider } from "~/providers/Http/HttpProvider";
import { Routes } from "~/config/ServerRoutes/Routes";
import { getString, setString } from "application-settings";
import { TextField } from "ui/text-field";
import { Page } from "ui/page";
@Component({
    selector: "Identificacion",
    moduleId: module.id,
    templateUrl: "./identificacion.component.html"
})

export class IdentificacionComponent
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
    public cod_usuario_tf = new TextField();
    public tmp_cod_usuario = null;
    public is_edit:boolean = false;
    private cod_usuario_text_field;

    constructor
    ( 
        public http: HttpProvider, 
        public routes: Routes,
        public page: Page
    ) 
    {
        //setString("cod_usuario", "HOLA");
        // Use the component constructor to inject providers.
        this.data.cod_usuario = this.tmp_cod_usuario = getString("cod_usuario");
        this.is_edit = (this.data.cod_usuario!=null);
        
    }

    ngOnInit()
    {
        this.cod_usuario_tf = this.page.getViewById('cod_usuario_input');
    }

    public onTextChange(args) 
    {
        if(this.cod_usuario_text_field==undefined)
            this.cod_usuario_text_field = (<TextField>args.object);

        if( this.cod_usuario_text_field.text != undefined)
            this.data.cod_usuario = this.cod_usuario_text_field.text.toUpperCase();
    }

    public submit_button_was_tapped()
    {
        this.cod_usuario_tf.text = this.data.cod_usuario;

        if( !this.data.cod_usuario )
            this.show_cod_usuario_empty_message();
        else
            this.http.request( this.routes.get_route("registro"), this.data , {}, "POST" ).then( (response:any) => 
            {
                console.log(response);
                if( response.messages )
                    alert( { title: "AVISO", message: response.messages, okButtonText: "OK" } );

                setString("cod_usuario", this.data.cod_usuario);
                this.tmp_cod_usuario = this.data.cod_usuario;

            })
            .catch(error => 
            {
                if( error.error && error.messages != undefined && error.messages != ''  )
                    alert( { title: "AVISO", message: error.messages, okButtonText: "OK" } );
    
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
