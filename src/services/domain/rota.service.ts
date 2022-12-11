import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { Rota } from "src/models/rota";

@Injectable()

export class RotaService {

    private rota : Rota;

    constructor(public http: HttpClient) {
    }

    setRota(rota : Rota){
        this.rota = rota;
    }

    getRota(){
        return this.rota;
    }

    findAll() : Observable<Rota[]> {
        return this.http.get<Rota[]>(`${API_CONFIG.baseUrl}/rotas`);
    }

}