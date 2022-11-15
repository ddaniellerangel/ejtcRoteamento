import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { API_CONFIG } from "src/config/api.config";
import { Cliente } from "src/models/cliente";

@Injectable()

export class ClienteService {

    private cliente : Cliente;

    constructor(public http: HttpClient) {
    }

    setCliente(cliente : Cliente){
        this.cliente = cliente;
    }

    getCliente(){
        return this.cliente;
    }

    findAll() : Observable<Cliente[]> {
        return this.http.get<Cliente[]>(`${API_CONFIG.baseUrl}/clientes`);
    }

}