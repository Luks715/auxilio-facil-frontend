"use client";

import { useRouter } from 'next/navigation'; // Atualizado para "next/navigation" para redirecionamento no Next.js 13+
import React, { useState } from "react";
import { login } from "@/app/_api/authApi";

export default function Login() {
  const [senha, setSenha] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      // Obtendo o CPF do localStorage
      const cpf = localStorage.getItem("cpf");
      if (!cpf) {
        throw new Error("CPF não encontrado no localStorage.");
      }

      // Enviando a senha e o CPF para autenticação
      const response = await login("123.456.789-01", "senha123");
      console.log("Resposta da autenticação:", response);

      // Salvando o token e o cidadão no localStorage
      //localStorage.removeItem("cpf");
      localStorage.setItem("token", response.token);
      localStorage.setItem("cidadao", JSON.stringify(response.cidadao));

      // Redirecionando o usuário
      router.push("/menu");
    } catch (error) {
      console.error("Erro na autenticação:", error);
      setError("Senha inválida. Por favor, tente novamente.");
    }
  };

  return (
    <div>
      <div>
        <h1> Digite sua senha para finalizar o login </h1>
        
        <form onSubmit={handleLogin} className="text-black w-3/5">
          <label htmlFor="senha"></label>
          <input
            className="text-center relative w-full p-5 mb-3 rounded-3xl"
            type="password"
            id="senha"
            name="senha"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
          {error && <p className="text-red-500 text-center">{error}</p>}

          <div className="flex items-center justify-center">
            <button
              type="submit"
              className="text-center bg-foreground text-white p-4 w-1/3 rounded-2xl"
            >
              Entrar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
