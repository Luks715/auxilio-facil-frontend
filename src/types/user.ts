export interface UserData {
    id: number;
    
    tipo: string;
    email: string;
    senha: string;
    cidadaoId: number;
}
  
export interface UpdateUser {
    email?: string;
    senha?: string;
}

export interface ConnectUser {
    tipo: string;
    email: string;
    senha: string;
    cidadaoId: number;
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
    responsávelId: null;

    email: string;
    senha: string;
    tipo: string;
}