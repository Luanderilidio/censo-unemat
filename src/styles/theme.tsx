import { createTheme, ThemeProvider } from "@mui/material/styles";
import { ptBR } from "@mui/material/locale";

export const theme = createTheme(
  {
    palette: {
      mode: "dark",
      primary: { main: "#1976d2" },
    },
    typography: {
      fontFamily: [
        "Roboto",
      ].join(","),
    },
  },
  ptBR
);
