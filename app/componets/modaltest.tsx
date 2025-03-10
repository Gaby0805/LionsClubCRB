import { useState } from "react";
import { Modal, Box, Button, Typography } from "@mui/material";

export default function MuiModalExample() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button color='#9e9e9e' variant="contained" onClick={() => setOpen(true)}>
        Abrir Modal
      </Button>

      <Modal open={open} onClose={() => setOpen(false)}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <Typography variant="h6">Título do Modal</Typography>
          <Typography sx={{ mt: 2 }}>
            Esse é um modal usando Material UI.
          </Typography>
          <Button
            onClick={() => setOpen(false)}
            variant="contained"
            color="#eeeeee"
            sx={{ mt: 3 }}
          >
            Fechar
          </Button>
        </Box>
      </Modal>
    </>
  );
}
