'use client';

import React, { useEffect, useState } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import axios from "axios";
import ModalTipoUsuario from "./ModalTipoUsuario"; // Certifique-se de que o caminho está correto

interface Usuario {
  id_user: number;
  nome_user: string;
  sobrenome_user: string;
  tipo_user: string;
}

export default function ListaUsuariosModal({ open, handleClose }: { open: boolean, handleClose: () => void }) {
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [userSelecionado, setUserSelecionado] = useState<Usuario | null>(null);
  const [openTipoModal, setOpenTipoModal] = useState(false);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get("http://localhost:3333/usuario", {
          withCredentials: true,
        });
        setUsuarios(response.data);
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    };

    if (open) fetchUsuarios();
  }, [open]);

  const handleAbrirModalTipo = (user: Usuario) => {
    setUserSelecionado(user);
    setOpenTipoModal(true);
  };

  const handleFecharModalTipo = () => {
    setOpenTipoModal(false);
    setUserSelecionado(null);
  };

  return (
    <>
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle className="text-center text-2xl font-bold">Lista de Usuários</DialogTitle>
        <DialogContent>
          <div className="bg-gray-100 rounded-lg p-6 h-[400px] overflow-y-auto">
            {usuarios.map((user) => (
              <div
                key={user.id_user}
                className="bg-white rounded-lg p-4 shadow-sm flex justify-between items-center mb-4"
              >
                <div className="flex-1">
                  <h3 className="text-xl font-semibold">
                    {user.nome_user} {user.sobrenome_user}
                  </h3>
                  <p className="text-gray-600">ID: {user.id_user}</p>
                  <p className="text-gray-600">Cargo: {user.tipo_user}</p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <Button
                    variant="outlined"
                    color="primary"
                    size="small"
                    onClick={() => alert(`Alterar senha de ${user.nome_user}`)}
                  >
                    Alterar senha
                  </Button>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleAbrirModalTipo(user)}
                  >
                    Mudar cargo
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Fechar
          </Button>
        </DialogActions>
      </Dialog>

      {/* Modal para mudar o tipo de usuário */}
      {userSelecionado && (
        <ModalTipoUsuario
          open={openTipoModal}
          onClose={handleFecharModalTipo}
          userId={userSelecionado.id_user}
        />
      )}
    </>
  );
}
