"use client"; // Adicione esta linha no topo do arquivo

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findCidadaoByCpf } from "./_api/cidadaosApi";
import { analiseAuxilios } from "./_api/analiseApi";
import { AuxilioData } from "@/types/auxilio";
import AuxiliosInscritos from "@/components/entidades/auxilios/inscritos";

export default function Home() {
  const [cpf, setCpf] = useState("");
  const [auxilios, setAuxilios] = useState<AuxilioData[]>([]); // Estado para armazenar os auxílios
  const [mensagem, setMensagem] = useState<string>(""); // Estado para armazenar a mensagem retornada
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const cidadao = await findCidadaoByCpf(cpf);
      console.log(cidadao.id);
      console.log(cidadao.registro_auxilios);
      const resultado = await analiseAuxilios(cidadao.id);

      // Verificando se a resposta tem a chave 'message' e atualizando a mensagem
      if (resultado && resultado.message) {
        setMensagem(resultado.message);  // Aqui estamos tratando a mensagem como uma string
      } else {
        setMensagem("Erro ao obter a mensagem de análise.");
      }

      // Recuperando os auxílios completos do cidadão
      const auxilios = cidadao.registro_auxilios.map((auxilio: any) => {
        return {
          id: auxilio.id,
          nome: auxilio.nome, // Preservando mais dados do auxílio
          valor_minimo: auxilio.valor_minimo,
          tem_vagas: auxilio.tem_vagas,
          inscrito: auxilio.inscrito,
          elegivel: auxilio.elegivel,
        };
      });

      // Atualizando o estado com os dados completos dos auxílios
      setAuxilios(auxilios);

    } catch (error) {
      console.error("Erro ao verificar o CPF:", error);
      alert("Ocorreu um erro ao processar sua solicitação. Tente novamente.");
    }
  };

  return (
    <div>
      <h1>Digite o seu CPF para avaliar seus auxílios</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
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

      {/* Exibindo a mensagem retornada */}
      {mensagem && (
        <div className="mt-6">
          <h3>Mensagem: {mensagem}</h3> {/* Aqui estamos renderizando apenas a string */}
        </div>
      )}

      {/* Exibindo os auxílios em uma lista usando o componente AuxiliosInscritos */}
      {auxilios.length > 0 && (
        <div className="mt-6">
          <h2>Auxílios do cidadão:</h2>
          <ul className="list-disc pl-5">
            {auxilios.map((auxilio) => (
              <li key={auxilio.id}>
                <AuxiliosInscritos auxilio={auxilio} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
