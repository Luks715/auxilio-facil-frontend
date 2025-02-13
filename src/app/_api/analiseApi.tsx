import api from "../../utils/api";
import { CidadaoData } from "@/types/cidadao";

export const analiseAuxilios = async (cidadao_id: number) => {
    const response = await api.post(`/analise/bolsa-familia/${cidadao_id}`);
    return response.data;
}