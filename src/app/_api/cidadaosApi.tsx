import api from "../../utils/api";
import { CidadaoData, CreateCidadao, CreateDependente } from "@/types/cidadao";

export const createCidadao = async (dados: CreateCidadao): Promise<Boolean> => {
    const response = await api.post("/cidadao", dados);
    return response.data;
};

export const createDependente = async (dados: CreateDependente): Promise<Boolean> => {
    const response = await api.post("/cidadao", dados);
    return response.data;
}

export const findCidadaoByCpf = async (cpf: string): Promise<CidadaoData> => {
    const response = await api.get(`/cidadao/findByCpf/${cpf}`);
    return response.data;
};

export const findDependentes = async (responsavelId: number): Promise<CidadaoData[]> => {
    const response = await api.get(`/cidadao/dependentes/${responsavelId}`);
    return response.data;
};