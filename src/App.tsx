import { Suspense, lazy } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { useT } from "./i18n/LanguageContext";

const CardGallery = lazy(() => import("./components/CardGallery"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const Header = lazy(() => import("./components/Header"));
const MainLayout = lazy(() => import("./components/MainLayout"));

const theme = createTheme({
  palette: {
    mode: "dark",
    background: {
      default: "#121212", // Dark mode background
      paper: "#1d1d1d",
    },
    text: {
      primary: "#ffffff", // White text in dark mode
    },
  },
  typography: {
    fontFamily: "Inter, system-ui, Avenir, Helvetica, Arial, sans-serif",
  },
});

const AppContent: React.FC = () => {
  const t = useT();

  return (
    <>
      <Header />
      <MainLayout>
        <Suspense fallback={<div>{t.loading}</div>}>
          <Routes>
            <Route path="/" element={<CardGallery />} />
            <Route path="/about" element={<AboutPage />} />
          </Routes>
        </Suspense>
      </MainLayout>
    </>
  );
};

const App: React.FC = () => (
  <LanguageProvider>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContent />
    </ThemeProvider>
  </LanguageProvider>
);

export default App;
