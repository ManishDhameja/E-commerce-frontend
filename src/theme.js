import {createTheme, responsiveFontSizes} from "@mui/material";

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
      MuiTypography: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            fontFamily: "Poppins"
          }
        }
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontFamily: "Poppins"
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1),0 4px 6px -2px rgba(0, 0, 0, 0.05)",
            border: "1px solid #E2E8F0",
            borderRadius: "0.375rem",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            border: "none",
          },
        },
      },
      MuiToggleButton: {
        styleOverrides: {
          root: {
            border: "none"
          }
        }
      }
    },
  }),
);