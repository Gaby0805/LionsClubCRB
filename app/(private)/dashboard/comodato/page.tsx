'use client'
import React, { useEffect, useState } from 'react';
import Asside from "../../../components/dash/asside";
import HeaderDash from "../../../components/dash/headerdash";
import { useAuth } from "../../../components/comodato/auth_token";
import { useFormData } from "../../../components/comodato/formdata";
import { useUser } from "@/app/components/context/UserContext";
import FormInput from "../../../components/comodato/Normal";
import FormDropdown from "../../../components/comodato/input_dropdown";
import ItemList from "../../../components/comodato/lista_items_inventario";
import axios from 'axios';
import { isInvalidCPF, isInvalidRG } from "../../../components/comodato/validacao";
import CPFInputReduzido from '@/app/components/comodato/cpf';
import CEPInputReduzido from '@/app/components/comodato/cep';
import TelefoneInputReduzido from '@/app/components/comodato/telefone';

export default function Comodato() {
  const { userId } = useUser();
  const token = useAuth();
  const { formData, handleInputChange, handleDropdownChange } = useFormData();
  const [itensSelecionados, setItensSelecionados] = useState<{ id: number }[]>([]);
  const [item, setItem] = useState<{ id_estoque: number; nome_material: string }[]>([]);
  const [valor, setValor] = useState<string>("");

  useEffect(() => {
    if (!token || !userId) return;

    axios.post("https://leoncio-backend-production.up.railway.app/usuario/especifico", { id_usuario: userId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setValor(response.data.nome_user)).catch(console.error);
  }, [token, userId]);

  useEffect(() => {
    if (!token) return;

    axios.get("https://leoncio-backend-production.up.railway.app/estoque/ComodatoList", {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setItem(response.data)).catch(console.error);
  }, [token]);

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
<main className="flex-1 h-full w-full bg-gray-100 p-10 overflow-auto">
  <h1 className="text-4xl font-bold mb-4 ">Cadastro</h1>
  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
    
    {/* Coluna 1 */}
    <div className="space-y-4">
      <FormInput
        label="Nome"
        name="nome"
        value={formData.nome}
        onChange={handleInputChange}
      />
      <CPFInputReduzido
  label="CPF"
  name="cpf"
  value={formData.cpf}
  onChange={handleInputChange}
  isInvalid={isInvalidCPF(formData.cpf)}
  errorMessage="CPF inválido"
/>

<CEPInputReduzido
  label="CEP"
  name="cep"
  value={formData.cep}
  onChange={handleInputChange}
  isInvalid={formData.cep.length > 8}
  errorMessage="CEP inválido (máximo 8 dígitos)"
/>

      <FormDropdown
        label="Cidade"
        name="cidade_id"
        value={formData.cidade_id}
        options={[
          { label: "Corumbá", value: "5" },
          { label: "Ladário", value: "6" }
        ]}
        onChange={(e) => handleDropdownChange("cidade_id", e.value)}
      />
<div className="flex gap-4">
  <div className="flex w-1/4 flex-col">
    <p>Número</p>
    <input
      type="text"
      tabIndex={9}
      name="numero_casa"
      value={formData.numero_casa}
      onChange={handleInputChange}
      className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
        !/^\d*$/.test(formData.numero_casa) && formData.numero_casa.length > 0
          ? 'border-red-500'
          : 'border-transparent'
      }`}
      placeholder="Ex: 123"
    />
    {!/^\d*$/.test(formData.numero_casa) && formData.numero_casa.length > 0 && (
      <span className="text-red-500 text-sm mt-1">
        Número inválido (somente números)
      </span>
    )}
  </div>

  <div className="flex-1 flex flex-col">
    <p>Bairro</p>
    <input
      type="text"
      tabIndex={11}
      name="bairro"
      value={formData.bairro}
      onChange={handleInputChange}
      className={`h-12 rounded-md bg-gray-300 p-2 border-2 ${
        !formData.bairro.trim() && formData.bairro.length > 0
          ? 'border-red-500'
          : 'border-transparent'
      }`}
      placeholder="Ex: Centro"
    />
    {!formData.bairro.trim() && formData.bairro.length > 0 && (
      <span className="text-red-500 text-sm mt-1">
        Bairro inválido (campo não pode ser vazio)
      </span>
    )}
  </div>
</div>
<TelefoneInputReduzido
  label="Telefone"
  name="telefone"
  value={formData.telefone}
  onChange={handleInputChange}
  isInvalid={formData.telefone !== '' && formData.telefone.length < 10}
  errorMessage="Telefone inválido"
/>


<TelefoneInputReduzido
  label="Telefone de referência"
  name="telefone2"
  value={formData.telefone2}
  onChange={handleInputChange}
  isInvalid={formData.telefone2.length < 10 && formData.telefone2!== ''} // ex: valida se é menor que 10 dígitos (ajuste como preferir)
  errorMessage="Telefone inválido"
/>

      <FormInput
        label="Usuário Responsável"
        name="usuario_responsavel"
        value={valor}
        onChange={() => {}}
        enable={true}
      />
    </div>

    {/* Coluna 2 */}
    <div className="space-y-4">
      <FormInput
        label="Sobrenome"
        name="sobrenome"
        value={formData.sobrenome}
        onChange={handleInputChange}
      />
      <FormInput
        label="RG"
        name="rg"
        value={formData.rg}
        onChange={handleInputChange}
        isInvalid={isInvalidRG(formData.rg)}
        errorMessage="RG inválido (somente números, máximo 15 dígitos)"
      />
      <FormInput
        label="Profissão"
        name="profissao"
        value={formData.profissao}
        onChange={handleInputChange}
      />
      <FormInput
        label="Rua"
        name="rua"
        value={formData.rua}
        onChange={handleInputChange}
      />
      <FormInput
        label="Complemento"
        name="complemento"
        value={formData.complemento}
        onChange={handleInputChange}
      />
      <FormDropdown
        label="Estado Civil"
        name="estado_civil"
        value={formData.estado_civil}
        options={[
          { label: "Solteiro(a)", value: "solteiro" },
          { label: "Casado(a)", value: "casado" },
          { label: "Divorciado(a)", value: "divorciado" },
          { label: "Viúvo(a)", value: "viuvo" }
        ]}
        onChange={(e) => handleDropdownChange("estado_civil", e.value)}
      />
    </div>

    {/* Coluna 3 - Itens Solicitados */}
    <div className="space-y-4 ml-40">
      <ItemList
        items={item}
        selectedItems={itensSelecionados}
        onItemSelect={handleItemSelection}
      />
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
