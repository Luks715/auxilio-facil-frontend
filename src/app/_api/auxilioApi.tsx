import api from "../../utils/api";
import { AuxilioData } from "@/types/auxilio";

export const findAllAuxilios = async (): Promise<AuxilioData[]> => {
  const response = await api.get(`/auxilio`);
  return response.data;
};
