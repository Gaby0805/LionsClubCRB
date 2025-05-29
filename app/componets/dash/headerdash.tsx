'use client';

import { CircleUserRound } from "lucide-react";
import { useUser } from "../context/UserContext";
import axios from "axios";
import { useEffect, useState } from "react";
import Link from "next/link";

export default function HeaderDash() {
  const { userId } = useUser();
  const [valor, setValor] = useState<string>('');
  
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!userId || !token) return;

    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://leoncio-backend-production.up.railway.app/usuario/especifico",
          { id_usuario: userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setValor(response.data.nome_user);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [userId]);

  return (
    <div className="flex h-16 bg-white items-center mx-10 justify-between">
      <p className="font-bold text-2xl">{valor || "Carregando..."}</p>
      <div>
        <Link href="/dashboard/usuarios">
          <CircleUserRound color="black" size={36} />
        </Link>
      </div>
    </div>
  );
}
