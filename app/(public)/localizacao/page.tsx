import React from "react";
import Image from "next/image";
import { Button, AppBar, Toolbar, Typography, Container, Grid, Box, Link } from "@mui/material";
import Footer from "@/app/componets/footer";
import Header from "@/app/componets/header";


export default function Projetos() {
  return (
    <div className="flex flex-col min-h-screen"style={{backgroundColor: '#FEECCF'}}>
      <Header/>



    <Container className=" m-auto justify-center items-center" style={{backgroundColor: '#FEECCF'}}>

        <div className=" flex flex-col justify-center items-center">
          <h2 className="text-[24px]">
            Nossa Localização
          </h2>
        <iframe
        className="border"
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1372.660318694235!2d-57.65507958905397!3d-19.022225575110298!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9387a156248c4b73%3A0xd869250530040dba!2sLions%20clube%20Corumb%C3%A1!5e0!3m2!1sen!2sbr!4v1744402738269!5m2!1sen!2sbr"
  width="600"
  height="450"
  allowFullScreen
  loading="lazy"
  referrerPolicy="no-referrer-when-downgrade"
/>

        </div>

    </Container>



      <Footer/>
    </div>
  );
}
