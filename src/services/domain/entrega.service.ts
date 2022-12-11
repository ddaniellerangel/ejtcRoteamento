import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { Entrega } from "src/models/entrega";

@Injectable()

export class EntregaService {

    private entrega : Entrega;

    constructor(public http: HttpClient) {
    }

    setCliente(entrega : Entrega){
        this.entrega = entrega;
    }

    getCliente(){
        return this.entrega;
    }

    findAll() : Observable<Entrega[]> {
        return this.http.get<Entrega[]>(`${API_CONFIG.baseUrl}/entregas`);
    }

    findByRota(rota_id: number) : Observable<Entrega[]> {
        return this.http.get<Entrega[]>(`${API_CONFIG.baseUrl}/entregas/findByRota/`+rota_id);
    }

}