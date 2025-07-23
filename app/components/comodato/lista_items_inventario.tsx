'use client'

import React from 'react';
import { Checkbox } from '@mui/material';

interface ItemListProps {
  items: { id_estoque: number; nome_material: string }[];
  selectedItems: { id: number }[];
  onItemSelect: (id: number) => void;
}

const ItemList: React.FC<ItemListProps> = ({ items, selectedItems, onItemSelect }) => (
  <div className="flex flex-col ml-auto">
    <h3 className="text-2xl font-bold">Itens Solicitados</h3>
    <div className="space-y-2 mt-10">
      {items.map(({ id_estoque, nome_material }) => (
        <div key={id_estoque} className="flex items-center">
          <Checkbox
            checked={selectedItems.some(i => i.id === id_estoque)}
            onChange={() => onItemSelect(id_estoque)}
          />
          <p>{nome_material}</p>
        </div>
      ))}
    </div>
  </div>
);

export default ItemList;
