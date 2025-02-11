export interface CondicaoData { 
    id: number;
    tipo: string; // exemplo: "desempregado", "gestante", "autista", etc.

    cidadaos: CidadaoCondicao[]
}

export interface CidadaoCondicao {
    id: number;
    condicaoId: number;
    cidadaoId: number;
    data_inicio: Date;
    valido_ate?: Date;
}

export interface AuxilioData {
    id: number;
    nome: string;
    valor_minimo: number;
    descricao: string;
    tem_vagas: boolean;
}

export interface CidadaoAuxilio {
    id: number;           
    cidadaoId: number;
    auxilioId: number;
    inscrito: Boolean;
    elegivel: Boolean;
  }

export interface CidadaoDependetes {
    id: number;
    responsavelId: number;
    dependenteId: number;
    status: String;
}

export interface CidadaoData {
    id: number;

    cpf: string;
    nome: string;
    data_nascimento: Date;

    responsavel: CidadaoDependetes | null;
    dependentes: CidadaoDependetes[]; // Relacionamento com dependentes
    auxilios: CidadaoAuxilio[]; // Relacionamento com auxílios
    condicoes: CidadaoCondicao[]; // Relacionamento com as condições
}

export interface UpdateCidadao {
    
}

export interface CreateCidadaoData {
    cpf: string;
    nome: string;
    data_nascimento: Date;
}

export interface CreateDependenteData {
    createCidadao: CreateCidadaoData;
    status: string;
    responsavelId: number;
}
