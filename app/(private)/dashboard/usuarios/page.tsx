'use client'
import React, { useEffect, useState } from "react";
import Asside from "../../../componets/dash/asside";
import HeaderDash from "../../../componets/dash/headerdash";
import { Button } from "@mui/material";
import InfoUser from "@/app/componets/infouser";
import axios from "axios";
import { useUser } from "@/app/componets/context/UserContext";
import ModalUsuario from "@/app/componets/modalcreateuser";
import ListaUsuariosModal from "@/app/componets/usercargos";

export default function Dashboard() {
    const [open, setOpen] = useState(false);    
    const { userId } = useUser(); 
    const [Isadm, SetIsadm] = useState('invisible')
    const [openModal, setOpenModal] = useState(false);

    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
  
  
    const [Infosearch,setInfosearch] = useState({
        nome_user: '',
        sobrenome: '',
        email: '',
        cpf: '',
        tipo_user: '',

    })  
    
    const CreateItemAdmin = () => {
        return (
            <div className={`w-fit h-fit ${Isadm} flex `}  >

                <Button variant="outlined" color="inherit" size="medium" onClick={() => setOpen(true)} className="w-44"  >Criar usuario</Button>
                <div className="mx-3"></div>
                <Button variant="outlined" color="inherit" onClick={handleOpenModal}>
                    Ver todos os usuários
                </Button>
                    {/* Modal de Lista de Usuários */}
                 <ListaUsuariosModal open={openModal} handleClose={handleCloseModal} />
        
        <ModalUsuario open={open} handleClose={() => setOpen(false)} />
            </div>
            
        )
    }




    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("http://localhost:3333/usuario/especifico", {
                    id_usuario: userId // Envia o ID do usuário no body
                },
                {withCredentials: true});

                setInfosearch({
                    nome_user: response.data.nome_user,
                    sobrenome: response.data.sobrenome_user,
                    email: response.data.email,
                    cpf: response.data.cpf,
                    tipo_user: response.data.tipo_user
                })
                if(response.data.tipo_user == "ADM") {
                    SetIsadm('')
                }
                

            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };

        if (userId) { // Garante que só faz a requisição se o userId estiver definido
            fetchData();
        }

    }, [userId]); // Executa sempre que userId mudar


    return(
        <div className="flex h-screen  flex-col overflow-hidden" >


        <div className="flex flex-1">
        <Asside />
        <div className="flex-col w-full">


        <HeaderDash/>


        <main className=" flex-1  bg-gray-200 h-full   ">
        {/*Caixa de infomações de usuario  */}
        <div className="flex overflow-auto  flex-col items-center">

        <InfoUser/>

        <CreateItemAdmin/>


        </div>

        <div className=" flex justify-end mr-16  ">
        <Button
            variant="outlined"
            size="large"
            onClick={async () => {
                const confirme = confirm('Tem certeza que deseja sair da conta?');
                if (!confirme) return;

                try {
                await axios.post('http://localhost:3333/usuario/logout', {}, {
                    withCredentials: true // <- importante para enviar e apagar cookies HttpOnly
                });

                alert('Token apagado. Redirecionando...');
                window.location.href = '/login'; // ou use router.push('/login')
                } catch (error) {
                alert('Erro ao sair da conta');
                console.error(error);
                }
            }}
            color="error"
            >
            Sair da conta
            </Button>

        </div>
        </main>
        </div>
        </div>

        </div>
    )


}



