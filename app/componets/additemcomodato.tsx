"use client";

import axios from 'axios';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Modal, TextField } from '@mui/material';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/pt-br'; // importa o locale
const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p: 4,
};

export default function AddItem({ Area }: { Area: any }) {
  const [open, setOpen] = useState(false);
  const [nomeEditado, setNomeEditado] = useState('');
  const [descricaoEditada, setDescricaoEditada] = useState('');
  const [tamanhoSelecionado, setTamanhoSelecionado] = useState('Padrão');
  const [valorSelecionado, setValorSelecionado] = useState('');
  const [aquisicaoSelecionada, setAquisicaoSelecionada] = useState<Dayjs | null>(dayjs());
const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const Enviar = async () => {
    try {
      console.log("Dados enviados:", { 
        nomeEditado, descricaoEditada, 
        tamanhoSelecionado, valorSelecionado, 
        aquisicaoSelecionada 
      });
      const response = await axios.post(
        'https://leoncio-backend-production.up.railway.app/estoque/',
        {
          nome_material: nomeEditado,
          descricao: descricaoEditada,
          valor: valorSelecionado,
          status: 'Ativo',
          area_material: Area,
          aquisicao: aquisicaoSelecionada?.toISOString(),
          tamanho: tamanhoSelecionado
        },
{
  headers: {
    Authorization: `Bearer ${token}`
  }
}      );
      console.log('Resposta do servidor:', response.data);
      handleClose();
    } catch (error) {
      alert('verifique as informações')
      console.error("Erro ao enviar os dados:", error);
    }
  };

  return (
    <div className="w-fit py-2 px-4 rounded-md bg-gray-400">
      <Button sx={{ color: 'black' }} onClick={handleOpen}>
        Adicionar item
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography variant="h6" component="h2" className="flex justify-center">
            Edite os valores
          </Typography>

          <Box 
            component="form"
            sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}
          >
            <TextField
              label="Nome"
              value={nomeEditado}
              onChange={(e) => setNomeEditado(e.target.value)}
              size="small"
              fullWidth
            />

            <TextField
              label="Descrição"
              multiline
              rows={4}
              value={descricaoEditada}
              onChange={(e) => setDescricaoEditada(e.target.value)}
              size="small"
              fullWidth
            />

            <TextField
              select
              label="Tamanho"
              value={tamanhoSelecionado}
              onChange={(e) => setTamanhoSelecionado(e.target.value)}
              SelectProps={{ native: true }}
              size="small"
              fullWidth
            >
              <option value="Padrão">Padrão</option>
              <option value="Pequena">Pequena</option>
              <option value="Média">Média</option>
              <option value="Grande">Grande</option>
            </TextField>

            <TextField
              label="Valor"
              type="number"
              placeholder="20.52"
              value={valorSelecionado}
              onChange={(e) => setValorSelecionado(e.target.value)}
              size="small"
              fullWidth
            />

<LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      <DatePicker
        label="Data de Aquisição"
        value={aquisicaoSelecionada}
        onChange={(newValue) => setAquisicaoSelecionada(newValue)}
        format="DD/MM/YYYY"
        renderInput={(params) => (
          <TextField {...params} size="small" fullWidth />
        )}
      />

    </LocalizationProvider>

            <Button variant="contained" onClick={Enviar}>
              Enviar
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
