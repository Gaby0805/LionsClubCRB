"use client";

import React, { useEffect, useState } from "react";
import { Button, Modal, TextField } from "@mui/material";
import { useUser } from "./context/UserContext";
import axios from "axios";

export default function InfoUser() {
  const { userId } = useUser();

  const [Infosearch, setInfosearch] = useState({
    nome_user: '',
    sobrenome: '',
    email: '',
    cpf: '',
    senha: '',
    tipo_user: '',
  });

  const [respostasNome, setRespostasNome] = useState(Infosearch.nome_user);
  const [respostasSobrenome, setRespostasSobrenome] = useState(Infosearch.sobrenome);
  const [respostasEmail, setRespostasEmail] = useState(Infosearch.email);
  const [respostasCpf, setRespostasCpf] = useState(Infosearch.cpf);
  const [respostasSenha, setRespostasSenha] = useState('');
  const [Isenable, setIsenable] = useState(true);
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);
  // Estado para o Modal de troca de senha
  const [openModal, setOpenModal] = useState(false);
  const [senhaAntiga, setSenhaAntiga] = useState('');
  const [senhaNova, setSenhaNova] = useState('');

  // Função para abrir e fechar o modal
  const handleOpenModalSenha = () => setOpenModal(true);
  const handleCloseModalSenha = () => setOpenModal(false);

  // Função para trocar a senha no backend
  const trocarSenha = async () => {
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
    Authorization: `Bearer ${token}`
  }
}      );
      alert(response.data.message); // Exibe a mensagem de sucesso
      handleCloseModalSenha(); // Fecha o modal
    } catch (error) {
      console.error("Erro ao trocar senha:", error);
      alert("Erro ao trocar senha.");
    }
  };

  // Função para buscar os dados do usuário
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "https://leoncio-backend-production.up.railway.app/usuario/especifico",
          { id_usuario: userId },
  {
  headers: {
    Authorization: `Bearer ${token}`
  }
}        );

        setInfosearch({
          nome_user: response.data.nome_user,
          sobrenome: response.data.sobrenome_user,
          email: response.data.email,
          cpf: response.data.cpf,
          tipo_user: response.data.tipo_user,
        });
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };

    if (userId) {
      fetchData();
    }
  }, [userId]);

  // Função para alterar os dados do usuário
  const alterUser = () => {
    try {
      const confirmealter = confirm(
        'info: ' +
        'Nome: ' + respostasNome +
        ' Sobrenome: ' + respostasSobrenome +
        ' Email: ' + respostasEmail +
        ' CPF: ' + respostasCpf
      );
      if (!confirmealter) return;

      const response = axios.put(
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
    Authorization: `Bearer ${token}`
  }
}      );
      response.catch(() => {
        alert("Houve algum erro em alguma informação, confira a quantidade de caracteres em cada campo.");
      });
    } catch (err) {
      console.log(err);
      alert("Houve algum erro em alguma informação, confira a quantidade de caracteres em cada campo.");
    }
  };

  // Atualiza as respostas quando Infosearch mudar
  useEffect(() => {
    setRespostasNome(Infosearch.nome_user);
    setRespostasSobrenome(Infosearch.sobrenome);
    setRespostasEmail(Infosearch.email);
    setRespostasCpf(Infosearch.cpf);
  }, [Infosearch]);

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
              defaultValue={Infosearch.nome_user}
              onChange={(e) => setRespostasNome(e.target.value)}
              disabled={Isenable}
            />
          </div>

          <div className="flex flex-col">
            <label> Sobrenome</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              defaultValue={Infosearch.sobrenome}
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
              type="text"
              defaultValue={Infosearch.email}
              onChange={(e) => setRespostasEmail(e.target.value)}
              disabled={Isenable}
            />
          </div>

          <div className="flex flex-col">
            <label> CPF</label>
            <input
              className="w-fit h-9 rounded-md bg-gray-300 p-2"
              type="text"
              defaultValue={Infosearch.cpf}
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
              defaultValue={Infosearch.tipo_user}
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
                className="w-34"
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
            className="w-56"
            onClick={() => { setIsenable(!Isenable) }}
          >
            Alterar informações
          </Button>
          <div className="m-2"></div>
          <Button
            variant="outlined"
            color="inherit"
            size="medium"
            className="w-40"
            onClick={alterUser}
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
            <div className="my-6"></div>
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
              <Button
                variant="contained"
                color="primary"
                onClick={trocarSenha}
              >
                Confirmar
              </Button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
