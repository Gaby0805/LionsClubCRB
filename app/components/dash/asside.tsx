'use client';

import React, { useEffect, useState } from "react";
import {
  BookOpen,
  Backpack,
  FileSpreadsheet,
  NotepadText,
  Menu,
  X,
  LetterText,
  LetterTextIcon
} from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Link from "next/link";
import { permissoesPorCargo } from "../cargos/cargos_usuarios";
import EmailCard from "../pre_login/cardemail";
import {api} from "../../components/uteis/api"

export default function Asside() {
  const { userId } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [permissoes, setPermissoes] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  useEffect(() => {
    if (!userId || !token) return;

    const fetchData = async () => {
      try {
        const response = await api.post(
          "usuario/especifico",
          { id_usuario: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const { tipo_user, nome } = response.data;

        if (nome?.toLowerCase().includes("ana karina")) {
          // Acesso total para Ana Karina
          setPermissoes(["comodato", "inventario", "inventariog", "relatorio", "stats"]);
        } else {
          const permissoesDoCargo = permissoesPorCargo[tipo_user] || [];
          setPermissoes(permissoesDoCargo);
        }
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const podeVer = (rota: string) => permissoes.includes(rota);

  return (
    <>
      <button
        className="md:hidden fixed top-4 left-4 z-50 text-white bg-gray-800 p-2 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      <div
        className={`fixed md:static top-0 left-0 h-full bg-[#4C506B] text-white z-40 transform transition-transform duration-300 ${
          isOpen ? "translate-x-0 w-60" : "-translate-x-full md:translate-x-0 md:w-60"
        }`}
      >
        <nav className="flex flex-col justify-between h-full w-full p-4">
          <div className="flex flex-col justify-center gap-6 mt-10">
            {podeVer("comodato") && (
              <Link href="/dashboard/comodato" className="flex items-center gap-2 hover:text-gray-300">
                <BookOpen size={20} />
                <span>Realizar Contrato</span>
              </Link>
            )}
            {podeVer("inventario") && (
              <Link href="/dashboard/inventario" className="flex items-center gap-2 hover:text-gray-300">
                <Backpack size={20} />
                <span>Inventário Comodato</span>
              </Link>
            )}
            {/* {podeVer("inventariog") && (
              <Link href="/dashboard/inventariog" className="flex items-center gap-2 hover:text-gray-300">
                <Backpack size={20} />
                <span>Inventário Patrimonial</span>
              </Link>
            )} */}
            {podeVer("relatorio") && (
              <Link href="/dashboard/relatorio" className="flex items-center gap-2 hover:text-gray-300">
                <FileSpreadsheet size={20} />
                <span>Relatório</span>
              </Link>
            )}
            {podeVer("stats") && (
              <Link href="/dashboard/stats" className="flex items-center gap-2 hover:text-gray-300">
                <NotepadText size={20} />
                <span className="leading-5">Status Comodato</span>
              </Link>
            )}
            {/* {podeVer("correspondencia") && (
              <Link href="/dashboard/correspondencia" className="flex items-center gap-2 hover:text-gray-300">
                <LetterTextIcon  />
                <span className="leading-5">correspondencias</span>
              </Link>
            )} */}
          </div>

          <div className="flex justify-center mb-4">
            <Link href="/dashboard">
              <img src="/imgs/LogoLeoncio.png" alt="Logo" className="w-20" />
            </Link>
          </div>
        </nav>
      </div>
    </>
  );
}
