import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as connectivity from "connectivity";
@Injectable()
export class HttpProvider
{
    private debug: boolean = true;
    private alert_no_internet_obj = 
    {
        title: "AVISO",
        message: "NO HAY CONEXIÓN",
        okButtonText: "OK"
    };

    private default_headers = 
    {
        "api-token": "yduibDHAjzwdOVPfvPfmLkprqW1Z3li3",
        "Content-Type": "application/json",
        "firebase-cloud-message-token": "abc"
    };

    constructor(private http: HttpClient) 
    { 

    }

    public request(url: string, params: any = {}, header: any = {}, method: string = "GET")
    {

        let headers = this.create_headers(header);

        if(this.debug)
        {
            console.log("<===================START-HTTP-REQUEST======================>");  
            console.log("URL===>",url);console.log("PARAMS===>",params);console.log("HEADER===>",header);console.log("METHOD===>",method);
            console.log("<===================END-HTTP-REQUEST======================>"); 
        }

        return new Promise((resolve, reject) =>
        {
            setTimeout(() =>
            {
                if( connectivity.getConnectionType() == connectivity.connectionType.none )
                {
                    alert( this.alert_no_internet_obj );
                    reject( {} );
                }

                this.http.request(method, url, { body: params, headers: headers }).subscribe( data => 
                {
                    let response: any = (data!=undefined)?data:{};

                    if(this.debug)
                    {
                        console.log("<===================START-HTTP-RESPONSE======================>");  
                        console.log("RESPONSE===>",response);
                        console.log("<===================END-HTTP-RESPONSE======================>"); 
                    }
                    
                    if(response.data == undefined)
                      response.data = {};

                    if(response.error==undefined)
                      response.error = true;

                    if(response.error)
                        reject(response);

                    resolve(response);
                },
                error =>
                {
                    //this.loading.dismiss();
                    //this.toast.showLongBottom("No se puede conectar con el servidor.").subscribe();

                    if(this.debug)
                        console.log("NETWORK-ERROR", error);

                    reject( error );
                });

            }, 0);
        });
    }

    private create_headers(extra_headers: object): HttpHeaders
    {
        let headers = this.default_headers;
        
        for (let key in extra_headers) 
            headers[key] =  extra_headers[key];

        return new HttpHeaders( headers );

    }
}