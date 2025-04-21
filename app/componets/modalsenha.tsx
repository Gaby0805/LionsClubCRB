"use client";

import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Stack,
} from "@mui/material";

interface ModalTrocarSenhaProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (senha_antiga: string, senha_nova: string) => void;
}

export default function ModalTrocarSenha({
  open,
  onClose,
  onSubmit,
}: ModalTrocarSenhaProps) {
  const [senhaAntiga, setSenhaAntiga] = useState("");
  const [senhaNova, setSenhaNova] = useState("");

  const handleSubmit = () => {
    onSubmit(senhaAntiga, senhaNova);
    // opcional: limpar campos
    setSenhaAntiga("");
    setSenhaNova("");
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Trocar Senha</DialogTitle>
      <DialogContent dividers>
        <Stack spacing={2} mt={1}>
          <TextField
            label="Senha Antiga"
            type="password"
            value={senhaAntiga}
            onChange={(e) => setSenhaAntiga(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Senha Nova"
            type="password"
            value={senhaNova}
            onChange={(e) => setSenhaNova(e.target.value)}
            fullWidth
            size="small"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!senhaAntiga || !senhaNova}
        >
          Confirmar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
