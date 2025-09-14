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

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { api } from "../uteis/api";

interface SubCategoria {
  id_sub_categoria: number;
  nome: string;
}

export default function ModalAddItem() {
  const [nomeItem, setNomeItem] = useState("");
  const [status, setStatus] = useState("true");
  const [subCategorias, setSubCategorias] = useState<SubCategoria[]>([]);
  const [subCatId, setSubCatId] = useState("");
  const [open, setOpen] = useState(false);

  // Buscar subcategorias ao abrir modal
  useEffect(() => {
    const fetchSubCategorias = async () => {
      try {
        const res = await api.get("/sub-categ/sub-categoria");
        setSubCategorias(res.data);
      } catch (error) {
        console.error("Erro ao buscar subcategorias:", error);
      }
    };
    if (open) fetchSubCategorias();
  }, [open]);

  const salvarItem = async () => {
    try {
      if (!subCatId) {
        alert("Selecione uma subcategoria!");
        return;
      }

      await api.post("/item/item", {
        identificacao_do_item: nomeItem,
        status: status === "true", // transforma string em boolean
        sub_categoria_id: Number(subCatId),
      });

      alert("Item adicionado com sucesso!");
      setOpen(false);

      // resetar campos
      setNomeItem("");
      setStatus("true");
      setSubCatId("");
    } catch (error) {
      console.error("Erro ao adicionar item:", error);
      alert("Erro ao adicionar item.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <div className="w-fit py-2 px-4 rounded-md bg-gray-400">
          Adicionar item
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Item</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo item:
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3">
          <input
            type="text"
            className="border p-2 rounded w-full"
            placeholder="Identificação do item"
            value={nomeItem}
            onChange={(e) => setNomeItem(e.target.value)}
          />

          {/* Select de status */}
          <Select value={status} onValueChange={setStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione o status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="true">Ativado</SelectItem>
              <SelectItem value="false">Desativado</SelectItem>
            </SelectContent>
          </Select>

          {/* Select de subcategorias vindas do backend */}
          <Select value={subCatId} onValueChange={setSubCatId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a subcategoria" />
            </SelectTrigger>
            <SelectContent>
              {subCategorias.map((s) => (
                <SelectItem
                  key={s.id_sub_categoria}
                  value={String(s.id_sub_categoria)}
                >
                  {s.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={salvarItem}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
