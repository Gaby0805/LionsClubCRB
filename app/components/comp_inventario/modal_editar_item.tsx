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

interface ModalInventProps {
  nome: string;
  status: string;
  id: number;
}

export default function ModalEditItem({
  nome,
  status,
  id,
}: ModalInventProps) {
  const [nom, setNome] = useState(nome || "");
  const [ativo, setAtivo] = useState(status || "true");
  const [open, setOpen] = useState(false);

  const updateItem = async () => {
    try {
      await api.put("/item/item/" + id, {
        identificacao_do_item: nom,
        status: ativo,
      });
      alert("Item atualizado com sucesso!");
      setOpen(false); 
    } catch (error) {
      console.error("Erro ao atualizar item:", error);
      alert("Erro ao atualizar item.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar item</DialogTitle>
          <DialogDescription>
            Atualize os dados do item abaixo:
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
          <Select value={ativo} onValueChange={setAtivo}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Ativado</SelectItem>
              <SelectItem value="false">Desativado</SelectItem>
            </SelectContent>
          </Select>
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
