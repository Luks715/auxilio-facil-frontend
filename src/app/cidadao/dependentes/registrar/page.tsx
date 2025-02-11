import { useState, useEffect } from "react";
import { createDependente } from "@/app/_api/cidadaosApi";
import { CidadaoData, CreateDependenteData } from "@/types/cidadao";

// Interface para os dados do formulário
interface FormData {
  cpf: string;
  nome: string;
  data_nascimento: string; // data_nascimento como string
  responsavelId: number;
  enderecoId: number;
  condicoes: number[];
}

const CreateDependente = () => {
  const [formData, setFormData] = useState<FormData>({
    cpf: "",
    nome: "",
    data_nascimento: "", // Inicializado como string vazia
    responsavelId: NaN,
    enderecoId: NaN,
    condicoes: [],
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserData = () => {
      const cidadao = JSON.parse(localStorage.getItem("cidadao") || "{}") as CidadaoData;
      if (cidadao && cidadao.id && cidadao.enderecoId) {
        setFormData((prev) => ({
          ...prev,
          responsavelId: cidadao.id,
          enderecoId: cidadao.enderecoId,
        }));
      } else {
        setError("Erro ao carregar dados do responsável. Faça login novamente.");
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!formData.responsavelId || !formData.enderecoId) {
      setError("Dados do responsável ausentes. Faça login novamente.");
      setLoading(false);
      return;
    }

    try {
      // Converte a data_nascimento de string para Date
      const dataNascimento = new Date(formData.data_nascimento);

      // Cria um objeto CreateDependenteData com a data_nascimento no formato Date
      const createDependenteData: CreateDependenteData = {
        ...formData,
        data_nascimento: dataNascimento,
      };

      // Envia a requisição para criar o dependente
      const success = await createDependente(createDependenteData);

      if (success) {
        alert("Dependente cadastrado com sucesso!");
        setFormData({
          cpf: "",
          nome: "",
          data_nascimento: "",
          condicoes: [],
          responsavelId: formData.responsavelId,
          enderecoId: formData.enderecoId,
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