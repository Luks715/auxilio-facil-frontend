import React, { useState, useEffect } from "react";
import { createDependente } from "@/app/_api/cidadaosApi";
import { findAllCondicoes } from "@/app/_api/condicaoApi";
import { CondicaoData } from "@/types/cidadao";
import { CidadaoData, CreateDependenteData } from "@/types/cidadao";

interface FormData {
  cpf: string;
  nome: string;
  data_nascimento: string; // data_nascimento como string
  condicoes: CondicaoData[]; // Lista de condições selecionadas
  status: string;
}

const CreateDependente = () => {
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    nome: "",
    data_nascimento: "",
    condicoes: [],
    status: "",
  });
  const [responsavelId, setResponsavelId] = useState<number | null>(null);
  const [enderecoId, setEnderecoId] = useState<number | null>(null);
  const [condicoesList, setCondicoesList] = useState<CondicaoData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const cidadao = JSON.parse(localStorage.getItem("cidadao") || "{}") as CidadaoData;
      if (cidadao && cidadao.id && cidadao.endereco_principal_id) {
        setResponsavelId(cidadao.id);
        setEnderecoId(cidadao.endereco_principal_id);
      } else {
        setError("Erro ao carregar dados do responsável. Faça login novamente.");
      }
    };

    const fetchCondicoes = async () => {
      try {
        const condicoes = await findAllCondicoes();
        setCondicoesList(condicoes as CondicaoData[]);
      } catch {
        setError("Erro ao carregar lista de condições.");
      }
    };

    fetchUserData();
    fetchCondicoes();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleCheckboxChange = (condicao: CondicaoData) => {
    setFormData((prev) => {
      const isSelected = prev.condicoes.some((c) => c.id === condicao.id);
      return {
        ...prev,
        condicoes: isSelected
          ? prev.condicoes.filter((c) => c.id !== condicao.id) // Remove se já estiver selecionado
          : [...prev.condicoes, condicao], // Adiciona a condição
      };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!responsavelId || !enderecoId) {
      setError("Dados do responsável ausentes. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      const dataNascimento = new Date(formData.data_nascimento);

      const createDependenteData: CreateDependenteData = {
        createCidadao: {
          cpf: formData.cpf,
          nome: formData.nome,
          data_nascimento: dataNascimento,
          endereco_principal_id: enderecoId,
          condicoes: formData.condicoes,
        },
        status: formData.status,
        responsavel_id: responsavelId,
      };

      const success = await createDependente(createDependenteData);

      if (success) {
        alert("Dependente cadastrado com sucesso!");
        setFormData({
          cpf: "",
          nome: "",
          data_nascimento: "",
          status: "",
          condicoes: [],
        });
      }
    } catch (err) {
      setError("Erro ao cadastrar dependente. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Cadastrar Dependente</h2>
      {error && <p className="text-red-500">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">CPF</label>
          <input
            type="text"
            name="cpf"
            value={formData.cpf}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Nome</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Data de Nascimento</label>
          <input
            type="date"
            name="data_nascimento"
            value={formData.data_nascimento}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Condições</label>
          <div className="flex flex-wrap gap-2">
            {condicoesList.map((condicao) => (
              <label key={condicao.id} className="inline-flex items-center">
                <input
                  type="checkbox"
                  name="condicoes"
                  value={condicao.id}
                  checked={formData.condicoes.some((c) => c.id === condicao.id)}
                  onChange={() => handleCheckboxChange(condicao)}
                  className="mr-2"
                />
                {condicao.tipo}
              </label>
            ))}
          </div>
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
          disabled={loading}
        >
          {loading ? "Cadastrando..." : "Cadastrar"}
        </button>
      </form>
    </div>
  );
};

export default CreateDependente;
