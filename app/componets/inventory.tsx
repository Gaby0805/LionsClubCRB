import react, { useState, useRef, useEffect } from 'react'
import axios from 'axios'
//corrigir os botões de editar e excluir
import { InventoryTwoTone } from '@mui/icons-material'
import { Column } from 'primereact/column';
import { DataTable  } from 'primereact/datatable';
import { Toast } from 'primereact/toast';
import { Button } from '@mui/material';
import MuiModalExample from './modaltest';
export default function Invent() { 
    
    const [items, setitems] = useState([])
    const [selecetitems, setselectitems] = useState(null)
    const [valueselect, setvalueselect] = useState({"name": "","id": ""})


    const toast = useRef(null);


    const onRowSelect = (event) => {
        toast.current.show({ severity: 'info', summary: 'Item selecionado', detail: `Nome: ${event.data.nome_material}`, life: 2000 });
        setvalueselect({
                "name": event.data.nome_material,
                "id": event.data.id_estoque
        })
    };



    useEffect(() => {
        const fetchData = async () => {
            try { 
                const response = await axios.get("http://localhost:3333/estoque/ComodatoListtext");
                setitems(response.data);
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        fetchData();
    }, []);


    function edit() {
        
    }
    function add() {

    }

    return (
        
        <div className='flex flex-col items-center m-10  '>

        <div className='h-70 bg-gray-100 rounded-md m-4  flex flex-col justify-center items-center' style={{width: '60%', fontSize: '20px'}}>
                
                <h2>{valueselect.name}</h2>
                <MuiModalExample/>
                <div className='flex justify-center items-center '>

                    <button type="button" onClick={edit} className='w-35 m-5 h-15 rounded-md bg-gray-400'>
                    Editar
                    </button>

                    <button type="button" onClick={add} className='w-35 m-5 h-15 rounded-md bg-gray-400'>
                    Adicionar/remover
                    </button>
                    

                </div>

        </div>


        <div className='card '>

            <div>
            <ul className=''>    
            <Toast ref={toast} className='  m-5 p-2'/>
            <DataTable className='bg-gray-100 rounded-sm ' scrollHeight='380px'  value={items} selectionMode="single" selection={selecetitems} onSelectionChange={(e) => setselectitems(e.value)}
                    dataKey="id_estoque"  onRowSelect={onRowSelect}  metaKeySelection={false} dragSelection tableStyle={{ minWidth: '65rem', margin: '20px', height: '22rem'}}>

                <Column className='' field="nome_material" header="Nome do Material" style={{paddingTop: '20px', paddingLeft: '35px',           fontSize: '20px'}}></Column>
                <Column className='' field="valor" header="Valor" style={{                   paddingTop: '20px', paddingLeft: '35px',           fontSize: '20px'}}></Column>
                <Column className='' field="tamanho" header="tamanho" style={{               paddingTop: '20px', paddingLeft: '35px',           fontSize: '20px'}}></Column>
                <Column className='' field="aquisicao" header="Aquisição" style={{           paddingTop: '20px', paddingLeft: '35px',         fontSize: '20px'}}></Column>
                <Column className='' field="status" header="Status" style={{                 paddingTop: '20px', paddingLeft: '35px',           fontSize: '20px'}}></Column>
                <Column className='' field="quantidade" header="Quantidade" style={{         paddingTop: '20px', paddingLeft: '35px',display: 'flex',justifyContent: 'center',           fontSize: '20px'}}></Column>
                <Column className='' field="descricao" header="Descrição" style={{           paddingTop: '20px', paddingLeft: '35px',           fontSize: '20px'}}></Column>


            </DataTable>

            </ul>
            </div>
        </div>
        </div>

    )

}