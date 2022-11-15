import { Cidade } from "./cidade";
import { Cliente } from "./cliente";

export interface Endereco {
    codEndereco : number;
    cep : string;
    rua : string;
    bairro : string;
    numero : number;
    semNumero: boolean;
    cidade: Cidade;
    cliente: Cliente;
}