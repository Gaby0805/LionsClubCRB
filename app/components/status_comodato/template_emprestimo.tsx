'use client';

import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalComodatoteste from "./modal_ver_comodato";  // Importando o modal
import { api } from "../uteis/api";

interface StatuscomodatoProps {
  nome: string;
  status: string;
  data: string;
  id: string;
  nome_item: string;
  sobrenome: string;
  telefone: string;
  identificacao: string;
}

export default function Statuscomodato({ nome, status, data, id, nome_item, sobrenome, telefone,identificacao}: StatuscomodatoProps) {
  const [Isready, setIsready] = useState(false);
  const [openModal, setOpenModal] = useState(false);  // Estado para controlar a exibição do modal
  const [selectedItem, setSelectedItem] = useState<any>(null);  // Estado para armazenar o item selecionado
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  
  const ConcluirAction = () => {
    const confirme = confirm('O usuário completou o empréstimo?');
    if (!confirme) return;
    try {

      api.put('transacao/status', { id_emprestimo: id },           {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    }
    catch (error) {
      console.error('Erro ao concluir o empréstimo:', error);
    }
  };

  const handleOpenModal = () => {
    setSelectedItem({ nome_comodato: nome, sobrenome_comodato: sobrenome, status, nome_material: nome_item, telefone: telefone, data_limite: data, id });  // Aqui você pode passar mais informações
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedItem(null);  // Limpa os dados ao fechar o modal
  };

  useEffect(() => {
    if (status === "Concluido") {
      setIsready(true);
    }
  }, [status]);

  return (
    <div className="bg-white mr-10 rounded-lg p-4 shadow-md flex">
      <div className="flex-1">
        <h3 className="text-xl font-semibold">{nome}</h3>
        <p>Status: {status}</p>
        <p>id do item: {identificacao}</p>
        <p>Item: {nome_item}</p>
        <p>Data limite: {data}</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <button className="w-fit h-10 mb-2 p-2 bg-gray-300 rounded-md" onClick={handleOpenModal}>
          Ver informações
        </button>
        <button disabled={Isready} className="w-20 h-10 bg-gray-300 rounded-md" onClick={ConcluirAction}>
          Concluir
        </button>
      </div>

      {/* Modal será exibido aqui */}
      {openModal && <ModalComodatoteste item={selectedItem} onClose={handleCloseModal} />}
    </div>
  );
}
