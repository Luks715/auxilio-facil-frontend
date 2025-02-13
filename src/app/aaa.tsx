"use client"

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findCidadaoByCpf } from "./_api/cidadaosApi";
import { findUserByCpf } from "./_api/userApi";

export default function Home() {
  const [cpf, setCpf] = useState("");
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const userExists = await findUserByCpf(cpf);

      if (userExists == 0) {
        localStorage.setItem("cpf", cpf); // Salva o CPF no localStorage
        router.push("/auth/connect-cidadao"); // Redireciona para conectar com um cidadão existente
      } else if (userExists == 1) {
        localStorage.setItem("cpf", cpf); // Salva o CPF no localStorage
        router.push("/auth/login"); // Redireciona para a tela de login
      } else {
        router.push("/auth/register"); // Redireciona para a tela de registro
      }
    } catch (error) {
      console.error("Erro ao verificar o CPF:", error);
      alert("Ocorreu um erro ao processar sua solicitação. Tente novamente.");
    }
  };

  return (
    <div>
      <h1> Digite o seu CPF para entrar ou se cadastrar</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label> CPF </label>
          <input
              type="text"
              id="cpf"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              placeholder="Digite seu CPF"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            />
        </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-blue-600 transition duration-300"
          >
            Continuar
          </button>
        </form>
    </div>
  );
}
