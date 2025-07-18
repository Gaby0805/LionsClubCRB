'use client';

import React, { useState, useEffect, ChangeEvent } from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import { Checkbox } from "@mui/material";
import '@fontsource/roboto/300.css';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useUser } from "@/app/componets/context/UserContext";
import { useRouter } from "next/navigation";

export default function Comodato() {
  const { userId } = useUser();
const [token, setToken] = useState<string | null>(null);
        const router = useRouter();
        useEffect(() => {
          const token = localStorage.getItem("token");
  
          if (!token) {
              router.push("/login");
          }
      }, []); 

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  const [valor, setValor] = useState<string>("");

  const [item, setItem] = useState<{ id_estoque: number; nome_material: string }[]>([]);
  const [itensSelecionados, setItensSelecionados] = useState<{ id: number }[]>([]);

  const [formData, setFormData] = useState({
    nome: "",
    sobrenome: "",
    cpf: "",
    rg: "",
    cep: "",
    bairro: "",
    telefone: "",
    telefone2: "",
    profissao: "",
    estado_civil: "",
    rua: "",
    numero_casa: "",
    complemento: "",
    cidade_id: ""
  });

  // Busca nome do usuario responsavel
useEffect(() => {
  if (!token || !userId) return;

  axios.post("https://leoncio-backend-production.up.railway.app/usuario/especifico", { id_usuario: userId }, {
    headers: { Authorization: `Bearer ${token}` }
  })
  .then(response => setValor(response.data.nome_user))
  .catch(console.error);
}, [token, userId]);

  // Busca itens de estoque
useEffect(() => {
  if (!token) return; // se token ainda não definido, não faz nada

  axios.get("https://leoncio-backend-production.up.railway.app/estoque/ComodatoList", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
  .then(response => setItem(response.data))
  .catch(console.error);
}, [token]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value.toUpperCase() }));
  };

  const handleDropdownChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleItemSelection = (id: number) => {
    setItensSelecionados(prev => {
      const exists = prev.some(i => i.id === id);
      return exists ? prev.filter(i => i.id !== id) : [...prev, { id }];
    });
  };

const Enviardados = async () => {
  try {
const dataToSend = {
  ...formData,
  cidade_id: Number(formData.cidade_id),
  numero_casa: Number(formData.numero_casa),
  itensSelecionados
};

    // 1. Cadastrar comodato
    await axios.post("https://leoncio-backend-production.up.railway.app/comodato/", dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 2. Criar transações
    await axios.post("https://leoncio-backend-production.up.railway.app/transacao/", {
      cpf: formData.cpf,
      user_id: userId,
      estoque_id: itensSelecionados.map((i) => i.id),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Buscar o ID do último comodato cadastrado
const ultimoRes = await axios.get(
  "https://leoncio-backend-production.up.railway.app/comodato/lastuser",
  {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }
);

const ultimoId = ultimoRes.data.id_comodato;

if (!ultimoId) {
  throw new Error("ID do último comodato não encontrado.");
}



const docResponse = await axios.post(
  "https://leoncio-backend-production.up.railway.app/transacao/doc",
  { id: ultimoId },
  {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    responseType: "blob", // <-- aqui fora do headers
  }
);

// Forçar download no navegador
const blob = new Blob([docResponse.data], {
  type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
});
const link = document.createElement("a");
link.href = window.URL.createObjectURL(blob);
link.download = `comodato_${ultimoId}.docx`;
link.click();

    } catch (error: any) {
      const errorMessage = error?.response?.data?.error;
  
      console.error("Erro:", errorMessage);
  
      // Checa se é erro de CPF duplicado
      if (
        errorMessage?.includes('duplicar valor da chave') ||
        errorMessage?.includes('pessoas_comodato_cpf_key') ||
        errorMessage?.includes('pessoas_comodato_rg_key') ||
        errorMessage?.includes('pessoas_comodato_cep_key') 
      ) {
        try {
          // CPF já cadastrado, envia apenas a transação
          await axios.post(
            "https://leoncio-backend-production.up.railway.app/transacao/",
            {
              cpf: formData.cpf,
              user_id: userId,
              estoque_id: itensSelecionados.map(i => i.id)
            },
    {
  headers: {
    Authorization: `Bearer ${token}`
  }
}          );
  
          alert("Cadastro realizado com sucesso! CPF já estava cadastrado.");
          return;
        } catch (transacaoError) {
          console.error("Erro ao cadastrar transação:", transacaoError);
          alert("Erro ao registrar transação.");
          return;
        }
      }
  
      alert("Erro ao cadastrar.");
    }
  };
  
  return (
    <div className="flex w-screen h-screen">
      <Asside />
      <div className="flex flex-1 overflow-hidden">
        <div className="flex flex-col w-full">
          <HeaderDash />
          <main className="flex-1 h-full w-full bg-gray-100 p-5 overflow-auto">
            <h1 className="text-4xl font-bold mb-5">Cadastro</h1>
            <div className="grid xl:grid-cols-3 gap-8">
              {/* Coluna 1 */}
              <div className="space-y-4">
                <div className="flex flex-col">
                  <p>Nome</p>
                  <input
                    tabIndex={1}
                    type="text"
                    name="nome"
                    value={formData.nome}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>

<div className="flex flex-col">
  <p>CPF</p>
  <input
    tabIndex={3}
    type="text"
    name="cpf"
    value={formData.cpf}
    onChange={handleInputChange}
    className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
      formData.cpf &&
      (formData.cpf.length > 11 || /[^\d]/.test(formData.cpf))
        ? 'border-red-500'
        : 'border-transparent'
    }`}
    placeholder="Ex: 12345678900"
  />
  {formData.cpf &&
    (formData.cpf.length > 11 || /[^\d]/.test(formData.cpf)) && (
      <span className="text-red-500 text-sm mt-1">
        CPF inválido (somente números, máximo 11 dígitos)
      </span>
    )}
</div>
<div className="flex flex-col">
  <p>CEP</p>
  <input
    tabIndex={5}
    type="text"
    name="cep"
    value={formData.cep}
    onChange={handleInputChange}
    className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
      formData.cep &&
      (formData.cep.length > 8 || /[^\d]/.test(formData.cep))
        ? 'border-red-500'
        : 'border-transparent'
    }`}
    placeholder="Ex: 12345678"
  />
  {/* 79321162 */}
{formData.cep &&
    (formData.cep.length > 8 || /[^\d]/.test(formData.cep)) && (
      <span className="text-red-500 text-sm mt-1">
        cep inválido (somente números, máximo 8 dígitos)
      </span>
    )}
</div>
                <div className="flex flex-col">
                  <p>Cidade</p>
                  <Dropdown
                  tabIndex={7}
                    value={formData.cidade_id}
                    options={[
                      { label: "Corumbá", value: "5" },
                      { label: "Ladário", value: "6" }
                    ]}
                    onChange={(e) => handleDropdownChange("cidade_id", e.value)}
                    placeholder="Selecione uma cidade"
                    className="h-12 w-full bg-gray-300 rounded-md"
                  />
                </div>
                <div className="flex gap-4">
                <div className="flex w-1/4 flex-col">
                  <p>Número</p>
                  <input
                    type="text"
                    tabIndex={9}
                    name="numero_casa"
                    value={formData.numero_casa}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
                <div className="flex-1 flex flex-col">
                  <p>Bairro</p>
                  <input
                    type="text"
                    tabIndex={11}
                    name="bairro"
                    value={formData.bairro}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
              </div>  
                <div className="flex flex-col">
                  <p>Telefone</p>
                  <input
                    type="text"
                    tabIndex={14}
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <p>Telefone de referencia</p>
                  <input
                    type="text"
                    tabIndex={14}
                    name="telefone2"
                    value={formData.telefone2}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <p>Usuário Responsável</p>
                  <input
                    type="text"
                    value={valor}
                    disabled
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
              </div>

              {/* Coluna 2 */}
              <div className="space-y-4">
              <div className="flex flex-col">
                  <p>Sobrenome</p>
                  <input
                  tabIndex={2}
                    type="text"
                    name="sobrenome"
                    value={formData.sobrenome}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
<div className="flex flex-col">
  <p>RG</p>
  <input
    tabIndex={4}
    type="text"
    name="rg"
    value={formData.rg}
    onChange={handleInputChange}
    className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
      formData.rg &&
      (formData.rg.length >10 || /[^\d]/.test(formData.rg))
        ? 'border-red-500'
        : 'border-transparent'
    }`}
    placeholder="Ex: 12345678912345"
  />
{formData.rg &&
    (formData.rg.length > 10 || /[^\d]/.test(formData.rg)) && (
      <span className="text-red-500 text-sm mt-1">
        rg inválido (somente números, máximo 10 dígitos)
      </span>
    )}
</div>

                <div className="flex flex-col">
                  <p>Profissão</p>
                  <input
                  tabIndex={5}
                    type="text"
                    name="profissao"
                    value={formData.profissao}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
                
                <div className="flex flex-col">
                  <p>Rua</p>
                  <input
                    type="text"
                    tabIndex={8}
                    name="rua"
                    value={formData.rua}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>

                <div className="flex flex-col">
                  <p>Complemento</p>
                  <input
                    type="text"
                    tabIndex={13}
                    name="complemento"
                    value={formData.complemento}
                    onChange={handleInputChange}
                    className="h-12 rounded-md bg-gray-300 p-2"
                  />
                </div>
                <div className="flex flex-col">
                  <p>Estado Civil</p>
                  <Dropdown
                    value={formData.estado_civil}
                    tabIndex={15}
                    options={[
                      { label: "Solteiro(a)", value: "solteiro" },
                      { label: "Casado(a)", value: "casado" },
                      { label: "Divorciado(a)", value: "divorciado" },
                      { label: "Viúvo(a)", value: "viuvo" }
                    ]}
                    onChange={(e) => handleDropdownChange("estado_civil", e.value)}
                    placeholder="Selecione um estado civil"
                    className="h-12 w-full bg-gray-300 rounded-md"
                  />
                </div>
              </div>

              {/* Coluna 3 - Itens Solicitados */}
              <div className="flex flex-col ml-auto">
                <h3 className="text-2xl font-bold">Itens Solicitados</h3>
                <div className="space-y-2 mt-10">
                  {item.map(({ id_estoque, nome_material }) => (
                    <div key={id_estoque} className="flex items-center">
                      <Checkbox
                        checked={itensSelecionados.some(i => i.id === id_estoque)}
                        onChange={() => handleItemSelection(id_estoque)}
                      />
                      <p>{nome_material}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={Enviardados}
                  className="w-full mt-5 bg-blue-500 text-white rounded-md py-2 text-lg font-semibold hover:bg-blue-600 transition duration-200"
                >
                  Enviar
                </button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
