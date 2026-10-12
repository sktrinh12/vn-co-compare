import { useState, useEffect } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";

import { Link } from "react-router-dom";
import { LANGUAGES, useLanguage, useT } from "../i18n/LanguageContext";
import type { Language } from "../i18n/translations";

const Header: React.FC = () => {
  const { language, setLanguage } = useLanguage();
  const t = useT();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinkStyle = {
    color: "white",
    fontSize: "0.85rem",
  };

  const handleNavLinkEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.filter = "brightness(0.7)";
    e.currentTarget.style.fontWeight = "bold";
  };

  const handleNavLinkLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.currentTarget.style.filter = "brightness(1)";
    e.currentTarget.style.fontWeight = "normal";
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        zIndex: 1000,
        background: "#121212",
        boxShadow: scrolled ? "0px 2px 10px rgba(0, 0, 0, 0.1)" : "none",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 1, sm: 2 },
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
              color: "white",
              fontSize: { xs: "1.15rem", sm: "1.5rem" },
            }}
          >
            Spencer Trinh
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            gap: { xs: "8px", sm: "10px" },
            marginRight: "-8px",
            alignItems: "center",
            whiteSpace: "nowrap",
          }}
        >
          <Link
            to="/"
            style={navLinkStyle}
            onMouseEnter={handleNavLinkEnter}
            onMouseLeave={handleNavLinkLeave}
          >
            {t.topics}
          </Link>
          <Link
            to="/about"
            style={navLinkStyle}
            onMouseEnter={handleNavLinkEnter}
            onMouseLeave={handleNavLinkLeave}
          >
            {t.about}
          </Link>

          <ToggleButtonGroup
            exclusive
            size="small"
            value={language}
            onChange={(_event, selected) => {
              if (selected) setLanguage(selected as Language);
            }}
            aria-label={t.languageLabel}
          >
            {LANGUAGES.map(({ code, label }) => (
              <ToggleButton
                key={code}
                value={code}
                sx={{
                  px: { xs: 1, sm: 1.25 },
                  py: 0.25,
                  fontSize: { xs: "0.7rem", sm: "0.75rem" },
                  fontWeight: 600,
                  lineHeight: 1.4,
                }}
              >
                {label}
              </ToggleButton>
            ))}
          </ToggleButtonGroup>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
