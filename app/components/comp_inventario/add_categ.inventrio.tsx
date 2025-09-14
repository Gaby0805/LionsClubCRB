"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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



export default function ModalCateg(lugar: string) {
  const [nom, setNome] = useState( "");
  const [open, setOpen] = useState(false);

  const updateItem = async () => {
    try {
      await api.post("/categoria/categoria-geral/", {
        nome: nom,
        lugar: lugar
      });
      alert("categoria atualizado com sucesso!");
      setOpen(false); 
    } catch (error) {
      console.error("Erro ao atualizar categoria:", error);
      alert("Erro ao atualizar categoria.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
    <div className="w-fit py-2 px-4 rounded-md bg-gray-400">
           Adicionar categoria 
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Categoria</DialogTitle>
          <DialogDescription>
            Ponha os campos abaixo para adicionar uma nova categoria.
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Nome"
            value={nom}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={updateItem}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
