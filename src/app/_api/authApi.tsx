import api from '../../utils/api';
import { CidadaoData } from '@/types/cidadao';
import { CreateUser, ConnectUser } from '../../types/user'

export interface AuthResponse {
    token: string;
    cidadao: CidadaoData;
};

export const login = async (email: string, senha: string): Promise<AuthResponse> => {
    const response = await api.post('/auth/login', { email, senha });
    return response.data;
};

export const register_connect = async (dados: ConnectUser) => {
    const response = await api.post('/auth/register-connect', dados);
    return response.data;
}

export const register = async (dados: CreateUser) => {
    const response = await api.post('/auth/register', dados);
    return response.data;
}