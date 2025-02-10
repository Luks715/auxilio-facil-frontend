export interface CondicaoData {
    id: number;
    tipo: string; // exemplo: "desempregado", "gestante", "autista", etc.
}

export interface CasoEspecialData {
    id: number;
    condicaoId: number;
    cidadaoId: number;
    data_fim?: Date;
}

export interface CidadaoData {
    id: number;

    cpf: string;
    nome: string;
    data_nascimento: Date;
    responsavelId: number | null;
    enderecoId: number;
  
    responsavel: CidadaoData | null;
    dependentes: CidadaoData[];
    condicoes: CondicaoData[];  // Relacionamento com as condições
    casosEspeciais: CasoEspecialData[]; // Relacionamento com casos especiais
}

export interface UpdateCidadao {
    nome?: string;
    responsavelId?: number;
    enderecoId: number;
    condicoes?: number[]; // IDs das condições associadas
}

export interface CreateCidadao {
    cpf: string;
    nome: string;
    data_nascimento: Date;
    responsavelId: null;
    enderecoId: number;
    condicoes?: number[];
}

export interface CreateDependente {
    cpf: string;
    nome: string;
    data_nascimento: Date;
    responsavelId: number;
    enderecoId: number;
    condicoes?: number[];
}