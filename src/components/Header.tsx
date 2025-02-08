import { useState, useEffect } from "react";
import { AppBar, Toolbar, Typography, Box, Switch } from "@mui/material";
import { Link } from "react-router-dom";

interface HeaderProps {
  darkMode: boolean;
  setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({ darkMode, setDarkMode }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <AppBar
      position="fixed"
      sx={{
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        background: darkMode ? "#121212" : "white",
        boxShadow: scrolled ? "0px 2px 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0 20px",
        }}
      >
        {!scrolled && (
          <Typography variant="h5" sx={{ color: darkMode ? "white" : "black" }}>
            Spencer Trinh
          </Typography>
        )}

        <Box sx={{ display: "flex", gap: "20px", alignItems: "center" }}>
          <Link
            to="/"
            style={{ color: darkMode ? "white" : "black", textDecoration: "none" }}
          >
            Temas 
          </Link>
          <Link
            to="/about"
            style={{ color: darkMode ? "white" : "black", textDecoration: "none" }}
          >
            About
          </Link>

        <Switch
          checked={darkMode}
          onChange={() => setDarkMode(!darkMode)}
          color="default"
        />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
