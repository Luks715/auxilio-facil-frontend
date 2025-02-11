import React, { useState, useEffect } from "react";
import api from "../../utils/api";
import { CidadaoData } from "@/types/cidadao";

// Função para chamar a API de análise de auxílio
export const analiseAuxilios = async (cidadao: CidadaoData) => {
  const response = await api.post(`/analise/bolsa-familia/${cidadao.id}`);
  return response.data;
};

// Componente AuxilioInscrito
const AuxilioInscrito = ({ auxilio }: { auxilio: any }) => {
  return (
    <div>
      <h3>{auxilio.nome}</h3>
      <p>{auxilio.descricao}</p>
    </div>
  );
};

// Componente principal
const MenuPage: React.FC = () => {
  const [selectedButton, setSelectedButton] = useState<string>("auxilios_inscritos");
  const [cidadao, setCidadao] = useState<any>(null); // Estado para armazenar o cidadão
  const [auxiliosInscritos, setAuxiliosInscritos] = useState<any[]>([]); // Auxílios inscritos
  const [todosAuxilios, setTodosAuxilios] = useState<any[]>([]); // Todos os auxílios
  const [auxiliosElegiveis, setAuxiliosElegiveis] = useState<any[]>([]); // Auxílios elegíveis

  // Função para pegar os dados do cidadão do localStorage
  useEffect(() => {
    const storedCidadao = localStorage.getItem("cidadao");
    if (storedCidadao) {
      setCidadao(JSON.parse(storedCidadao));
    }
  }, []);

  // Função para filtrar auxílios inscritos
  useEffect(() => {
    if (cidadao) {
      setAuxiliosInscritos(cidadao.auxilios.filter((aux: any) => aux.inscrito));
      setTodosAuxilios(cidadao.auxilios);
      setAuxiliosElegiveis(cidadao.auxilios.filter((aux: any) => aux.elegivel && !aux.inscrito));
    }
  }, [cidadao]);

  // Função para chamar a análise do Bolsa Família
  const handleBolsaFamilia = async () => {
    if (cidadao) {
      const resultado = await analiseAuxilios(cidadao);
      if (resultado) {
        alert("Análise do Bolsa Família concluída com sucesso.");
      } else {
        alert("A família não é elegível para o Bolsa Família.");
      }
    }
  };

  // Função para renderizar a área principal com base no botão selecionado
  const renderMainArea = () => {
    switch (selectedButton) {
      case "auxilios_inscritos":
        return auxiliosInscritos.map((auxilio: any) => <AuxilioInscrito key={auxilio.id} auxilio={auxilio} />);
      case "todos_auxilios":
        return todosAuxilios.map((auxilio: any) => <AuxilioInscrito key={auxilio.id} auxilio={auxilio} />);
      case "auxilios_elegiveis":
        return auxiliosElegiveis.map((auxilio: any) => <AuxilioInscrito key={auxilio.id} auxilio={auxilio} />);
      default:
        return <div>Selecione uma opção para visualizar os auxílios.</div>;
    }
  };

  return (
    <div>
      {/* Header */}
      <header>
        <nav>
          <button onClick={() => setSelectedButton("auxilios_inscritos")}>Auxílios Inscritos</button>
          <button onClick={() => setSelectedButton("todos_auxilios")}>Todos os Auxílios</button>
          <button onClick={() => setSelectedButton("auxilios_elegiveis")}>Auxílios Elegíveis</button>

          {/* Botão para análise do Bolsa Família */}
          <button onClick={handleBolsaFamilia}>Analisar Bolsa Família</button>
        </nav>
      </header>

      {/* Área principal */}
      <main>
        {renderMainArea()}
      </main>
    </div>
  );
};

export default MenuPage;
