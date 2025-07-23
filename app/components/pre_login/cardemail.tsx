'use client';
import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

export default function EmailCard() {
  return (
    <Card>
      <CardContent>
        <Typography variant="h5" component="div">
          Lionsclubecorumbams@gmail.com
        </Typography>
        <Typography variant="body2">
            Clique abaixo para receber as informações

        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={()=> window.location.href = 'mailto:Lionsclubecorumbams@gmail.com?subject=Contato%20pelo%20site'}>Enviar email</Button>
      </CardActions>
    </Card>
  );
}
