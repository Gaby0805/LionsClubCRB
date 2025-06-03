'use client';
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface ModalTipoUsuarioProps {
  open: boolean;
  onClose: () => void;
  userId: number; // ou string, dependendo do seu sistema
}

export default function ModalTipoUsuario({ open, onClose, userId }: ModalTipoUsuarioProps) {
  const [novoTipo, setNovoTipo] = useState('');
  
  const [token, setToken] = useState<string | null>(null);
  
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);  


  const handleSubmit = async () => {
    const confirme = confirm(`Tem certeza que deseja alterar o tipo para ${novoTipo}?`);
    if (!confirme) return;

    try {
      await axios.put('https://leoncio-backend-production.up.railway.app/usuario/tipo', {
        id_usuario: userId,
        u_tipo: novoTipo
      },           {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

      alert('Tipo de usuário atualizado com sucesso!');
      onClose(); // fecha o modal
    } catch (error) {
      alert('Erro ao alterar tipo de usuário');
      console.error(error);
    }
  };


  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Alterar Tipo de Usuário</DialogTitle>
      <DialogContent>
        <FormControl fullWidth>
          <InputLabel id="tipo-label">Tipo de Usuário</InputLabel>
          <Select
            labelId="tipo-label"
            value={novoTipo}
            onChange={(e) => setNovoTipo(e.target.value)}
            label="Tipo de Usuário"
          >
            <MenuItem value="ADM/Presidente">ADM/Presidente</MenuItem>
            <MenuItem value="Vice">Vice</MenuItem>
            <MenuItem value="1º Secretaria">1º Secretaria</MenuItem>
            <MenuItem value="2º Secretaria">2º Secretaria</MenuItem>
            <MenuItem value="Diretor de Patrimonio">Diretor de Patrimonio</MenuItem>
            <MenuItem value="inativo">Desativar usuario</MenuItem>
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit} variant="contained" color="primary" disabled={!novoTipo}>
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
