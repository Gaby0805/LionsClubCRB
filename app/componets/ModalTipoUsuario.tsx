'use client';
import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';

interface ModalTipoUsuarioProps {
  open: boolean;
  onClose: () => void;
  userId: number; // ou string, dependendo do seu sistema
}

export default function ModalTipoUsuario({ open, onClose, userId }: ModalTipoUsuarioProps) {
  const [novoTipo, setNovoTipo] = useState('');



  const handleSubmit = async () => {
    const confirme = confirm(`Tem certeza que deseja alterar o tipo para ${novoTipo}?`);
    if (!confirme) return;

    try {
      await axios.put('https://leoncio-backend.onrender.com/usuario/tipo', {
        id_usuario: userId,
        u_tipo: novoTipo
      }, { withCredentials: true });

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
            <MenuItem value="ADM">ADM/Presidente</MenuItem>
            <MenuItem value="Vice">Vice</MenuItem>
            <MenuItem value="Secretaria">Secretaria</MenuItem>
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
