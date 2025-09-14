"use client";

import React, { useEffect, useState } from "react";
import { Checkbox } from "@mui/material";
import { api } from "../uteis/api";

interface Item {
  id_item: number;
  id_sub_categoria: number;
  nome: string; // nome da subcategoria
  identificacao_do_item: string; // nome do item
  status: string;
}

interface ItemEmprestimoProps {
  selectedItems: { id: number }[];
  onItemSelect: (id: number) => void;
}

const ItemEmprestimo: React.FC<ItemEmprestimoProps> = ({
  selectedItems,
  onItemSelect,
}) => {
  const [items, setItems] = useState<Item[]>([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await api.get("/item/todos"); // buscar todos os itens
        console.log("Todos os itens:", res.data);
        setItems(res.data);
      } catch (error) {
        console.error("Erro ao buscar itens:", error);
      }
    };

    fetchItems();
  }, []);

  if (!items || items.length === 0) {
    return <p className="mt-4 text-gray-500">Nenhum item disponível.</p>;
  }

  // Agrupar itens por subcategoria
  const groupedItems = items.reduce<Record<string, Item[]>>((acc, item) => {
    if (!acc[item.nome]) acc[item.nome] = [];
    acc[item.nome].push(item);
    return acc;
  }, {});

  return (
    <div className="flex flex-col ml-auto">
      <h3 className="text-2xl font-bold mb-4">Itens Disponíveis</h3>
      {Object.entries(groupedItems).map(([subCategoria, itensDaSub], idx) => (
        <div key={idx} className="mb-6">
          <h4 className="text-xl font-semibold mb-2">{subCategoria}</h4>
          <div className="space-y-3">
            {itensDaSub.map(({ id_item, identificacao_do_item }) => (
              <div
                key={id_item}
                className="flex items-center gap-2 p-2 border rounded hover:bg-gray-50 transition"
              >
                <Checkbox
                  checked={selectedItems.some((i) => i.id === id_item)}
                  onChange={() => onItemSelect(id_item)}
                />
                <p className="text-lg">{identificacao_do_item}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemEmprestimo;
