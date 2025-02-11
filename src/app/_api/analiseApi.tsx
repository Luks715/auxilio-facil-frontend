import api from "../../utils/api";
import { CidadaoData } from "@/types/cidadao";

export const analiseAuxilios = async (cidadao: CidadaoData) => {
    const response = await api.post(`/analise/bolsa-familia/${cidadao.id}`);
    return response.data;
}