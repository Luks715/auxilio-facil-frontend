import api from "../../utils/api";
import { CidadaoData, CreateCidadaoData, CreateDependenteData } from "@/types/cidadao";

export const createCidadao = async (dados: CreateCidadaoData): Promise<Boolean> => {
    const response = await api.post("/cidadao", dados);
    return response.data;
};

export const createDependente = async (dados: CreateDependenteData): Promise<Boolean> => {
    const response = await api.post("/cidadao/criarDependente", dados);
    return response.data;
}

export const findCidadaoByCpf = async (cpf: string): Promise<CidadaoData> => {
    const response = await api.get(`/cidadao/findByCpf/${cpf}`);
    return response.data;
};