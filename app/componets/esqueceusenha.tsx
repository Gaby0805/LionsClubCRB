'use client';

import React, { useEffect, useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button
} from '@mui/material';
import axios from 'axios';
import { useUser } from '@/app/componets/context/UserContext'; // ajuste o caminho conforme sua estrutura

interface ModalSenhaUsuarioProps {
  open: boolean;
  onClose: () => void;
  userId: number;
  nome: string;
}

export default function EsqueceuSenha({ open, onClose, userId, nome }: ModalSenhaUsuarioProps) {
  const [novaSenha, setNovaSenha] = useState('');
  const [senhaAdm, setSenhaAdm] = useState('');
  const { userId: adminId } = useUser();
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  

  const handleSalvar = async () => {
    try {
      await axios.put('https://leoncio-backend-production.up.railway.app/usuario/esqueceusenha', {
        id_usuario: userId,
        id_adm: adminId,
        senha_adm: senhaAdm,
        senha_nova: novaSenha
      },           {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });

      alert('Senha alterada com sucesso!');
      setNovaSenha('');
      setSenhaAdm('');
      onClose();
    } catch (error) {
      console.error('Erro ao alterar senha:', error);
      alert('Erro ao alterar senha. Verifique a senha do administrador.');
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Alterar senha de {nome}</DialogTitle>
      <DialogContent>
        <TextField
          label="Nova Senha"
          type="password"
          fullWidth
          value={novaSenha}
          onChange={(e) => setNovaSenha(e.target.value)}
          margin="normal"
        />
        <TextField
          label="Sua senha (Admin)"
          type="password"
          fullWidth
          value={senhaAdm}
          onChange={(e) => setSenhaAdm(e.target.value)}
          margin="normal"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSalvar}
          disabled={!novaSenha || !senhaAdm}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
