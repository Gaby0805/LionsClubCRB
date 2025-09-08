"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../uteis/api";

interface ModalInventProps {
  nomeCategoria: string;
  id: number;
}

export default function ModalInvent({ nomeCategoria, id }: ModalInventProps) {
  const [nome, setNome] = useState(nomeCategoria || "");
  const [open, setOpen] = useState(false); // controlar modal aberto/fechado

  const fetchCategoria = async () => {
    console.log("a")
    try {
      await api.put("/categoria/categoria-geral/" + id, { nome });
      alert("Categoria atualizada com sucesso!");
      setOpen(false); // fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      setOpen(false); // fecha o modal após excluir
      alert("Erro ao atualizar categoria.");

    }
  };
  console.log(id)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Pencil className="" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar nome de categoria</DialogTitle>
          <DialogDescription>
            <input
              type="text"
              className="border p-2 rounded w-full mb-4"
              placeholder="Novo nome da categoria"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Button variant="outline" onClick={fetchCategoria}>
              Salvar
            </Button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
