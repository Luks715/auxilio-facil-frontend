"use client";

import React, { useState } from "react";
import { useEffect } from "react";
import { ConnectUser } from "@/types/user";
import { register_connect } from "@/app/_api/authApi";
import { findCidadaoByCpf } from "@/app/_api/cidadaosApi";

export default function SignIn() {
  const [input, setInput] = useState<ConnectUser>({
    cidadaoId: NaN, 
    email: "",
    senha: "",
    tipo: "cidadao",
  });

  useEffect(() => {
    const fetchCidadaoId = async () => {
      const cpf = localStorage.getItem("cpf");
      if (cpf) {
        try {
          const cidadao = await findCidadaoByCpf(cpf);
          setInput((prev) => ({ ...prev, cidadaoId: cidadao.id }));
        } catch (error) {
          console.error("Erro ao buscar cidadão pelo CPF:", error);
        }
      } else {
        console.error("CPF não encontrado no localStorage.");
      }
    };
  
    fetchCidadaoId();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const createUser = async () => {
    try {
      await register_connect(input);
      window.location.href = "/auth/login";
    } catch (error) {
      console.error("Erro ao registrar usuário:", error);
    }
  };

  return (
    <div className="flex h-screen">

      <div className="flex basis-2/4 flex-col justify-center items-center bg-background">
        <h1 className="text-center text-white text-5xl">
            Crie uma conta para acessar seus dados já salvos    
        </h1>
        <form className="text-black w-3/5 my-4">
          {[
            { name: "email", type: "email", placeholder: "Email" },
            { name: "senha", type: "password", placeholder: "Senha" },
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
