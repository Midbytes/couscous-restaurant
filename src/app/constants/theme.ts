import createTheme, { ThemeOptions } from "@mui/material/styles/createTheme";

export const themeOptions: ThemeOptions = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#203881",
    },
    secondary: {
      main: "#f5ead6",
    },
    background: {
      default: "#fff",
      paper: "#fff",
    },
    text: {
      primary: "#222429",
      secondary: "#203881",
      disabled: "rgba(34,36,41,0.51)",
    },
  },
});
