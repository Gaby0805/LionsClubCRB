'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Modal,
  Box,
  TextField,
  Button,
  MenuItem,
  Typography
} from '@mui/material';
import { cargos_expostos } from '../../cargos/cargos_usuarios';

const style = {
  position: 'absolute' as const,
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  borderRadius: 2,
  boxShadow: 24,
  p: 4,
};


const ModalUsuario = ({ open, handleClose }: { open: boolean; handleClose: () => void }) => {
  const [formData, setFormData] = useState({
    u_nome: '',
    u_sobrenome: '',
    u_email: '',
    u_cpf: '',
    u_senha: '',
    u_tipo: '',
  });

  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    // Exemplo básico: todos os campos são obrigatórios
    return Object.values(formData).every(val => val.trim() !== '');
  };

  const handleSubmit = async () => {
    if (!token) {
      alert('Token não encontrado. Faça login novamente.');
      return;
    }

    if (!validateForm()) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    setLoading(true);

    try {
      await axios.post(
        'https://leoncio-backend-production.up.railway.app/usuario',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert('Usuário criado com sucesso!');
      setFormData({
        u_nome: '',
        u_sobrenome: '',
        u_email: '',
        u_cpf: '',
        u_senha: '',
        u_tipo: '',
      });
      handleClose();
    } catch (error: any) {
      console.error('Erro ao criar usuário:', error);
      const message = error?.response?.data?.message || 'Erro ao criar usuário';
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <Typography variant="h6" mb={2}>Criar Novo Usuário</Typography>
        <TextField
          fullWidth
          label="Nome"
          name="u_nome"
          value={formData.u_nome}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Sobrenome"
          name="u_sobrenome"
          value={formData.u_sobrenome}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Email"
          name="u_email"
          type="email"
          value={formData.u_email}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="CPF"
          name="u_cpf"
          value={formData.u_cpf}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Senha"
          name="u_senha"
          type="password"
          value={formData.u_senha}
          onChange={handleChange}
          margin="normal"
        />
        <TextField
          select
          fullWidth
          label="Tipo"
          name="u_tipo"
          value={formData.u_tipo}
          onChange={handleChange}
          margin="normal"
        >
          {cargos_expostos.map((tipo) => (
            <MenuItem key={tipo} value={tipo}>
              {tipo}
            </MenuItem>
          ))}
        </TextField>

        <Box mt={2} display="flex" justifyContent="flex-end">
          <Button onClick={handleClose} sx={{ mr: 1 }} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            disabled={loading}
          >
            {loading ? 'Salvando...' : 'Criar'}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default ModalUsuario;
  