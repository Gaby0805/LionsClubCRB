'use client'
import React from "react";
import Image from "next/image";
import {
  Button,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Grid,
  Box,
  Link,
} from "@mui/material";
import Header from "../componets/header";
import Footer from "../componets/footer";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen ">
      <Header />
 
      <Box
        sx={{
          bgcolor: "#FEECCF",
          position: "relative",
          textAlign: "center",
          py: 5,
        }}
      >
        <Box sx={{ position: "relative", width: "100%", height: "auto" }}>
          <Image
            src="/imgs/principal.png"
            alt="Nós Servimos"
            width={1000}
            height={400}
            style={{ width: "100%", height: "auto", objectFit: "cover" }}
          />


          <Typography
            variant="h3"
            sx={{
              position: "absolute",
              top: "0%",
              left: "37%",
              color: "#002E73",
              fontWeight: "bold",
              px: 3,
              py: 4,
              fontFamily: "'Metamorphous', serif",
              height: 'fit',
              fontSize: '80px',
              textShadow: '1px 1px 4px #FCCB06'            }}
            >
            NÓS SERVIMOS
          </Typography>
        </Box>
      </Box>

      <Box sx={{ bgcolor: "#FEECCF", py: 5 }}>
        <Container>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                variant="h5"
                className="text-black text-8xl"
                fontWeight="bold"
                gutterBottom
                sx={{ fontFamily: "'Metamorphous', serif" }}
              >
                Sobre nós
              </Typography>
              <Typography className="text-black">
                O Lions Clube de Corumbá é uma organização voluntária dedicada
                a servir à comunidade. Com o lema "Nós Servimos", realizamos
                projetos nas áreas de saúde, educação e assistência social,
                buscando sempre promover o bem-estar e a união em nossa cidade.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Image
                src="/imgs/login.png"
                alt="Membros do Lions"
                width={500}
                height={300}
                style={{
                  borderRadius: 10,
                  boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ bgcolor: "#FEECCF", py: 5, textAlign: "center" }}>
        <Typography
          variant="h6"
          color="text.primary"
          sx={{ fontFamily: "'Metamorphous', serif" }}
        >
          Ajude aos Lions Clubes a manter esse legado
        </Typography>
      </Box>

      <Footer/>
    </div>
  );
}
