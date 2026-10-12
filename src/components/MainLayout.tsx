import React from "react";
import { Box } from "@mui/material";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ pt: { xs: "64px", sm: "72px" }, px: { xs: 1.5, sm: 2 }, pb: 4 }}>
      {children}
    </Box>
  );
};

export default MainLayout;
