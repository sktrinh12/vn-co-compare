import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { imgData, ImgDataInterface } from "./images";
import PanZoomModal from "./PanZoomModal";

const CardGallery: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const [filteredImages, setFilteredImages] = React.useState<
    ImgDataInterface[]
  >([]);
  const [loading1, setLoading1] = React.useState<boolean>(true);
  const [loading2, setLoading2] = React.useState<boolean>(true);

  const handleOpen = (category: string): void => {
    const imagesForCategory = imgData.filter((img) => img.category == category);
    setFilteredImages(imagesForCategory);
    setCurrentImageIndex(0);
    setOpen(true);
    setLoading1(true);
    setLoading2(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNext = (): void => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex(
      (prevIndex) => (prevIndex + 1) % filteredImages.length,
    );
    setLoading1(true);
    setLoading2(true);
  };

  const handlePrev = (): void => {
    if (filteredImages.length <= 1) return;
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? filteredImages.length - 1 : prevIndex - 1,
    );
    setLoading1(true);
    setLoading2(true);
  };

  const categories = [...new Set(imgData.map((img) => img.category))];

  return (
    <Box>
      {categories.map((category: string, index: number) => {
        const item = imgData.find((img) => img.category === category);

        if (!item || index === -1) return null;

        return (
          <React.Fragment key={category}>
            <Grid container spacing={2} key={category}>
              <Grid item xs={12} sm={6} md={4} sx={{ pt: 2, pb: 2 }}>
                <Card
                  sx={{
                    maxWidth: "100%",
                    cursor: "pointer",
                    transition:
                      "transform 0.3s ease-in-out, background-color 0.3s ease-in-out",
                    "&:hover": {
                      transform: "scale(1.05)",
                      backgroundColor: "rgba(0, 0, 0, 0.1)",
                    },
                  }}
                  onClick={() => handleOpen(category)}
                >
                  <CardMedia
                    sx={{ height: 200 }}
                    image={item.img1}
                    title={category}
                  />
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {category}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
            <PanZoomModal
              open={open}
              handleClose={handleClose}
              handlePrev={handlePrev}
              handleNext={handleNext}
              filteredImages={filteredImages}
              currentImageIndex={currentImageIndex} 
              loading1={loading1}
              loading2={loading2}
              setLoading1={setLoading1}
              setLoading2={setLoading2}
            />
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CardGallery;
