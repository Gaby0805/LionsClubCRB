import react, { useState } from 'react'
import axios from 'axios'
import { div } from 'framer-motion/client'
import { InventoryTwoTone } from '@mui/icons-material'
import { useEffect } from 'react'
import { Column } from 'primereact/column';
import { DataTable, DataTableSelectionChangeEvent, DataTableDataSelectableEvent } from 'primereact/datatable';

export default function Invent() { 
    
    const [items, setitems] = useState([])
    const [selecetitems, setselectitems] = useState(null)


    const isSelectable = (data: item) => data.quantity >= 10;

    const isRowSelectable = (event: DataTableDataSelectableEvent) => (event.data ? isSelectable(event.data) : true);

    const rowClassName = (data: item) => (isSelectable(data) ? '' : 'p-disabled');




    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get("http://localhost:3333/estoque/ComodatoList");
                console.log(response.data);
                setitems(response.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);
    
    return (
        <div className='card'>
            <ul className=''>    
            <DataTable  className='bg-amber-600 ' value={items} selectionMode="single" selection={selecetitems!}
                    onSelectionChange={(e) => setselectitems(e.value)} dataKey="id_estoque" isDataSelectable={isRowSelectable} rowClassName={rowClassName} tableStyle={{ minWidth: '50rem' }}>


                <Column className='' field="id_estoque" header="ID Estoque"></Column>
                <Column className='' field="valor" header="Nome do Material"></Column>
                <Column className='' field="tamanho" header="Descrição"></Column>
                <Column className='' field="status" header="Status"></Column>
                <Column className='' field="aquisicao" header="Aquisição"></Column>
                <Column className='' field="quantidade" header="Quantidade"></Column>
                <Column className='' field="descricao" header="Descrição"></Column>


            </DataTable>

            </ul>
        </div>

    )

}