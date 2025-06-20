'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

type EditProps = {
  nome: string;
  status: string;
  tamanho: string;
  descricao: string;
  estoque_id: number; // ou string, dependendo do que estiver vindo
};

export default function Edit({ nome, status, tamanho, descricao, estoque_id }: EditProps) {  const [open, setOpen] = useState(false);
  const [nomeEditado, setNomeEditado] = useState(nome);
  const [descricaoEditada, setDescricaoEditada] = useState(descricao);
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState(tamanho);
  const [statusSelecionado, setStatusSelecionado] = useState(status);
  const [Item, setItems] = useState('')
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  

  useEffect(() => {
    setNomeEditado(nome);
    setDescricaoEditada(descricao);
    setTamanhoSelecionado(tamanho);
    setStatusSelecionado(status);
  }, [nome, descricao, tamanho, status]);
console.log(estoque_id)
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const atualizar = async () => {
    try {
      console.log("Dados enviados:", { nomeEditado, descricaoEditada, statusSelecionado, tamanhoSelecionado });
      const response = await axios.put('https://leoncio-backend-production.up.railway.app/estoque/', {
        estoque_id,
        nome_material: nomeEditado, 
        descricao: descricaoEditada,
        status: statusSelecionado,
        tamanho: tamanhoSelecionado
      },
      {          
            headers: {
              Authorization: `Bearer ${token}`
            
          }});
      handleClose();
      console.log('Resposta do servidor:', response);
    } catch (error) {
      alert('Error: Verifique as informações')
      console.error("Erro ao atualizar os dados:", error);
    }
  };

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.post("https://leoncio-backend-production.up.railway.app/estoque/valores/",{
                  id_estoque: estoque_id
                },
                  {          
            headers: {
              Authorization: `Bearer ${token}`
            
          }});                                                
                setItems(response.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, [token,estoque_id]);

  return (
    <div className="w-24 py-2 px-4 rounded-md bg-gray-400">
      <Button sx={{color: 'black'}} onClick={handleOpen}>Editar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" className="flex justify-center items-center" variant="h6" component="h2">
            Edite os valores
          </Typography>
          <Typography id="modal-modal-description" className="flex justify-center items-center flex-col" sx={{ mt: 2 }}>
            <label>Nome:</label>
            <input
              type="text"
              className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
            />

            <label>Descrição:</label>
            <textarea
              className="border-[2px] w-35 h-20 rounded-sm pl-2 mb-3"
              value={descricaoEditada}
              onChange={(e) => setDescricaoEditada(e.target.value)}
            />

            <label>Tamanho:</label>
            <select
              className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3"
              value={tamanhoSelecionado}
              onChange={(e) => setTamanhoSelecionado(e.target.value)}
            >
              <option value="Padrão">Padrão</option>
              <option value="Pequena">Pequena</option>
              <option value="Média">Média</option>
              <option value="Grande">Grande</option>
            </select>

            <label>Status:</label>
            <select
              className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3"
              value={statusSelecionado}
              onChange={(e) => setStatusSelecionado(e.target.value)}
            >
              <option value="Disponível">Ativo</option>
              <option value="Indisponível">Inativo</option>
            </select>

            <input
              type="button"
              className="border-[2px] w-35 h-10 rounded-sm pl-2"
              value="Enviar"
              onClick={atualizar}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
