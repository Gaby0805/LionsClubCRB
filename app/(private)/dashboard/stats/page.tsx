'use client'

import React, { useEffect, useState } from "react";
import Asside from "@/app/componets/dash/asside";
import HeaderDash from "@/app/componets/dash/headerdash";
import Statuscomodato from "@/app/componets/statusitem";
import axios from "axios";
import Itempage from "@/app/componets/pagination";
import EditStats from "@/app/componets/itemstats";
import nookies from 'nookies'

interface ComodatoItem {
  id_comodato: number;
  nome_comodato: string;
  status: string;
  data_limite: string;
  id_emprestimo: number;
  nome_material: string;
}

export default function StatsItem() {
  const [items, setItems] = useState<ComodatoItem[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItem, setSelectedItem] = useState<ComodatoItem | null>(null);
  const itemsPerPage = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://leoncio-backend.onrender.com/transacao/info", {
          withCredentials: true,
        });
        setItems(response.data);
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };
    fetchData();
  }, []);

  const totalPages = Math.ceil(items.length / itemsPerPage);
  const currentItems = items.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden">
      <div className="flex flex-1">
        <Asside />
        <div className="flex flex-col w-full">
          <HeaderDash />
          <main className="flex-1 bg-gray-200 flex flex-col overflow-auto ">
            <div className="flex m-5 flex-col flex-1 scroll-auto">
              <div className="text-3xl mb-4">Status comodato</div>

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
                        status={item.status}
                        nome_item={item.nome_material}
                        data={new Date(item.data_limite)
                          .toISOString()
                          .split("T")[0]}
                          id={item.id_emprestimo}
                      />
                    </li>
                  ))}
                </ul>
              </div>

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
