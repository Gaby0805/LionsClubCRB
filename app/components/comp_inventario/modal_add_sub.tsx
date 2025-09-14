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

interface Categoria {
  id: number;
  nome: string;
}

export default function ModalAddSub() {
  const [nom, setNome] = useState("");
  const [desc, setDesc] = useState("");
  const [tam, setTam] = useState("Padrão");
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [catId, setCatId] = useState("");
  const [open, setOpen] = useState(false);

  // Buscar categorias ao abrir modal
  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const res = await api.get("/categoria/categoria-geral");
        setCategorias(res.data);
        console.log("Categorias carregadas:", res.data);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };
    if (open) fetchCategorias();
  }, [open]);

  const salvarSubCategoria = async () => {
    try {
      await api.post("/sub-categ/sub-categoria", {
        nome: nom,
        descricao: desc,
        tamanho: tam,
        categoria: "sub", // valor fixo ou de acordo com sua regra
        categoria_geral_id: Number(catId), // garante número
      });
      alert("Subcategoria adicionada com sucesso!");
      setOpen(false);

      // resetar campos
      setNome("");
      setDesc("");
      setTam("Padrão");
      setCatId("");
    } catch (error) {
      console.error("Erro ao adicionar subcategoria:", error);
      alert("Erro ao adicionar subcategoria.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex">
        <div className="w-fit py-2 px-4 rounded-md bg-gray-400">
          Adicionar sub-categoria
        </div>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Adicionar Subcategoria</DialogTitle>
          <DialogDescription>
            Preencha os dados da nova subcategoria:
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

          {/* Select de categorias vindas do backend */}
          <Select value={catId} onValueChange={setCatId}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Selecione a categoria" />
            </SelectTrigger>
            <SelectContent>
              {categorias.map((c) => (
                <SelectItem key={c.id_categoria_geral} value={String(c.id_categoria_geral)}>
                  {c.nome}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button variant="default" onClick={salvarSubCategoria}>
            Salvar
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
