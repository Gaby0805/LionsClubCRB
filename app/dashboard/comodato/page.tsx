'use client'
import React, { useState, useEffect } from "react";
import Asside from "../../componets/dash/asside";
import HeaderDash from "../../componets/dash/headerdash";
import { Checkbox } from "@mui/material";
import '@fontsource/roboto/300.css';
import axios from "axios";
import { Dropdown } from 'primereact/dropdown';
import 'primereact/resources/themes/lara-light-indigo/theme.css';
import 'primereact/resources/primereact.min.css';

export default function Comodato() {
  const [item, setItem] = useState([]);
  const [formData, setFormData] = useState({
    nome: "", sobrenome: "", cpf: "", rg: "", cep: "", profissao: "",
    estado_civil: "", rua: "", numero_casa: "", complemento: "", telefone: "", cidade_id: "" 
  });
  const [itensSelecionados, setItensSelecionados] = useState([]);

  const atualizar = async () => {
    try {
      console.log("Valor Comodato criado:" );
      const response = await axios.put('http://localhost:3333/comodato/', {
        formData
      });

      console.log('Resposta do servidor:', response);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error);
    }
  };




  // Opções para os Dropdowns
  const estadoCivilOptions = [
    { label: "Solteiro(a)", value: "solteiro" },
    { label: "Casado(a)", value: "casado" },
    { label: "Divorciado(a)", value: "divorciado" },
    { label: "Viúvo(a)", value: "viuvo" }
  ];

  const cidadeOptions = [
    { label: "Corumbá", value: "11" },
    { label: "Ladário", value: "12" },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try { 
        const response = await axios.get("http://localhost:3333/estoque/ComodatoListtext");
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

  // Atualiza os itens selecionados
  const handleItemSelection = (nome_material) => {
    setItensSelecionados((prev) => 
      prev.includes(nome_material) ? prev.filter(item => item !== nome_material) : [...prev, nome_material]
    );
  };

  // Envia os dados para API
  const Enviardados = async () => {
    try {
      const dataToSend = { ...formData };
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
                    options={cidadeOptions}
                    onChange={(e) => handleDropdownChange("cidade_id", e.value)}
                    placeholder="Selecione uma cidade"
                    className="h-12 w-full bg-gray-300 rounded-md"
                  />
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
                    options={estadoCivilOptions}
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
                  {item.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <Checkbox
                        checked={itensSelecionados.includes(item.nome_material)}
                        onChange={() => handleItemSelection(item.nome_material)}
                      />
                      <p>{item.nome_material}</p>
                    </div>
                  ))}
                </div>

                {/* Botão de Envio */}
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
