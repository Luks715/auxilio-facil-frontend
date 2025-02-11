"use client";

import React, { useState } from "react";
import { CreateUser } from "@/types/user";
import { register } from "@/app/_api/authApi";

export default function SignIn() {
  const [input, setInput] = useState<CreateUser>({
    cep: "",
    estado: "",
    municipio: "",
    bairro: "",
    complemento: "",
    
    cpf: "",
    nome: "",
    data_nascimento: new Date(),
    
    email: "",
    senha: "",
    tipo: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    try {
      await register(input);
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="flex h-screen">

      <div className="flex basis-2/4 flex-col justify-center items-center bg-background">
        <h1 className="text-center text-white text-5xl">
          Crie uma conta para acessar as funcionalidades do site
        </h1>
        <form className="text-black w-3/5 my-4">
          {[
            { name: "nome", type: "text", placeholder: "Nome" },
            { name: "email", type: "email", placeholder: "Email" },
            { name: "senha", type: "password", placeholder: "Senha" },
            { name: "cpf", type: "text", placeholder: "CPF" },
            { name: "data_nascimento", type: "date", placeholder: "Data de Nascimento" },
            { name: "tipo", type: "text", placeholder: "Tipo" },
            { name: "cep", type: "text", placeholder: "CEP" },
            { name: "estado", type: "text", placeholder: "Estado" },
            { name: "municipio", type: "text", placeholder: "Município" },
            { name: "bairro", type: "text", placeholder: "Bairro" },
            { name: "complemento", type: "text", placeholder: "Complemento (opcional)" },
          ].map((field) => (
            <input
              key={field.name}
              name={field.name}
              type={field.type}
              className="text-center relative w-full mb-3 p-5 rounded-3xl"
              placeholder={field.placeholder}
              onChange={handleChange}
            />
          ))}
        </form>
        <div className="flex justify-center items-center w-1/4">
          <button
            onClick={createUser}
            className="text-center bg-foreground text-white p-4 w-3/4 rounded-2xl"
          >
            Criar
          </button>
        </div>
      </div>
    </div>
  );
}
