import { CidadaoAuxilios } from "./cidadao";

//export interface RequisitoData{
//    id: number;

//    descricao: string;
//    auxilio_id: number;

//    auxilio: AuxilioData
//}

export interface AuxilioData {
    id: number;

    nome: string;
    valor_minimo: number;
//    descricao: string;
    tem_vagas: boolean;
    elegivel: boolean;
    inscrito: boolean;

    //requisitos: RequisitoData[]
}

export interface UpdateAuxilioData {
    nome?: string;
    valor_minimo?: number;
    descricao?: string;
    tem_vagas?: boolean;
}
