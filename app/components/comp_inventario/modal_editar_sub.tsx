"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

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
  descricao: string;
  tamanho: string;
  categoria: string;
  id: number;
}

export default function ModalEditSub({
  nome,
  descricao,
  tamanho,
  categoria,
  id,
}: ModalInventProps) {
  const [nom, setNome] = useState(nome || "");
  const [desc, setDesc] = useState(descricao || "");
  const [tam, setTam] = useState(tamanho || "Padrão");
  const [cat, setCat] = useState(categoria || "");
  const [open, setOpen] = useState(false);

  const fetchSubCategoria = async () => {
    try {
      await api.put("/sub-categ/sub-categoria/" + id, {
        descricao: desc,
        tamanho: tam,
        categoria: cat,
        nome: nom,
      });
      alert("Subcategoria atualizada com sucesso!");
      setOpen(false); // fecha o modal
    } catch (error) {
      console.error("Erro ao atualizar subcategoria:", error);
      alert("Erro ao atualizar subcategoria.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <Pencil />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Alterar Subcategoria</DialogTitle>
          <DialogDescription>
            Atualize os dados da subcategoria abaixo:
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <input
            type="Nome"
            className="border p-2 rounded w-full"
            placeholder="nome"
            value={nom}
            onChange={(e) => setNome(e.target.value)}
          />
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Descrição"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />
          <Select value={tam} onValueChange={setTam}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o tamanho" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Padrão">Padrão</SelectItem>
              <SelectItem value="Pequeno">Pequeno</SelectItem>
              <SelectItem value="Médio">Médio</SelectItem>
              <SelectItem value="Grande">Grande</SelectItem>
            </SelectContent>
          </Select>
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Categoria"
            value={cat}
            onChange={(e) => setCat(e.target.value)}
          />
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={fetchSubCategoria}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
