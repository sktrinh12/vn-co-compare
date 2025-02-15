import { useState, Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import "./styles.css"

const CardGallery = lazy(() => import("./components/CardGallery"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const Header = lazy(() => import("./components/Header"));
const MainLayout = lazy(() => import("./components/MainLayout"));

const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

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
      fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <MainLayout>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<CardGallery />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </ThemeProvider>
  );
};

export default App;
