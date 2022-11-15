import { Cliente } from "./cliente";
import { Endereco } from "./endereco";
import { Rota } from "./rota";

export interface Entrega {
    codEntrega : number;
    feita : boolean;
    latitude : number;
    longitude : number;
    rota: Rota;
    endereco: Endereco;
}