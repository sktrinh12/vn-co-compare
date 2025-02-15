import React from "react";
import { Box } from "@mui/material";

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Box sx={{ paddingTop: { xs: "64px", sm: "72px" }, padding: "0 14px" }}>
      {children}
    </Box>
  );
};

export default MainLayout;
