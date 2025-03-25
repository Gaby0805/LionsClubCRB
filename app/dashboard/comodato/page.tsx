'use client'
// Ajeitar o id do estoque e a transação

import React, { useState, useEffect } from "react";
import Asside from "../../componets/dash/asside";
import HeaderDash from "../../componets/dash/headerdash";
import { Checkbox } from "@mui/material";
import '@fontsource/roboto/300.css';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';
import { useUser } from "@/app/componets/context/UserContext";

export default function Comodato() {
  const { userId } = useUser();
  const [valor, setValor] = useState();
  
  useEffect(() => {
    const fetchData = async () => {
        try {
            const response = await axios.post("http://localhost:3333/usuario/especifico", {
                id_usuario: userId
            });
            setValor(response.data.nome_user);
        } catch (error) {
            console.log("Erro ao buscar dados:", error);
        }
    };

    if (userId) {
        fetchData();
    }
  }, [userId]);

  const [item, setItem] = useState([]);
  const [formData, setFormData] = useState({
    nome: "", sobrenome: "", cpf: "", rg: "", cep: "", profissao: "",
    estado_civil: "", rua: "", numero_casa: "", complemento: "", telefone: "", cidade_id: "" 
  });

  // Estado atualizado para armazenar nome e ID dos itens
  const [itensSelecionados, setItensSelecionados] = useState([]);

  // Busca os itens do estoque
  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get("http://localhost:3333/estoque/ComodatoList");
        setItem(response.data);
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  // Atualiza os valores dos inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Atualiza os Dropdowns
  const handleDropdownChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  // Atualiza os itens selecionados armazenando Nome + ID
  const handleItemSelection = (id, nome) => {
    setItensSelecionados((prev) => {
      const isSelected = prev.some(item => item.id === id);

      if (isSelected) {
        return prev.filter(item => item.id !== id); // Remove se já estiver selecionado
      } else {
        return [...prev, { id, nome }]; // Adiciona o item
      }
    });
  };

  // Envia os dados para API
  const Enviardados = async () => {
    try {
      const dataToSend = { ...formData, itensSelecionados };
      await axios.post("http://localhost:3333/comodato/", dataToSend);
      alert("Cadastro realizado com sucesso!");
    } catch (error) {
      console.log("Erro ao enviar dados:", error);
      alert("Erro ao cadastrar.");
    }
  };

  return (
    <div className="flex w-full h-full">
      <Asside />
      <div className="flex flex-1">
        <div className="flex flex-col w-full">
          <HeaderDash />
          <main className="flex-1 h-full w-full bg-gray-100 p-5">
            <h1 className="text-4xl font-bold mb-5">Cadastro</h1>

            {/* Grid Responsivo */}
            <div className="grid xl:grid-cols-3 gap-8">
              
              {/* Primeira Coluna */}
              <div className="space-y-4">
                {["Nome", "CPF", "profissao", "CEP", "Bairro", "Telefone"].map((label) => (
                  <div key={label} className="flex flex-col">
                    <p>{label}</p>
                    <input
                      type="text"
                      name={label.toLowerCase()}
                      value={formData[label.toLowerCase()]}
                      onChange={handleInputChange}
                      className="h-12 rounded-md bg-gray-300 p-2"
                    />
                  </div>
                ))}

                {/* Cidade (Dropdown) */}
                <div className="flex flex-col">
                  <p>Cidade</p>
                  <Dropdown
                    value={formData.cidade_id}
                    options={[
                      { label: "Corumbá", value: "11" },
                      { label: "Ladário", value: "12" }
                    ]}
                    onChange={(e) => handleDropdownChange("cidade_id", e.value)}
                    placeholder="Selecione uma cidade"
                    className="h-12 w-full bg-gray-300 rounded-md"
                  />
                </div>

                <div className="flex flex-col">
                  <p>Usuario responsavel</p>
                  <input className="h-12 rounded-md bg-gray-300 p-2" type="text" value={valor} disabled/>
                </div>
              </div>

              {/* Segunda Coluna */}
              <div className="space-y-4">
                {["Sobrenome", "RG", "Complemento"].map((label) => (
                  <div key={label} className="flex flex-col">
                    <p>{label}</p>
                    <input
                      type="text"
                      name={label.toLowerCase()}
                      value={formData[label.toLowerCase()]}
                      onChange={handleInputChange}
                      className="h-12 rounded-md bg-gray-300 p-2"
                    />
                  </div>
                ))}

                {/* Estado Civil (Dropdown) */}
                <div className="flex flex-col">
                  <p>Estado Civil</p>
                  <Dropdown
                    value={formData.estado_civil}
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

                {/* Rua e Número */}
                <div className="flex gap-4">
                  <div className="flex-1 flex flex-col">
                    <p>Rua</p>
                    <input
                      type="text"
                      name="rua"
                      value={formData.rua}
                      onChange={handleInputChange}
                      className="h-12 rounded-md bg-gray-300 p-2"
                    />
                  </div>
                  <div className="w-1/4 flex flex-col">
                    <p>Nº</p>
                    <input
                      type="text"
                      name="numero_casa"
                      value={formData.numero_casa}
                      onChange={handleInputChange}
                      className="h-12 rounded-md bg-gray-300 p-2"
                    />
                  </div>
                </div>
              </div>

              {/* Terceira Coluna (Itens Solicitados) */}
              <div className="flex flex-col justify-between ml-auto">
                <h3 className="text-2xl font-bold mb-4">Itens Solicitados</h3>
                <div className="space-y-2">
                  {item.map(({ id_estoque, nome_material }) => (
                    <div key={id_estoque} className="flex items-center">
                      <Checkbox
                        checked={itensSelecionados.some(item => item.id === id_estoque)}
                        onChange={() => handleItemSelection(id_estoque, nome_material)}
                      />
                      <p>{nome_material}</p>  
                    </div>
                  ))}
                </div>

                <button onClick={Enviardados} className="w-full mt-5 bg-blue-500 text-white rounded-md py-2 text-lg font-semibold hover:bg-blue-600 transition duration-200">
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
