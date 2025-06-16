'use client';

import React, { useEffect, useState } from "react";
import { BookOpen, Backpack, FileSpreadsheet, NotepadText } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import Link from "next/link";

const adminRoles = [
  "ADM/Presidente",
  "Vice",
  "Diretor de Patrimonio",
];

const extendedAdminRoles = [
  ...adminRoles,
  "1º secretária",
];

export default function Asside() {
  const { userId } = useUser();
  const [token, setToken] = useState<string | null>(null);
  const [isUser, setUser] = useState("hidden");
  const [isUser2, setUser2] = useState("hidden");
  const [Infosearch, setInfosearch] = useState({
    nome_user: "",
    sobrenome: "",
    email: "",
    cpf: "",
    senha: "",
    tipo_user: "",
  });

  // Pega token uma vez ao montar
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  // Busca dados do usuário sempre que userId e token estiverem definidos
  useEffect(() => {
    if (!userId || !token) return;

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://leoncio-backend-production.up.railway.app/usuario/especifico",
          { id_usuario: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const data = response.data;
        setInfosearch({
          nome_user: data.nome_user,
          sobrenome: data.sobrenome_user,
          email: data.email,
          cpf: data.cpf,
          tipo_user: data.tipo_user,
          senha: "",
        });

        setUser(adminRoles.includes(data.tipo_user) ? "" : "hidden");
        setUser2(extendedAdminRoles.includes(data.tipo_user) ? "" : "hidden");
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  return (
    <div
      className="w-60 h-full rounded-r-xl"
      style={{ backgroundColor: "#4C506B" }}
    >
      <nav className="text-white flex flex-col justify-between h-full w-full">
        <div className="flex flex-col justify-center items-center gap-9 mt-15">
          <div className={`flex items-center ${isUser2}`}>
            <BookOpen />
            <Link className="ml-3" href="/dashboard/comodato">
              realizar contrato
            </Link>
          </div>
          <div className="flex items-center">
            <Backpack />
            <Link className="ml-3" href="/dashboard/inventario">
              Inventário Comodato
            </Link>
          </div>

          <div className={`flex items-center ${isUser}`}>
            <Backpack />
            <Link className="ml-3" href="/dashboard/inventariog">
              Inventário Patrimonial
            </Link>
          </div>
          <div className="flex items-center">
            <FileSpreadsheet />
            <Link className="ml-4" href="/dashboard/relatorio">
              Relatório
            </Link>
          </div>
          <div className="flex items-center">
            <NotepadText />
            <Link className="ml-4 flex flex-wrap" href="/dashboard/stats">
              Status <br />Comodato
            </Link>
          </div>
        </div>

        <div className="flex flex-col items-center gap-6 mb-6">
          <Link href="/dashboard">
            <img src="/imgs/LogoLeoncio.png" alt="Logo" className="w-20" />
          </Link>
        </div>
      </nav>
    </div>
  );
}
