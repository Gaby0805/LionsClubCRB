"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Pencil, Trash } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../uteis/api";

interface ModalInventProps {
  id: number;
  tipo: "item" | "subCategoria" | "categoria";
}

export default function ModalInventExcluir({ id, tipo }: ModalInventProps) {
  const [open, setOpen] = useState(false); // controla se o modal está aberto

  const type = {
    item: "/item/item",
    subCategoria: "/sub-categ/sub-categoria",
    categoria: "/categoria/categoria-geral",
  };

  const deletar = async () => {
    try {
      await api.delete(`${type[tipo]}/${id}`);
      alert("Excluído com sucesso!");
      setOpen(false); // fecha o modal após excluir
    } catch (error) {
      console.error("Erro ao excluir:", error);
        setOpen(false); // fecha o modal após excluir

      alert("Verifique se não há dependências (subcategorias ou itens vinculados).");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Trash />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Tem certeza que quer excluir?</DialogTitle>
          <DialogDescription>
            Se confirmar, você vai excluir todos os itens relacionados.
          </DialogDescription>
        </DialogHeader>
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="destructive" onClick={deletar}>
            Excluir
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
