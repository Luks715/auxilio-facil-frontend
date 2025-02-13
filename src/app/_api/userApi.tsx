import api from "../../utils/api";
import { UserData, CreateUser, ConnectUser, UpdateUser } from '../../types/user'

import { getToken } from "@/utils/auth";

export const createUser = async (dados: UserData) => {
  const response = await api.post("/user", dados);
  return response.data;
};

export const findAllUsers = async (): Promise<UserData[]> => {
  const response = await api.get("/user");
  return response.data;
};

export const findUserById = async (id: number): Promise<UserData> => {
  const response = await api.get(`/user/${id}`);
  return response.data;
};

export const findUserByCpf = async (cpf: string): Promise<number> => {
  const response = await api.get(`/user/findUserByCpf/${cpf}`); 
  return response.data;
}

export const updateUser = async (id: number, dados: UpdateUser) => {
  try {
    const token = localStorage.getItem("token");
    const response = await api.patch(`/user/${id}`, dados, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};

export const deleteUser = async (userId: number) => {
  try {
    const token = localStorage.getItem("token"); // Retrieve the token from localStorage
    const response = await api.delete(`user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`, // Add the Authorization header
      },
    });
    console.log("User deleted successfully:", response.data);
  } catch (error) {
    console.error("Error deleting user:", error);
    if (error.response && error.response.status === 401) {
      console.error("Unauthorized: Please check your credentials.");
    }
  }
};
