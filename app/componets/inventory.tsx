import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import { InventoryTwoTone } from '@mui/icons-material';
import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import MuiModalExample from './modaltest';
import Edit from './edit';
import { select } from 'framer-motion/client';

export default function Invent() { 
    const [items, setItems] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [valueSelect, setValueSelect] = useState({"name": "", "id": "", "quantidade": ""});
    const toast = useRef(null);

    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Item selecionado', detail: `Nome: ${event.data.nome_material}`, life: 2000 });
        setValueSelect({
            "name": event.data.nome_material,
            "id": event.data.id_estoque,
            "quantidade": event.data.quantidade
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get("http://localhost:3333/estoque/ComodatoListtext");
                setItems(response.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className='flex flex-col items-center m-10 w-full'>
            <div className='w-full max-w-4xl bg-gray-100 rounded-md m-4 p-4 flex flex-col justify-center items-center text-lg'>
                <h2 className='text-xl sm:text-2xl'>{valueSelect.name}</h2>
                <div className='flex flex-col sm:flex-row justify-center items-center w-full gap-4 mt-4'>

                    <Edit quantidade1={valueSelect.quantidade} id_quantidade={valueSelect.id}/>
                </div>
            </div>

            <div className='card w-full overflow-x-auto flex justify-center items-center mt-auto'>
                <div className='flex justify-center items-center'>
                    <ul className='bg-amber-600 w-[90%] flex justify-center items-center'>    
                        <Toast ref={toast} className='m-5 p-2'/>
                        <DataTable className='bg-gray-100 rounded-sm w-full' scrollHeight='380px' 
                            value={items} selectionMode="single" selection={selectedItem} 
                            onSelectionChange={(e) => setSelectedItem(e.value)}
                            dataKey="id_estoque" onRowSelect={onRowSelect} 
                            metaKeySelection={false} dragSelection>
                            <Column field="nome_material" header="Nome do Material" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="valor" header="Valor" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="tamanho" header="Tamanho" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="aquisicao" header="Aquisição" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="status" header="Status" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="quantidade" header="Quantidade" style={{ fontSize: '18px', padding: '10px' }}></Column>
                            <Column field="descricao" header="Descrição" style={{ fontSize: '18px', padding: '10px' }}></Column>
                        </DataTable>
                    </ul>
                </div>
            </div>
        </div>
    );
}
