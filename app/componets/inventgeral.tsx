'use client'
import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import Change from './change';
import Edit from './edit';
import AddItem from './additemcomodato';

export default function Invent2() { 
  const [items, setItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [valueSelect, setValueSelect] = useState({
    name: "", id: null, descricao: "", status: "", tamanho: "", quantidades: "", area_material: ""
  });
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const toast = useRef(null);

  useEffect(() => {
    const tokenLocalStorage = localStorage.getItem("token");
    setToken(tokenLocalStorage);
  }, []);

  const fetchData = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get("https://leoncio-backend-production.up.railway.app/estoque/lions", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setItems(response.data);
    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro',
        detail: 'Falha ao buscar dados do estoque.',
        life: 3000
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (token) fetchData();
  }, [token]);

  const onRowSelect = (event) => {
    toast.current?.show({ severity: 'info', summary: 'Item selecionado', detail: `Nome: ${event.data.nome_material}`, life: 2000 });
    setValueSelect({
      name: event.data.nome_material,
      id: event.data.id_estoque,
      descricao: event.data.descricao,
      status: event.data.status,
      tamanho: event.data.tamanho,
      quantidades: event.data.quantidade,
      area_material: event.data.area_material
    });
  };

  const deletar = async () => {
    try {
      const confirmDelete = confirm('Você tem certeza que deseja excluir o item?');
      if (!confirmDelete) return;

      await axios.delete("https://leoncio-backend-production.up.railway.app/estoque", {
        data: { id_estoque: valueSelect.id },
        headers: { Authorization: `Bearer ${token}` }
      });

      toast.current?.show({
        severity: 'success',
        summary: 'Item deletado',
        detail: 'O item foi removido com sucesso.',
        life: 3000
      });

      setValueSelect({ name: "", id: "", descricao: "", status: "", tamanho: "", quantidades: "", area_material: "" });
      setSelectedItem(null);
      fetchData();

    } catch (error) {
      toast.current?.show({
        severity: 'error',
        summary: 'Erro ao deletar',
        detail: 'Este item não pode ser deletado pois possui quantidade vinculada.',
        life: 3000
      });
      console.error('Erro ao deletar item:', error);
    }
  };

  return (
    <div className='flex flex-col items-center m-10 w-full'>
      <Toast ref={toast} className='m-5 p-2' />
      
      <div className='mb-4'>
        <AddItem Area={'Lions'} />
      </div>

      <div className='w-full max-w-4xl bg-gray-100 rounded-md p-4 flex flex-col justify-center items-center text-lg'>
        <h2 className='text-xl sm:text-2xl'>{valueSelect.name || 'Selecione um item'}</h2>

        <div className='flex flex-col sm:flex-row justify-center items-center w-full gap-4 mt-4'>
          <Change quantidade1={valueSelect.quantidades} estoque_id={valueSelect.id} />
          <Edit 
            descricao={valueSelect.descricao}
            nome={valueSelect.name}
            status={valueSelect.status}
            estoque_id={valueSelect.id}
            tamanho={valueSelect.tamanho}
          />
          <button
            onClick={deletar}
            className='w-fit py-3 px-4 rounded-md bg-red-500 text-white hover:bg-red-600 transition'
          >
            Excluir item
          </button>
        </div>
      </div>

      <div className='card w-full overflow-x-auto flex justify-center items-center mt-auto'>
        <div className='flex justify-center items-center w-full'>
          <ul className='bg-amber-600 w-[90%] flex justify-center items-center'>
            <DataTable
              className='bg-gray-100 rounded-sm w-full'
              scrollHeight='380px'
              value={items}
              loading={loading}
              selectionMode="single"
              selection={selectedItem}
              onSelectionChange={(e) => setSelectedItem(e.value)}
              dataKey="id_estoque"
              onRowSelect={onRowSelect}
              metaKeySelection={false}
              sortField="nome_material"
              sortOrder={1}
            >
              <Column field="area_material" header="Categoria" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="nome_material" header="Nome do Material" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="valor" header="Valor" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="tamanho" header="Tamanho" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="aquisicao" header="Aquisição" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="status" header="Status" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="quantidade" header="Quantidade" sortable style={{ fontSize: '18px', padding: '10px' }} />
              <Column field="descricao" header="Descrição" sortable style={{ fontSize: '18px', padding: '10px' }} />
            </DataTable>
          </ul>
        </div>
      </div>
    </div>
  );
}
