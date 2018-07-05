import { Injectable } from "@angular/core";

@Injectable()
export class Routes 
{
    private debug:boolean = true;
    private server_url:string = "http://gestion.dls.com.py:8080/api/v1/app_gestion_dls/";
    private debug_url: string = "http://gestion.dls.com.py:8080/api/v1/app_gestion_dls/";
    private routes = 
    {
        "home":""
    };

    public get_route(name: string, params?:string)
    {
        return this.get_base_url() + this.routes[name];
    }

    public get_base_url(): string
    {
        return ( this.debug )?this.debug_url:this.server_url;
    }
}