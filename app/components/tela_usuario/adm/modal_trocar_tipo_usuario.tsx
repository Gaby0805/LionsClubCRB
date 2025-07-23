'use client';

import { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  MenuItem,
  Select,
  InputLabel,
  FormControl
} from '@mui/material';
import axios from 'axios';
import { cargos, cargos_expostos } from '../../cargos/cargos_usuarios';

interface ModalTipoUsuarioProps {
  open: boolean;
  onClose: () => void;
  userId: number; // ou string, dependendo do seu sistema
}

// Lista de cargos centralizada


export default function ModalTipoUsuario({ open, onClose, userId }: ModalTipoUsuarioProps) {
  const [novoTipo, setNovoTipo] = useState('');
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem('token');
    setToken(tokenLocalStorage);
  }, []);

  const handleSubmit = async () => {
    const confirme = confirm(`Tem certeza que deseja alterar o tipo para ${novoTipo}?`);
    if (!confirme) return;

    try {
      await axios.put(
        'https://leoncio-backend-production.up.railway.app/usuario/tipo',
        {
          id_usuario: userId,
          u_tipo: novoTipo,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

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
            {cargos_expostos.map((cargo) => (
              <MenuItem key={cargo} value={cargo}>
                {cargo === 'inativo' ? 'Desativar usuário' : cargo}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          onClick={handleSubmit}
          variant="contained"
          color="primary"
          disabled={!novoTipo}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
