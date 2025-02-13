"use client"; // Adicione esta linha no topo do arquivo

import { useState } from "react";
import { useRouter } from "next/navigation";
import { findCidadaoByCpf } from "./_api/cidadaosApi";
import { CidadaoAuxilios, CidadaoData } from "@/types/cidadao";
import AuxiliosInscritos from "@/components/entidades/auxilios/inscritos";
import AuxiliosElegiveis from "@/components/entidades/auxilios/elegiveis";
import Dependente from "@/components/entidades/dependentes";

export default function Home() {
  const [cpf, setCpf] = useState("");
  const [cidadao, setCidadao]   = useState<CidadaoData>()
  const [auxilios, setAuxilios] = useState<CidadaoAuxilios[]>([]); // Estado para armazenar os auxílios
  const [mensagem, setMensagem] = useState<string>(""); // Estado para armazenar a mensagem retornada
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const cidadao = await findCidadaoByCpf(cpf);
      setCidadao(cidadao)
      setAuxilios(cidadao.registro_auxilios);

    } catch (error) {
      console.error("Erro ao verificar o CPF:", error);
      alert("Ocorreu um erro ao processar sua solicitação. Tente novamente.");
    }
  };

  // Filtrando os auxílios com elegivel: true e inscrito: false
  const auxiliosElegiveis = auxilios.filter(
    (auxilio) => auxilio.elegivel === true && auxilio.inscrito === false
  );

  // Filtrando os auxílios com inscrito: true
  const auxiliosInscritos = auxilios.filter(
    (auxilio) => auxilio.inscrito === true
  );

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

      <h1>nome: {cidadao?.nome}</h1>
      <h2>dependentes: </h2>
      <ul className="list-disc pl-5">
        {cidadao?.registro_dependentes.map((dependente) => (
          <li key={dependente.id}>
            <Dependente dependente={dependente.dependente} />
          </li>
        ))}
      </ul>


      {/* Exibindo os auxílios elegíveis (elegivel: true, inscrito: false) */}
      {auxiliosElegiveis.length > 0 && (
        <div className="mt-6">
          <h2>Auxílios elegíveis:</h2>
          <ul className="list-disc pl-5">
            {auxiliosElegiveis.map((auxilio) => (
              <li key={auxilio.id}>
                <AuxiliosElegiveis auxilio={auxilio.auxilio} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Exibindo os auxílios inscritos (inscrito: true) */}
      {auxiliosInscritos.length > 0 && (
        <div className="mt-6">
          <h2>Auxílios inscritos:</h2>
          <ul className="list-disc pl-5">
            {auxiliosInscritos.map((auxilio) => (
              <li key={auxilio.id}>
                <AuxiliosInscritos auxilio={auxilio.auxilio} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
