"use client";

import { Pencil } from "lucide-react";
import React, { useState, useRef, useEffect } from "react";
import { Toast } from "primereact/toast";
import AddItem from "../comp_inventario/add_item_inventario";
import { api } from "../../components/uteis/api";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import ModalInvent from "../comp_inventario/modal";
import ModalInventExcluir from "../comp_inventario/modal_Excluir";
import ModalEditSub from "../comp_inventario/modal_editar_sub";
import ModalEditItem from "../comp_inventario/modal_editar_item";
import ModalAddItem from "../comp_inventario/add_categ.inventrio";
import ModalAddsub from "../comp_inventario/modal_add_sub";
import ModalCateg from "../comp_inventario/add_categ.inventrio";

export default function Invent() {
  const [categorias, setCategorias] = useState<any[]>([]);
  const [refreshData, setRefreshData] = useState(false);
  const [token, setToken] = useState<string | null>(null);
  const toast = useRef<any>(null);

  const [valueSelect, setValueSelect] = useState<any>({
    name: "",
    id: null,
    descricao: "",
    status: "",
    tamanho: "",
    categoria: "",
    quantidades: "",
  });

  // Pegando token do localStorage
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) setToken(storedToken);
  }, []);

  // Buscar categorias, subcategorias e itens
  useEffect(() => {
    if (!token) return;

    const fetchData = async () => {
      try {
        const resCategorias = await api.get("/categoria/categoria-geral", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resSub = await api.get("/sub-categ/sub-categoria", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const resItens = await api.get("/item/item", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Montando hierarquia completa
        const categoriasCompletas = resCategorias.data.map((cat: any) => {
          const subcats = resSub.data
            .filter((s: any) => s.categoria_geral_id === cat.id_categoria_geral)
            .map((sub: any) => {
              const itens = resItens.data.filter(
                (i: any) => i.sub_categoria_id === sub.id_sub_categoria
              );

              return {
                id: sub.id_sub_categoria,
                nome: sub.nome,
                descricao: sub.descricao,
                tamanho: sub.tamanho,
                categoria: sub.categoria,
                itens: itens.map((i: any) => ({
                  id_item: i.id_item,
                  identificacao_do_item: i.identificacao_do_item,
                  status: i.status,
                  quantidade: i.quantidade || 0,
                })),
              };
            });

          return {
            id: cat.id_categoria_geral,
            nome: cat.nome,
            subcategorias: subcats,
          };
        });

        setCategorias(categoriasCompletas);
      } catch (error) {
        console.log("Erro ao buscar dados:", error);
      }
    };

    fetchData();
  }, [token, refreshData]);

  const selecionarItem = (item: any, sub: any) => {
    toast.current?.show({
      severity: "info",
      summary: "Item selecionado",
      detail: `Nome: ${item.identificacao_do_item}`,
      life: 2000,
    });

    setValueSelect({
      name: item.identificacao_do_item,
      id: item.id_item,
      descricao: sub?.descricao || "",
      status: item.status,
      tamanho: sub?.tamanho || "",
      categoria: sub?.categoria || "",
      quantidades: item.quantidade,
    });
  };

  const deletar = async () => {
    try {
      if (!valueSelect.id) return;

      const confirmDelete = confirm("Você tem certeza que deseja excluir o item?");
      if (!confirmDelete) return;

      await api.delete(`/item/${valueSelect.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setRefreshData((prev) => !prev);
      toast.current?.show({
        severity: "success",
        summary: "Item deletado",
        life: 2000,
      });
    } catch (error) {
      toast.current?.show({
        severity: "error",
        summary: "Erro ao deletar item",
        life: 2000,
      });
      console.error("Erro ao deletar item:", error);
    }
  };

  return (
    <div className="flex flex-col items-center m-10 w-full">
      <Toast ref={toast} />

      {/* Adicionar item */}
<div className="flex gap-2">
      <AddItem  onAddSuccess={() => setRefreshData((prev) => !prev)} />
      <ModalAddsub  />
      <ModalCateg lugar={"Lions"}/>

</div>
      {/* Lista de categorias, subcategorias e itens */}
      <div className="w-full h-full mt-4">
<Accordion type="multiple" className="w-full">
  {categorias.map((categoria) => (
    <AccordionItem key={categoria.id} value={`categoria-${categoria.id}`}>
      <AccordionTrigger className="text-lg font-semibold flex justify-between items-center">
        {/* Lado esquerdo */}
        <span>{categoria.nome}</span>

        {/* Lado direito */}
        <div className="flex gap-2">
          <ModalInvent nomeCategoria={categoria.nome} id={categoria.id} />
          <ModalInventExcluir nomeCategoria={categoria.nome} id={categoria.id} tipo="categoria" />
        </div>
      </AccordionTrigger>

      <AccordionContent>
        <Accordion type="multiple">
          {categoria.subcategorias.map((sub: any) => (
            <AccordionItem key={sub.id} value={`sub-${sub.id}`}>
              <AccordionTrigger className="ml-4 text-base font-medium flex justify-between items-center">
                {/* Esquerda */}
                <div>
                  <div className="font-semibold">{sub.nome}</div>
                  <div className="text-sm text-gray-600">
                    Descrição: {sub.descricao || "N/A"} | Tamanho: {sub.tamanho || "Padrão"} | Categoria:{" "}
                    {sub.categoria || "N/A"}
                  </div>
                </div>

                {/* Direita */}
                <div className="flex gap-2">
                  <ModalEditSub
                    id={sub.id}
                    categoria={sub.categoria}
                    descricao={sub.descricao}
                    nome={sub.nome}
                    tamanho={sub.tamanho}
                  />
                  <ModalInventExcluir id={sub.id} tipo="subCategoria" />
                </div>
              </AccordionTrigger>
  
              <AccordionContent>
                <ul className="ml-8 list-disc text-sm space-y-1">
                  {sub.itens.map((item: any) => (
                    <li
                      key={item.id_item}
                      className="cursor-pointer hover:underline flex justify-between items-center"
                      onClick={() => selecionarItem(item, sub)}
                    >
                      {/* Esquerda */}
                      <div>
                        <div className="font-medium">{item.identificacao_do_item}</div>
                        <div className="text-gray-500 text-sm">
                          Status: {item.status ? "Ativo" : "Inativo"} 
                        </div>
                      </div>

                      {/* Direita */}
                      <div className="flex gap-2">
                        <ModalEditItem
                          id={item.id_item}
                          nome={item.identificacao_do_item}
                          status={item.status}
                        />
                        <ModalInventExcluir id={item.id_item} tipo="item" />
                      </div>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </AccordionContent>
    </AccordionItem>
  ))}
</Accordion>

      </div>
    </div>
  );
}
