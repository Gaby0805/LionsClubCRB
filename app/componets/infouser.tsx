'use client'
import React, { use, useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useUser } from "./context/UserContext";
import axios from "axios";

export default function InfoUser() {
    const { userId } = useUser(); 
    
    const [Infosearch,setInfosearch] = useState({
        nome_user: '',
        sobrenome: '',
        email: '',
        cpf: '',
        senha: '',
        tipo_user: '',

    })

    const [respostasNome, setRespostasNome] = useState(Infosearch.nome_user);
    const [respostasSobrenome, setRespostasSobrenome] = useState(Infosearch.sobrenome);
    const [respostasEmail, setRespostasEmail] = useState(Infosearch.email);
    const [respostasCpf, setRespostasCpf] = useState(Infosearch.cpf);
    const [respostasSenha, setRespostasSenha] = useState('');
    const [Isenable, setIsenable] = useState(true)
    
    
const catchinfo =  useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post("https://leoncio-backend.onrender.com/usuario/especifico", {
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

                
            } catch (error) {
                console.log("Erro ao buscar dados:", error);
            }
        };
        
        if (userId) { // Garante que só faz a requisição se o userId estiver definido
            fetchData();
        }
    }, [userId]); // Executa sempre que userId mudar
    
    

    const alterUser = () => {
        try{
            
            const confirmealter = confirm('info: '+ 'Nome: '+ respostasNome +'sobrenome: '+ respostasSobrenome +'email: '+ respostasEmail + 'cpf: '+ respostasCpf)
            if (!confirmealter) return;
            console.log('tudo certo')
            const response = axios.put('https://leoncio-backend.onrender.com/usuario', {
                id_usuario: userId,
                u_nome: respostasNome ,
                u_sobrenome: respostasSobrenome,
                u_email: respostasEmail,
                u_cpf:  respostasCpf,
                u_tipo: Infosearch.tipo_user
    
            },
            {withCredentials: true}
        )
        response.catch(()=> {            alert('Houve algum erro em alguma informção, confira a quantidade de caracteres em cada campo')


        })

        }
        catch (err) {
            console.log(err)
            alert('Houve algum erro em alguma informção, confira a quantidade de caracteres em cada campo')
        }
    }
    useEffect(() => {
        setRespostasNome(Infosearch.nome_user);
        setRespostasSobrenome(Infosearch.sobrenome);
        setRespostasEmail(Infosearch.email);
        setRespostasCpf(Infosearch.cpf);

      }, [Infosearch]);


    return(
    <div className=" flex flex-col items-center mt-4 overflow-auto  ">
                <h2 className="text-[24px] ">Suas informações</h2>
            <div className=" p-10 informações h-fit m-5 flex  flex-col  border rounded-2xl ">


                <div className="flex  m-5">

                    <div className="flex flex-col mr-10">
                        <label > Nome</label>
                        <input  className=" w-fit h-9 rounded-md bg-gray-300 p-2" type="text" defaultValue={Infosearch.nome_user} onChange={(e) => setRespostasNome(e.target.value) } disabled={Isenable}/>
                    </div>

                    <div className="flex flex-col ">
                        <label > Sobrenome</label>
                        <input className=" w-fit h-9 rounded-md bg-gray-300 p-2" type="text"  defaultValue={Infosearch.sobrenome} onChange={e => setRespostasSobrenome(e.target.value)}  disabled={Isenable}/>
                    </div>
            
                </div>


                <div className="m-5 flex">

                    <div className="flex flex-col mr-10">
                        <label > Email</label>
                        <input className=" w-fit h-9 rounded-md bg-gray-300 p-2" type="text"  defaultValue={Infosearch.email} onChange={e => setRespostasEmail(e.target.value)}  disabled={Isenable}/>
                    </div>

                    <div className="flex flex-col">
                        <label > CPF</label>
                        <input className=" w-fit h-9 rounded-md bg-gray-300 p-2" type="text"  defaultValue={Infosearch.cpf} onChange={e => setRespostasCpf(e.target.value)}  disabled={Isenable}/>
                    </div>
                </div>
                

                <div className="m-5 flex">

                    <div className="flex flex-col mr-10">
                        <label > Tipo do Usuario</label>
                        <input className=" w-fit h-9 rounded-md bg-gray-300 p-2" type="text"  defaultValue={Infosearch.tipo_user}   disabled/>
                    </div>

                    <div className="flex flex-col">
                        <label > Senha</label>
                        <div className="flex justify-center p-2">
                            <Button variant="outlined" color="inherit" size="small" className="w-34" disabled={Isenable} >Trocar senha</Button>
                        </div>
                    </div>

                </div>
                
            <div className=" max-w-full flex justify-center ">
            <Button variant="outlined" color="inherit" size="medium" className="w-56 " onClick={()=> {setIsenable(!Isenable)}}>Alterar informações</Button>
            <div className="m-2"></div>
            <Button variant="outlined" color="inherit" size="medium" className="w-40  " onClick={alterUser}>Enviar</Button>
            </div>
            </div>


            </div>

    )


}   



