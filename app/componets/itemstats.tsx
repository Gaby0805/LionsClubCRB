import axios from 'axios';
import { useState, useEffect } from 'react';
import { Box, Button, Typography, Modal } from '@mui/material';

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

export default function EditStats({modal}) {
  const [open, setOpen] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [descricaoEditada, setDescricaoEditada] = useState('');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('Padrão');
  const [valorSelecionado, setValorSelecionado] = useState('');
  const [aquisicaoSelecionada, setAquisicaoSelecionada] = useState('');
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  
  const handleOpen = () => setOpen(modal);
  const handleClose = () => setOpen(!modal);

  const Enviar = async () => {
    try {
      console.log("Dados enviados:", { nomeEditado, descricaoEditada, tamanhoSelecionado, valorSelecionado, aquisicaoSelecionada });
      const response = await axios.post('https://leoncio-backend-production.up.railway.app/estoque/', {
        nome_material: nomeEditado,
        descricao: descricaoEditada,
        valor: valorSelecionado,
        status: 'Ativo',
        area_material: Area,
        aquisicao: new Date(aquisicaoSelecionada).toISOString(),
        tamanho: tamanhoSelecionado
      },
      {          
            headers: {
              Authorization: `Bearer ${token}`
            
          }});
      console.log('Resposta do servidor:', response);
      handleClose();
    } catch (error) {
      console.error("Erro ao enviar os dados:", error);
    }
  };



  return (
    <div className="">
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" className="flex justify-center items-center">
            Edite os valores
          </Typography>
          <Typography className="flex justify-center items-center flex-col" sx={{ mt: 2 }}>
            <label>Nome:</label>
            <input type="text" className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3" value={nomeEditado} onChange={(e) => setNomeEditado(e.target.value)} />

            <label>Descrição:</label>
            <textarea className="border-[2px] w-35 h-20 rounded-sm pl-2 mb-3" value={descricaoEditada} onChange={(e) => setDescricaoEditada(e.target.value)} />

            <label>Tamanho:</label>
            <select className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3" value={tamanhoSelecionado} onChange={(e) => setTamanhoSelecionado(e.target.value)}>
              <option value="Padrão">Padrão</option>
              <option value="Pequena">Pequena</option>
              <option value="Média">Média</option>
              <option value="Grande">Grande</option>
            </select>

            <label>Valor:</label>
            <input type="number" className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3" value={valorSelecionado} onChange={(e) => setValorSelecionado(e.target.value)} />
            
            <label>Data de Aquisição:</label>
            <input type="date" className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3" value={aquisicaoSelecionada} onChange={(e) => setAquisicaoSelecionada(e.target.value)} />

            <input type="button" className="border-[2px] w-35 h-10 rounded-sm pl-2" value="Enviar" onClick={Enviar} />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
