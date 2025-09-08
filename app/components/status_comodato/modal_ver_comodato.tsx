'use client';

import React, { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button, Stack } from '@mui/material';
import {api} from "../../components/uteis/api"

interface ModalComodatoProps {
  item: any;
  onClose: () => void;
}

export default function ModalComodatoteste({ item, onClose }: ModalComodatoProps) {
  const [token, setToken] = useState<string | null>(null);
  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);  
// aa
const relatorio = async () => {
  console.log('cheguei aqui');

  try {
    const response = await api.post(
      'transacao/doc',
      { id: item.id, area: 'relatorio' },
      {
        headers: {
          Authorization: `Bearer ${token}`
        },
        responseType: "blob",
      }
    );
    console.log('aee');

    // Forçar download no navegador
    const blob = new Blob([response.data], {
      type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    });
    const link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);
    link.download = `comodato_${item.nome_comodato}.docx`;
    link.click();

  } catch (error) {
    console.error('Erro ao gerar o relatório:', error);
    alert('Erro ao gerar o relatório. Verifique se o ID está correto ou se há conexão com o servidor.');
  }
};
  return (
    <Dialog open={Boolean(item)} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Detalhes do Comodato</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2}>
          <Typography><strong>Nome:</strong> {item.nome_comodato}</Typography>
          <Typography><strong>Sobrenome:</strong> {item.sobrenome_comodato}</Typography>
          <Typography><strong>Status:</strong> {item.status}</Typography>
          <Typography><strong>Material:</strong> {item.nome_material}</Typography>
          <Typography><strong>Telefone:</strong> {item.telefone}</Typography>
          <Typography>
            <strong>Data Limite:</strong> {new Date(item.data_limite).toLocaleDateString()}
          </Typography>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={relatorio} color="primary" variant="outlined">
          Relatorio
        </Button>
        <Button onClick={onClose} color="primary" variant="outlined">
          Fechar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
