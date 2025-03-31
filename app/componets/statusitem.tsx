import React from "react";

export default function Statuscomodato(props:any) {

  const {nome, status, data} = props;
    const verifyStatus = (statusitem)  => statusitem == "Ativo"? " bg-green-500" : statusitem == "EmailEnviado"? " bg-amber-600": statusitem == "Concluido"? " bg-green-900": 'alguma outra'
    
    return(

    <div className=" w-96  h-18 bg-gray-300 m-10 rounded-xl transition delay-150 duration-300 ease-linear hover:scale-105  " onClick={() => console.log('bread')}>
      <div className="flex w-fit h-fit ">
        <div className=" flex mt-2 ml-3">
          <p className="">
            {nome}

          </p>
        <div className={" w-16 ml-4 bg h-fit  rounded-2xl flex justify-center items-center"+verifyStatus(props.status) }>
           {status}
            
         </div>
         <p className="ml-2"> 
            Data Limite:  
            { data}
         </p>
        </div>
        


      </div >
        <p className="ml-3 mt-1 ">clicle para obter mais informações</p>



    </div>
    

)

}