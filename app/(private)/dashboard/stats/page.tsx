'use client';

import React, { useEffect, useState } from "react";
import Asside from "@/app/componets/dash/asside";
import HeaderDash from "@/app/componets/dash/headerdash";
import Statuscomodato from "@/app/componets/statusitem";
import axios from "axios";
import Itempage from "@/app/componets/pagination";
import { useRouter } from "next/navigation";

interface ComodatoItem {
  id_comodato: number;
  nome_comodato: string;
  sobrenome_comodato: string;
  status: string;
  data_limite: string;
  id_emprestimo: number;
  nome_material: string;
  numero_telefone: string;
}

export default function StatsItem() {
  const [items, setItems] = useState<ComodatoItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ComodatoItem | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedLetter, setSelectedLetter] = useState("");
  const itemsPerPage = 6;
  const letras = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");



  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) return;

    axios
      .get("https://leoncio-backend-production.up.railway.app/transacao/info", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setItems(response.data);
      })
      .catch((error) => {
        console.error("Erro ao buscar dados:", error);
      });
  }, []);

  const filteredItems = items.filter((item) => {
    const nome = item.nome_comodato.toLowerCase();
    const matchSearch = nome.includes(searchTerm.toLowerCase());
    const matchLetra = selectedLetter ? nome.startsWith(selectedLetter.toLowerCase()) : true;
    return matchSearch && matchLetra;
  });

  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const currentItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
      const router = useRouter();
      useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            // Se não tiver token, redireciona para o login
            router.push("/login");
        }
    }, []); 

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex flex-1">
        <Asside />
        <div className="flex flex-col w-full">
          <HeaderDash />
          <main className="flex-1 bg-gray-200 flex flex-col overflow-auto">
            <div className="flex flex-col flex-1 m-5">
              <div className="text-3xl mb-4">Status comodato</div>

              {/* 🔎 Pesquisa + Filtro */}
              <div className="sticky top-0 bg-gray-200 z-10 pb-4">
                <div className="flex flex-wrap items-center gap-4">
                  <input
                    type="text"
                    placeholder="Pesquisar por nome..."
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      setCurrentPage(1);
                    }}
                    className="px-3 py-2 rounded-md border border-gray-400 w-64"
                  />
                  <div className="flex flex-wrap gap-1">
                    {letras.map((letra) => (
                      <button
                        key={letra}
                        onClick={() => {
                          setSelectedLetter(letra === selectedLetter ? "" : letra);
                          setCurrentPage(1);
                        }}
                        className={`px-2 py-1 rounded border ${
                          selectedLetter === letra ? "bg-black text-white" : "bg-white"
                        }`}
                      >
                        {letra}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* 🟩 Itens */}
              <div className="p-4">
                <ul className="columns-1 sm:columns-2 md:columns-3 gap-4 space-y-4">
                  {currentItems.map((item) => (
                    <li
                      key={item.id_comodato}
                      className="break-inside-avoid p-3 rounded-lg cursor-pointer"
                      onClick={() => setSelectedItem(item)}
                    >
                      <Statuscomodato
                        nome={item.nome_comodato}
                        sobrenome={item.sobrenome_comodato}
                        telefone={item.numero_telefone}
                        status={item.status}
                        nome_item={item.nome_material}
                        data={new Date(item.data_limite).toISOString().split("T")[0]}
                        id={item.id_emprestimo.toString()}
                      />
                    </li>
                  ))}
                </ul>
              </div>

              {/* 🔢 Paginação */}
              <div className="mt-auto flex justify-center">
                <Itempage
                  totalPages={totalPages}
                  currentPage={currentPage}
                  onPageChange={setCurrentPage}
                />
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
