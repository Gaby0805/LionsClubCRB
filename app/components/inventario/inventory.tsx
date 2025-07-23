"use client";
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Toast } from 'primereact/toast';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import Change from '../comp_inventario/modal_quantidade';
import Edit from '../comp_inventario/modal_editar_invetario';
import AddItem from '../comp_inventario/add_item_inventario';

import { Button } from '@mui/material';

export default function Invent() { 
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [refreshData, setRefreshData] = useState(false);  // 🔄 Gatilho para atualizar a tabela
    const toast = useRef(null);
const [token, setToken] = useState<string | null>(null);
useEffect(() => {
  // Exemplo para pegar token do localStorage só uma vez
  const storedToken = localStorage.getItem('token');
  if (storedToken) setToken(storedToken);
}, []);
const isFirstRun = useRef(true);
useEffect(() => {
  if (!token) return;

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://leoncio-backend-production.up.railway.app/estoque/ComodatoList/",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setItems(response.data);
      setRefreshData(!refreshData)
    } catch (error) {
      console.log("Erro ao buscar dados:", error);
    }
  };

  fetchData();
}, [token]);

    const [valueSelect, setValueSelect] = useState({
        "name": "", "id": null, "descricao": "", "status": "", "tamanho": "", "quantidades": ""
    });

    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Item selecionado', detail: `Nome: ${event.data.nome_material}`, life: 2000 });
        setValueSelect({
            "name": event.data.nome_material,
            "id": event.data.id_estoque,
            "descricao": event.data.descricao,
            "status": event.data.status,
            "tamanho": event.data.tamanho,
            "quantidades": event.data.quantidade
        });
    };



const deletar = async () => {
  try {
    const confirmDelete = confirm('Você tem certeza que deseja excluir o item?');
    if (!confirmDelete) return;

    await axios.delete(
      "https://leoncio-backend-production.up.railway.app/estoque/",
      {
        data: { id_estoque: valueSelect.id },
        headers: { Authorization: `Bearer ${token}` }
      }
    );
    setRefreshData(!refreshData)
    console.log('item deletado');
  } catch (error) {
    alert('O item precisa possuir quantidade para ser deletado');
    console.error('Erro ao deletar item:', error);
  }
};

        



    return (
        <div className='flex flex-col items-center m-10 w-full'>

            <div>
                {/* 📌 Passamos a função setRefreshData para atualizar a tabela após adicionar um item */}
                <AddItem Area={'Comodato'} onAddSuccess={() => setRefreshData(prev => !prev)} />
            </div>

            <div className='w-full max-w-4xl bg-gray-100 rounded-md m-6 p-4 flex flex-col justify-center items-center text-lg'>
                <h2 className='text-xl sm:text-2xl'>{valueSelect.name}</h2>
                <div className='flex flex-col sm:flex-row justify-center items-center w-full gap-4 mt-4'>
                    {/* 📌 Atualiza a tabela após mudança na quantidade */}
                    <Change quantidade1={valueSelect.quantidades} estoque_id={valueSelect.id} onUpdateSuccess={() => setRefreshData(prev => !prev)} />

                    {/* 📌 Atualiza a tabela após edição do item */}
                    <Edit descricao={valueSelect.descricao} nome={valueSelect.name} status={valueSelect.status} 
                          estoque_id={valueSelect.id} tamanho={valueSelect.tamanho} 
                          onEditSuccess={() => setRefreshData(prev => !prev)} />
                    <div className='w-fit py-3 px-4 rounded-md bg-red-500 '>
                        <button onClick={deletar}>
                            excluir item
                        </button>
                    </div>
                </div>
            </div>

            <div className='card w-full overflow-x-auto flex justify-center items-center mt-auto '>
                <div className='flex justify-center items-center'>
                    <ul className='bg-amber-600 w-[90%] flex justify-center items-center'>    
                        <Toast ref={toast} className='m-5 p-2'/>
                        <DataTable
  className="bg-gray-100 rounded-sm w-full"
  scrollHeight="380px"
  value={items}
  selectionMode="single"
  selection={selectedItem}
  onSelectionChange={(e) => setSelectedItem(e.value)}
  dataKey="id_estoque"
  onRowSelect={onRowSelect}
  metaKeySelection={false}
  dragSelection
  sortField="nome_material"
  sortOrder={1}
>
  <Column
    field="nome_material"
    header="Nome do Material"
    sortable
    headerStyle={{ textAlign: 'center' }}
    style={{ fontSize: '18px', padding: '10px' }}
  />
  <Column
    field="valor"
    header="Valor"
    sortable
    headerStyle={{ textAlign: 'center' }}
    style={{ fontSize: '18px', padding: '10px' }}
  />
  <Column
    field="tamanho"
    header="Tamanho"
    sortable
    headerStyle={{ textAlign: 'center' }}
    style={{ fontSize: '18px', padding: '10px' }}
  />
<Column
  field="aquisicao"
  header="Aquisição"
  sortable
  headerStyle={{ textAlign: 'center', justifyContent: 'center', display: 'flex', marginTop: 13  }}
  style={{ fontSize: '18px', padding: '10px' }}
/>

  <Column
    field="status"
    header="Status"
    sortable
    headerStyle={{ textAlign: 'center' }}
    style={{ fontSize: '18px', padding: '10px' }}
  />
  <Column
    field="quantidade"
    header="Quantidade"
    sortable
    headerStyle={{ textAlign: 'center' }}
    style={{ fontSize: '18px', padding: '10px' }}
  />
  <Column
    field="descricao"
    header="Descrição"
    sortable
    style={{ fontSize: '18px', padding: '10px' }}
  />
</DataTable>
                    </ul>
                </div>
            </div>
        </div>
    );
}
