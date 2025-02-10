import { UserData } from '../types/user';
import { useRouter } from "next/router";

export const getToken = () => {
    return localStorage.getItem('token');
  };
  
export const getStorageUser = (): UserData | null => {
    const userData = localStorage.getItem("cidadao");
    return userData ? JSON.parse(userData) : null;
  };

export const IsAuthenticated = (): boolean => {
  const token = getToken(); // Verifica se existe um token
    if (token) {
      return true;
    }
    else{
      return false
    }
}

export const handleLogout = () => {
  // Remove token e dados do usuário
  localStorage.removeItem("token");
  localStorage.removeItem("cidadao");

  // Redireciona para a página inicial
  window.location.href = "/";
};

export const CanShowItem = (usuarioID: number): boolean => {
  const userStorage = getStorageUser();
  return userStorage?.id === usuarioID;
};
