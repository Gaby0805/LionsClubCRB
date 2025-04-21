// src/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: "Arial, sans-serif",
    h3: {
      fontFamily: "Arial Black, sans-serif",
      fontWeight: "bold",
      color: "#003087"
    },
    h5: {
      fontFamily: "Arial Black, sans-serif",
      fontWeight: "bold"
    },
    body1: {
      fontFamily: "Georgia, serif",
      fontSize: "1.1rem",
      lineHeight: 1.8
    },
    button: {
      fontWeight: "bold",
      fontFamily: "Arial, sans-serif"
    }
  }
});

export default theme;
