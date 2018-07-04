import { Component, OnInit } from "@angular/core";
import * as app from "application";
import { RadSideDrawer } from "nativescript-ui-sidedrawer";
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Component({
    selector: "Home",
    moduleId: module.id,
    templateUrl: "./home.component.html"
})
export class HomeComponent implements OnInit 
{
    public debug:boolean = true;
    public http_headers: HttpHeaders;
    public cod_usuario: string ;
    public paginas: Array<Object> = [];

    

    constructor(public http: HttpClient) 
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
        let url: string = "http://gestion.dls.com.py:8080/api/v1/app_gestion_dls/";
        let api_token: string = "yduibDHAjzwdOVPfvPfmLkprqW1Z3li3";
        let params = {para:"ms"};
        let type = "get";

        this.http_headers = new HttpHeaders();
        this.http_headers = this.http_headers
        .append('api-token', api_token)
        .append('Content-Type', 'application/json')
        .append('firebase-cloud-message-token', "FCMABC")
        .append('device_info', JSON.stringify
        ({
            cordova: "this.device.cordova",
            model: "this.device.model",
            platform: "this.device.platform",
            uuid: "this.device.uuid",
            version: "this.device.version",
            manufacturer: "this.device.manufacturer",
            isVirtual: "this.device.isVirtual",
            serial: "this.device.serial"
        }));

        if( this.cod_usuario!= null )
            this.http_headers = this.http_headers.append('cod_usuario', "cdigod");

        if(this.debug)
        {
            console.log( "=========================================" );
            console.log( "HTTP-REQUEST===>", url, JSON.stringify(params), type, JSON.stringify(this.http_headers) );//JSON.stringify()
        }

        this.http.request(type.toUpperCase(), url, { body: params, headers: this.http_headers })
        .subscribe(res =>
        {
            let response: any = (res!=undefined)?res:{};

            if(this.debug)
            {
                console.log( "RESPONSE===>", response );
                console.log( "=========================================" );
            }

            if(response.error==undefined)
                response.error = true;

            //this.loading.dismiss();

            if( response.error == true)
            {
                //if(response.messages!=undefined)
                    //this.toast.showLongBottom(response.messages).subscribe();

                //reject( response.messages );
            }
            else
            {
                this.paginas = response.paginas;
            }

            //resolve(response);
        },
        error =>
        {

            //this.loading.dismiss();
            //this.toast.showLongBottom("No se puede conectar con el servidor.").subscribe();

            if(this.debug)
                console.log("NETWORK-ERROR", error);

            //reject( error );
        });

        //this.loading = this.loadingCtrl.create();
        //this.loading.present();

    }












    
}
