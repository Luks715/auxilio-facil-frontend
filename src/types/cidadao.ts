import { EnderecoData } from "./endereco";
import { UserData } from "./user";
import { AuxilioData } from "./auxilio";
import { NotificacaoData } from "./notificacao";
import { EscolaData } from "./escola";
import { EmpresaData } from "./empresa";

export interface CondicaoData { 
    id: number;
    
    tipo: string; // exemplo: "desempregado", "gestante", "autista", etc.
    cidadaos: CidadaoData[];
}

export interface CidadaoData {
    id: number;

    cpf: string;
    nome: string;
    data_nascimento: Date;
    usuario?: UserData;

    endereco_principal_id: number;
    endereco_principal?: EnderecoData;

    condicoes: CondicaoData[];

    registro_dependentes: CidadaoDependetes[];
    registro_responsavel: CidadaoDependetes[];

    registro_enderecos: CidadaoEnderecos[];
    //registro_condicoes: CidadaoCondicoes[];
    registro_auxilios: CidadaoAuxilios[];
    registro_escolas: CidadaoEscolas[];
    registro_empresas: CidadaoEmpresas[];
    registro_notificacoes: UserNotificacoes[];
}

export interface CidadaoEscolas {
    id: number;

    aluno_id: number;
    escola_id: number;
    matricula: string;
    ativo: boolean;
    status: string;

    aluno: CidadaoData;
    escola: EscolaData;
}

export interface CidadaoEmpresas {
    id: number;

    funcionario_id: number;
    empresa_id: number;
    salario: number;

    funcionario: CidadaoData;
    empresa: EmpresaData;
}

export interface UserNotificacoes {
    id: number;

    cidadao_id: number;
    notificacao_id: number;
    lida: boolean;

    cidadao: CidadaoData;
    notificacao: NotificacaoData;
}

export interface CidadaoEnderecos {
    id: number;

    cidadao_id: number;
    endereco_id: number;

    cidadao: CidadaoData;
    endereco: EnderecoData;
}

export interface CidadaoAuxilios {
    id: number;           
    cidadaoId: number;
    auxilioId: number;
    inscrito: Boolean;
    elegivel: Boolean;

    cidadao: CidadaoData;
    auxilio: AuxilioData;
  }

export interface CidadaoDependetes {
    id: number;

    responsavel_id: number;
    dependente_id: number;
    status: String;

    responsavel: CidadaoData;
    dependente: CidadaoData;
}

// ----------------------------------------------------------------

export interface UpdateCidadao {
    
}

export interface CreateCidadaoData {
    cpf: string;
    nome: string;
    data_nascimento: Date;
    condicoes: CondicaoData[];
    endereco_principal_id: number;
}

export interface CreateDependenteData {
    createCidadao: CreateCidadaoData;
    status: string;
    responsavel_id: number;
}
