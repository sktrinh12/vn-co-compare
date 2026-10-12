import InstagramProfileLink from "./InstragramLink";
import { Typography, Box } from "@mui/material";
import { useT } from "../i18n/LanguageContext";

const AboutPage: React.FC = () => {
  const t = useT();

  return (
    <Box>
      <Typography variant="h6" gutterBottom component="div">
        {t.aboutText}
      </Typography>
      <InstagramProfileLink handle="sktrinh12" />
    </Box>
  );
};

export default AboutPage;
