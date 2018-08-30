import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import * as connectivity from "tns-core-modules/connectivity/connectivity";
import { getString } from "application-settings";
import { device } from "platform";
@Injectable()
export class HttpProvider
{
    constructor(private http: HttpClient ){ }
    
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
        "firebase-cloud-message-token": getString("fcm_token")
    };
    
    private get_device_info()
    {
        return {
            "deviceType": device.deviceType,
            "language": device.language,
            "manufacturer": device.manufacturer,
            "model": device.model,
            "os": device.os,
            "osVersion": device.osVersion,
            "region": device.region,
            "sdkVersion": device.sdkVersion,
            "uuid": device.uuid
        };
    }

    public request( url: string, params: any = {}, header: any = {}, method: string = "GET" )
    {

        header = this.create_headers(header);

        let fcm_token = getString("fcm_token");
        
        if(fcm_token != undefined && fcm_token!= '')
            header['firebase-cloud-message-token'] = fcm_token;

            header['device_info'], JSON.stringify( this.get_device_info() );
        
        return new Promise((resolve, reject) =>
        {
            setTimeout(() =>
            {
                if( connectivity.getConnectionType() == connectivity.connectionType.none )
                {
                    alert( this.alert_no_internet_obj );
                    reject( {} );
                }

                if(this.debug)
                    console.log("<===================START-HTTP-REQUEST======================>\nURL===>"
                    ,url,
                    "\nPARAMS===>",params,
                    "\nHEADER===>",header,
                    "\nMETHOD===>",method,
                    "\n<===================END-HTTP-REQUEST======================>"); 
                //new HttpHeaders( header )

                this.http.request(method, url, { body: params, headers: header   }).subscribe( (response:any) => 
                {
                    console.log("HERE MOTHER FUCKER=====>", response);
                    if(this.debug)
                        console.log("<===================START-HTTP-RESPONSE======================>\nRESPONSE===>",response,"\n<===================END-HTTP-RESPONSE======================>"); 
                    
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

    private create_headers(extra_headers: object): object
    {
        let headers = this.default_headers;
        
        for (let key in extra_headers) 
            headers[key] =  extra_headers[key];

        return headers;

    }
}