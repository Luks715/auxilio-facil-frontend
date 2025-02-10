export interface RequisitoData {
    id: number;

    descricao: string;
    auxilioId: number;
}

export interface CidadaoAuxilio {
    id: number;
    cidadaoId: number;
    auxilioId: number;
    inscrito: boolean;
    elegivel: boolean;
}

export interface AuxilioData {
    id: number;

    nome: string;
    valor_minimo: number;
    descricao: string;
    tem_vagas: boolean;

    requisitos: RequisitoData[];
    CidadaoAuxilio: CidadaoAuxilio[];
}

export interface UpdateAuxilioData {
    nome?: string;
    valor_minimo?: number;
    descricao?: string;
    tem_vagas?: boolean;
}

export interface CreateAuxilioData {
    nome: string;
    descricao: string;
    valor_minimo: number;
    tem_vagas: boolean;
}
