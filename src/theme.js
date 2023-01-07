import { createTheme, responsiveFontSizes } from "@mui/material";

export default responsiveFontSizes(
  createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#FF0000",
      },
      divider: "#000000",
      info: {
        main: "#fff",
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          text: {
            textTransform: "none",
          },
        },
      },
    },
  })
);