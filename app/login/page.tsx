import React from "react";
import { Copse } from "next/font/google"
import {  Concert_One } from "next/font/google"
import Link from "next/link";

const copsefont = Copse({
  subsets: ["latin"],
  weight: "400",
}) 
const Concert_Onefont = Concert_One({
  subsets: ["latin"],
  weight: "400",
}) 

export default function Home() {

  const Email = () => {
    return(
      <input className={`${copsefont.className} bg-gray-400 w-72 h-11 rounded-md m-13 text-xl font-bold p-3 opacity-80`} type="email" name="email " id="" placeholder="Email"/>
    )
  }

  const Password = () => {
    return(
      <input className={`${copsefont.className} bg-gray-400 w-72 h-11 rounded-md text-xl font-bold p-3 opacity-80 `} type="password" name="senha" id="" placeholder="Senha" />
    )
  }

  const Entrar = () => {
    return(
      <Link href={"/dashboard"}>
      <button type="button" className={`${Concert_Onefont.className} h-13 w-44 text-2xl bg-amber-400 rounded-md mt-15 `}> Entrar</button>
      </Link>
    )
  }
  
  return (
    <main className="bg-cover bg-center h-screen" style={{ backgroundImage: 'url(/imgs/login.png)' }}>
      <div className="w-screen h-screen flex justify-center items-center">
        <div className=" w-96 border-2 border-white rounded-2xl flex justify-center items-center flex-col " 
             style={{ height: 500, backgroundColor: 'rgba(21, 78, 157, 0.7)' }}>


          <div className="flex justify-center h-full w items-center flex-col opacity-100 text-white ">
          <h3 className="text-white text-4xl w-max ">Login</h3>
            <Email />
            <Password />
            <p className="mr-32 mt-1 font-bold underline">esqueci minha senha</p>
            <Entrar/>
          </div>
        </div>
      </div>
    </main>
  );
}
