import api from "../../utils/api";
import { CondicaoData } from "@/types/cidadao";

export const findAllCondicoes = async (): Promise<CondicaoData[]> => {
    const response = await api.get("/condicao");
    return response.data;
}