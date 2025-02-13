import { CidadaoData, CidadaoEnderecos } from "./cidadao";
import { EmpresaData } from "./empresa";
import { EscolaData } from "./escola";

export interface EnderecoData {
    id: number;

    cep: string;
    estado: string;
    municipio: string;
    bairro: string;
    complemento: string | null;

    registro_cidadaos: CidadaoEnderecos[];
    Empresa: EmpresaData;
    Escola: EscolaData;

    moradores_principais: CidadaoData[];
}