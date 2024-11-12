import React from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import MarvelTimeline from "./components/MarvelTimeline";

const theme = createTheme({
  typography: {
    fontFamily: '"Roboto Condensed", "Helvetica", "Arial", sans-serif',
  },
  palette: {
    primary: {
      main: "#e23636", // Marvel red
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MarvelTimeline />
    </ThemeProvider>
  );
}

export default App;