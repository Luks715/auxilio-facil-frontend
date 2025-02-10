import api from "../../utils/api";
import { AuxilioData } from "@/types/auxilio";


export const findAuxiliosElegivel = async (cidadaoId: number): Promise<AuxilioData[]> => {
  const response = await api.get(`/auxilio/elegivel/${cidadaoId}`);
  return response.data;
};

export const findAuxiliosInscrito = async (cidadaoId: number): Promise<AuxilioData[]> => {
  const response = await api.get(`/auxilio/inscrito/${cidadaoId}`);
  return response.data;
};

export const findAllAuxilios = async (): Promise<AuxilioData[]> => {
  const response = await api.get(`/auxilio`);
  return response.data;
};
