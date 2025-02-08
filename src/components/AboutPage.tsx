import InstagramProfileLink from "./InstragramLink";
import { Typography, Box } from "@mui/material";

const AboutPage: React.FC = () => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        Comparison of Vietnam and Colombia from streets to food and culture.
      </Typography>
      <InstagramProfileLink handle="sktrinh12" />
    </Box>
  );
};

export default AboutPage;
