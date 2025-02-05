import Typography from "@mui/material/Typography";
import InstagramProfileLink from "./InstragramLink";

const AboutPage: React.FC = () => {
  return (
    <>
      <Typography variant="h6" gutterBottom component="div">
        Comparison of Vietnam and Colombia from streets to food and culture.
      </Typography>
      <Typography variant="h5" gutterBottom component="div"></Typography>
      <InstagramProfileLink handle="sktrinh12" />
    </>
  );
};

export default AboutPage;
