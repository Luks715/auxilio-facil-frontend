import { UserNotificacoes } from "./cidadao";

export interface NotificacaoData {
    id: number;

    cidadao_id: number;
    mensagem: string;

    registro_usuarios: UserNotificacoes[]
}