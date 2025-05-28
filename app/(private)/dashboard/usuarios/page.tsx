"use client";

import React, { useEffect, useState } from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import { Button } from "@mui/material";
import InfoUser from "@/app/componets/infouser";
import axios from "axios";
import { useUser } from "@/app/componets/context/UserContext";
import ModalUsuario from "@/app/componets/modalcreateuser";
import ListaUsuariosModal from "@/app/componets/usercargos";

export default function UsuariosLista() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const { userId } = useUser();

  const [Isadm, SetIsadm] = useState("invisible");

  const [Infosearch, setInfosearch] = useState({
    nome_user: "",
    sobrenome: "",
    email: "",
    cpf: "",
    senha: "", // <- senha não vem da API, campo só para uso local
    tipo_user: "",
  });

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const CreateItemAdmin = () => {
    return (
      <div className={`w-fit h-fit ${Isadm} flex`}>
        <Button
          variant="outlined"
          color="inherit"
          size="medium"
          onClick={() => setOpen(true)}
          className="w-44"
        >
          Criar usuário
        </Button>
        <div className="mx-3"></div>
        <Button variant="outlined" color="inherit" onClick={handleOpenModal}>
          Ver todos os usuários
        </Button>

        <ListaUsuariosModal open={openModal} handleClose={handleCloseModal} />
        <ModalUsuario open={open} handleClose={() => setOpen(false)} />
      </div>
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!userId || !token) return;

      try {
        const response = await axios.post(
          "https://leoncio-backend-production.up.railway.app/usuario/especifico",
          { id_usuario: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setInfosearch({
          nome_user: response.data.nome_user,
          sobrenome: response.data.sobrenome_user,
          email: response.data.email,
          cpf: response.data.cpf,
          tipo_user: response.data.tipo_user,
          senha: "",
        });

        if (response.data.tipo_user === "ADM/Presidente") {
          SetIsadm("");
        }
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  const handleLogout = async () => {
    const confirme = confirm("Tem certeza que deseja sair da conta?");
    if (!confirme) return;

    try {
      await axios.post(
        "https://leoncio-backend-production.up.railway.app/usuario/logout",
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("Token apagado. Redirecionando...");
      window.location.href = "/login";
    } catch (error) {
      alert("Erro ao sair da conta");
      console.error(error);
    }
  };

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      <div className="flex flex-1">
        <Asside />
        <div className="flex-col w-full">
          <HeaderDash />

          <main className="flex-1 bg-gray-200 h-full">
            <div className="flex overflow-auto flex-col items-center">
              <InfoUser />
              <CreateItemAdmin />
            </div>

            <div className="flex justify-end mr-16 mt-6">
              <Button
                variant="outlined"
                size="large"
                onClick={handleLogout}
                color="error"
              >
                Sair da conta
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
