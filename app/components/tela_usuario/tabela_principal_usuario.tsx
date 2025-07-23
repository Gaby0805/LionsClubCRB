"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useUser } from "../context/UserContext";
import axios from "axios";

export default function InfoUser() {
  const { userId } = useUser();

  // Estado para guardar o token, que será buscado no localStorage no client-side
  const [token, setToken] = useState<string | null>(null);

  // Estado para os dados do usuário
  const [Infosearch, setInfosearch] = useState({
    nome_user: '',
    sobrenome: '',
    email: '',
    cpf: '',
    senha: '',
    tipo_user: '',
  });

  // Estados para os inputs controlados
  const [respostasNome, setRespostasNome] = useState('');
  const [respostasSobrenome, setRespostasSobrenome] = useState('');
  const [respostasEmail, setRespostasEmail] = useState('');
  const [respostasCpf, setRespostasCpf] = useState('');
  const [Isenable, setIsenable] = useState(true);

  // Modal para troca de senha
  const [openModal, setOpenModal] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaNova, setSenhaNova] = useState('');

  // Busca o token apenas no client side (no primeiro carregamento)
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  // Busca os dados do usuário quando userId e token estiverem disponíveis
  useEffect(() => {
    if (!userId || !token) return; // evita rodar sem dados essenciais

    const fetchData = async () => {
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
          senha: '', // não carregar senha por segurança
          tipo_user: response.data.tipo_user,
        });
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [userId, token]);

  // Sincroniza os inputs controlados com os dados carregados
  useEffect(() => {
    setRespostasNome(Infosearch.nome_user);
    setRespostasSobrenome(Infosearch.sobrenome);
    setRespostasEmail(Infosearch.email);
    setRespostasCpf(Infosearch.cpf);
  }, [Infosearch]);

  // Funções para abrir e fechar modal
  const handleOpenModalSenha = () => setOpenModal(true);
  const handleCloseModalSenha = () => setOpenModal(false);

  // Trocar senha
  const trocarSenha = async () => {
    if (!token || !userId) {
      alert("Usuário ou token não estão disponíveis.");
      return;
    }

    try {
      const response = await axios.put(
        "https://leoncio-backend-production.up.railway.app/usuario/senha",
        {
          id_usuario: userId,
          senha_antiga: senhaAntiga,
          senha_nova: senhaNova,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(response.data.message);
      handleCloseModalSenha();
      setSenhaAntiga('');
      setSenhaNova('');
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      alert("Erro ao trocar senha.");
    }
  };

  // Alterar dados do usuário
  const alterUser = async () => {
    if (!token || !userId) {
      alert("Usuário ou token não estão disponíveis.");
      return;
    }

    const confirmealter = confirm(
      'Confirma a alteração dos dados?\n' +
      `Nome: ${respostasNome}\n` +
      `Sobrenome: ${respostasSobrenome}\n` +
      `Email: ${respostasEmail}\n` +
      `CPF: ${respostasCpf}`
    );
    if (!confirmealter) return;

    try {
      await axios.put(
        "https://leoncio-backend-production.up.railway.app/usuario",
        {
          id_usuario: userId,
          u_nome: respostasNome,
          u_sobrenome: respostasSobrenome,
          u_email: respostasEmail,
          u_cpf: respostasCpf,
          u_tipo: Infosearch.tipo_user,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Dados alterados com sucesso!");
      setIsenable(true);
    } catch (error) {
      console.error("Erro ao alterar dados:", error);
      alert("Erro ao alterar dados. Confira os campos.");
    }
  };

  // Se ainda não tem userId ou token, pode mostrar carregando
  if (!userId || !token) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="flex flex-col items-center mt-4 overflow-auto">
      <h2 className="text-[24px]">Suas informações</h2>
      <div className="p-10 informações h-fit m-5 flex flex-col border rounded-2xl">
        <div className="flex m-5">
          <div className="flex flex-col mr-10">
            <label> Nome</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              value={respostasNome}
              onChange={(e) => setRespostasNome(e.target.value)}
              disabled={Isenable}
            />
          </div>

          <div className="flex flex-col">
            <label> Sobrenome</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              value={respostasSobrenome}
              onChange={(e) => setRespostasSobrenome(e.target.value)}
              disabled={Isenable}
            />
          </div>
        </div>

        <div className="m-5 flex">
          <div className="flex flex-col mr-10">
            <label> Email</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="email"
              value={respostasEmail}
              onChange={(e) => setRespostasEmail(e.target.value)}
              disabled={Isenable}
            />
          </div>

          <div className="flex flex-col">
            <label> CPF</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              value={respostasCpf}
              onChange={(e) => setRespostasCpf(e.target.value)}
              disabled={Isenable}
            />
          </div>
        </div>

        <div className="m-5 flex">
          <div className="flex flex-col mr-10">
            <label> Tipo do Usuario</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              value={Infosearch.tipo_user}
              disabled
            />
          </div>

          <div className="flex flex-col">
            <label> Senha</label>
            <div className="flex justify-center p-2">
              <Button
                variant="outlined"
                color="inherit"
                size="small"
                disabled={Isenable}
                onClick={handleOpenModalSenha}
              >
                Trocar senha
              </Button>
            </div>
          </div>
        </div>

        <div className="max-w-full flex justify-center">
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={() => setIsenable(!Isenable)}
          >
            Alterar informações
          </Button>
          <div className="m-2"></div>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            onClick={alterUser}
            disabled={Isenable}
          >
            Enviar
          </Button>
        </div>
      </div>

      {/* Modal para Trocar Senha */}
      <Modal open={openModal} onClose={handleCloseModalSenha}>
        <div className="flex justify-center items-center w-full h-full bg-opacity-50 bg-gray-500">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-center text-xl mb-4">Trocar Senha</h3>
            <TextField
              label="Senha Antiga"
              variant="outlined"
              type="password"
              fullWidth
              className="mb-4"
              value={senhaAntiga}
              onChange={(e) => setSenhaAntiga(e.target.value)}
            />
            <TextField
              label="Nova Senha"
              variant="outlined"
              type="password"
              fullWidth
              className="mb-4 mt-5"
              value={senhaNova}
              onChange={(e) => setSenhaNova(e.target.value)}
            />
            <div className="flex justify-center">
              <Button variant="contained" color="primary" onClick={trocarSenha}>
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
