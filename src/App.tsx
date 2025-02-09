import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import CardGallery from "./components/CardGallery";
import AboutPage from "./components/AboutPage";
import HealthStatus from "./components/Health";
import Header from "./components/Header";
import MainLayout from "./components/MainLayout";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = createTheme({
    palette: {
      mode: darkMode ? "dark" : "light",
      ...(darkMode
        ? {
            background: {
              default: "#121212", // Dark mode background
              paper: "#1d1d1d",
            },
            text: {
              primary: "#ffffff", // White text in dark mode
            },
          }
        : {
            background: {
              default: "#ffffff", // Light mode background
              paper: "#f5f5f5",
            },
            text: {
              primary: "#000000", // Black text in light mode
            },
          }),
    },
    typography: {
      fontFamily: 'Inter, system-ui, Avenir, Helvetica, Arial, sans-serif',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <MainLayout>
      <Routes>
        <Route path="/" element={<CardGallery/>} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/health" element={<HealthStatus />} />
      </Routes>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
