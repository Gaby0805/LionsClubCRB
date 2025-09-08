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
import {api} from "../../../components/uteis/api"

export default function Comodato() {
  const { userId } = useUser();
  const token = useAuth();
  const { formData, handleInputChange, handleDropdownChange } = useFormData();
  const [itensSelecionados, setItensSelecionados] = useState<{ id: number }[]>([]);
  const [item, setItem] = useState<{ id_estoque: number; nome_material: string }[]>([]);
  const [valor, setValor] = useState<string>("");

  useEffect(() => {
    if (!token || !userId) return;

    api.post("usuario/especifico", { id_usuario: userId }, {
      headers: { Authorization: `Bearer ${token}` }
    }).then(response => setValor(response.data.nome_user)).catch(console.error);
  }, [token, userId]);

  useEffect(() => {
    if (!token) return;

    api.get("estoque/ComodatoList", {
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
    await api.post("comodato/", dataToSend, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // 2. Criar transações
    await api.post("transacao/", {
      cpf: formData.cpf,
      user_id: userId,
      estoque_id: itensSelecionados.map((i) => i.id),
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    // Buscar o ID do último comodato cadastrado
const ultimoRes = await api.get(
  "comodato/lastuser",
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



const docResponse = await api.post(
  "transacao/doc",
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
          await api.post(
            "transacao/",
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
  <h1 className="text-4xl font-bold mb-4 ">Cadastro de correspondecias</h1>

    <div className='flex  h-full bg-amber-200 m-5 justify-center items-center '>
    

    </div>

</main>

        </div>
      </div>
    </div>
  );
}
