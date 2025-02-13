"use client";

import React, { useState, useEffect } from "react";
import { CreateUser } from "@/types/user";
import { CondicaoData } from "@/types/cidadao";
import { findAllCondicoes } from "@/app/_api/condicaoApi";
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
    condicoes: [],
    
    email: "",
    senha: "",
    tipo: "Cidadao",
  });
  const [condicoesList, setCondicoesList] = useState<CondicaoData[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCondicao = async () => {
      try {
        const condicoes = await findAllCondicoes();
        setCondicoesList(condicoes as CondicaoData[]);
      } catch {
        setError("Erro ao carregar lista de condições.");
      }
    }
    fetchCondicao();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setInput((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (condicao: CondicaoData) => {
    setInput((prev) => {
      const isSelected = prev.condicoes.some((c) => c.id === condicao.id);
      return {
        ...prev,
        condicoes: isSelected
          ? prev.condicoes.filter((c) => c.id !== condicao.id) // Remove a condição se já estiver selecionada
          : [...prev.condicoes, condicao], // Adiciona a condição se não estiver selecionada
      };
    });
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

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">Condições</label>
            <div className="flex flex-wrap gap-2">
              {condicoesList.map((condicao) => (
                <label key={condicao.id} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    name="condicoes"
                    value={JSON.stringify(condicao)} // Armazenando o objeto CondicaoData como string JSON
                    checked={input.condicoes.some(c => c.id === condicao.id)} // Verificando se a condição está selecionada
                    onChange={() => handleCheckboxChange(condicao)} // Atualizando o estado com a condição selecionada
                    className="mr-2"
                  />
                  {condicao.tipo} {/* Exibindo a descrição da condição */}
                </label>
              ))}
            </div>
          </div>
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
