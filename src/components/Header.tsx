import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Tooltip,
  Typography,
  Box,
  Switch,
} from "@mui/material";

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
        <Box
          sx={{
            position: "relative",
            width: "auto",
            opacity: scrolled ? 0 : 1,
            filter: scrolled ? "blur(10px)" : "blur(0px)",
            clipPath: scrolled ? "inset(40% 20% 40% 20%)" : "inset(0 0 0 0)",
            transition: scrolled
              ? "opacity 0.5s ease-out, filter 0.5s ease-out, clip-path 0.7s ease-out"
              : "opacity 0.3s ease-in, filter 0.3s ease-in, clip-path 0.5s ease-in",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              color: darkMode ? "white" : "black",
            }}
          >
            Spencer Trinh
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: "20px",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Link
            to="/"
            style={{
              color: darkMode ? "white" : "black",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.7)";
              e.currentTarget.style.fontWeight = "bold";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.fontWeight = "normal";
            }}
          >
            Temas
          </Link>
          <Link
            to="/about"
            style={{
              color: darkMode ? "white" : "black",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.filter = "brightness(0.7)";
              e.currentTarget.style.fontWeight = "bold";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.filter = "brightness(1)";
              e.currentTarget.style.fontWeight = "normal";
            }}
          >
            Acerca de
          </Link>

          <Tooltip title="Toggle Dark Mode" arrow>
            <Switch
              checked={darkMode}
              onChange={() => setDarkMode(!darkMode)}
              color="default"
            />
          </Tooltip>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
