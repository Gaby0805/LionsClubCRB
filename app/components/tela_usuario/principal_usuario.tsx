'use client';

import { useEffect, useState } from "react";
import { Button } from "@mui/material";
import InfoUser from "@/app/components/tela_usuario/tabela_principal_usuario";
import axios from "axios";
import { useUser } from "@/app/components/context/UserContext";
import ModalUsuario from "@/app/components/tela_usuario/adm/modal_criar_usuario";
import ListaUsuariosModal from "@/app/components/tela_usuario/adm/modal_usuarios_existentes";
import Asside from "../dash/asside";
import HeaderDash from "../dash/headerdash";
import {api} from "../../components/uteis/api"

export default function UsuariosLista() {
  const [open, setOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [isAdmVisible, setIsAdmVisible] = useState(false);
  const [token, setToken] = useState<string>("");

  const { userId } = useUser();

  const [userInfo, setUserInfo] = useState({
    nome_user: "",
    sobrenome: "",
    email: "",
    cpf: "",
    senha: "", // senha continua obrigatória no state local
    tipo_user: "",
  });

  useEffect(() => {
    const tokenFromStorage = localStorage.getItem("token") || "";
    setToken(tokenFromStorage);
  }, []);

  useEffect(() => {
    const fetchUserInfo = async () => {
      if (!userId || !token) return;

      try {
        const response = await api.post(
          "usuario/especifico",
          { id_usuario: userId },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserInfo({
          nome_user: response.data.nome_user,
          sobrenome: response.data.sobrenome,
          email: response.data.email,
          cpf: response.data.cpf,
          tipo_user: response.data.tipo_user,
          senha: "",
        });

        const nomeCompleto = `${response.data.nome_user} ${response.data.sobrenome}`.trim();
        const tipoUser = response.data.tipo_user;
        console.log("Nome completo do usuário:", response.data.nome_user );
if (
  response.data.nome_user.trim().toLowerCase() === 'ana' ||
  tipoUser === "Adm" ||
  tipoUser === "Presidente"
) {
  setIsAdmVisible(true);
} else {
  setIsAdmVisible(false);
}

      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    };

    fetchUserInfo();
  }, [userId, token]);

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);

  const handleLogout = () => {
    const confirme = confirm("Tem certeza que deseja sair da conta?");
    if (!confirme) return;
    localStorage.clear();
    try {
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

              {isAdmVisible && (
                <div className="flex gap-4 mt-4">
                  <Button variant="outlined" onClick={() => setOpen(true)}>
                    Criar usuário
                  </Button>
                  <Button variant="outlined" onClick={handleOpenModal}>
                    Ver todos os usuários
                  </Button>
                </div>
              )}

              <ModalUsuario open={open} handleClose={() => setOpen(false)} />
              <ListaUsuariosModal open={openModal} handleClose={handleCloseModal} />
            </div>

            <div className="flex justify-end mr-16 mt-4">
              <Button variant="outlined" size="large" onClick={handleLogout} color="error">
                Sair da conta
              </Button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
