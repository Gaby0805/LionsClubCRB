import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useEffect, useState } from 'react';
import axios from 'axios';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  color: 'black',
  boxShadow: 24,
  p: 4,
};

export default function Userchange({}) {
  const [open, setOpen] = useState(false);
const [token, setToken] = useState<string | null>(null);

useEffect(() => {
  const tokenLocalStorage = localStorage.getItem("token");
  setToken(tokenLocalStorage);
}, []);  
  // Atualiza o estado quando `quantidade1` mudar

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const atualizar = async () => {
    try {
      console.log("Valor atualizado:");
      const response = await axios.put('http://localhost:3333/quantidades/', {

      },
               {
            headers: {
              Authorization: `Bearer ${token}`
            }
          });
      handleClose( )

      console.log('Resposta do servidor:', response);
    } catch (error) {
      console.error("Erro ao atualizar os dados:", error); 
    }
  };

  return (
    <div className="w-fit py-2 px-4 rounded-md bg-gray-400 ">
            <Button sx={{color: 'black'}} onClick={handleOpen}>Alterar quantidade</Button>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography
            id="modal-modal-title"
            className="flex justify-center items-center"
            variant="h6"
            component="h2"
          >
            Edite o valor
          </Typography>
          <Typography
            id="modal-modal-description"
            className="flex justify-center items-center flex-col"
            sx={{ mt: 2 }}
          >
            <input
              type="number"
              className="border-[2px] w-35 h-10 rounded-sm pl-2 mb-3"
              value={15} // Agora usa `quantidade` corretamente
              onChange={(e) => {console.log('aaa')}} // Atualiza corretamente o estado
            />
            <input
              type="button"
              className="border-[2px] w-35 h-10 rounded-sm pl-2"
              value="Enviar"
              onClick={atualizar}
            />
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
