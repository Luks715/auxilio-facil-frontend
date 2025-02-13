import { CidadaoCondicoes, CondicaoData } from "./cidadao";

export interface UserData {
    id: number;
    
    tipo: string;
    email: string;
    senha: string;
    cidadao_id: number;
}
  
export interface UpdateUser {
    email?: string;
    senha?: string;
}

export interface ConnectUser {
    tipo: string;
    email: string;
    senha: string;
    cidadao_id: number;
}
  
export interface CreateUser {
    cep: string;
    estado: string;
    municipio: string;
    bairro: string;
    complemento?: string;

    cpf: string;
    nome: string;
    data_nascimento: Date;
    condicoes: CondicaoData[];

    email: string;
    senha: string;
    tipo: string;
}