import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import IconButton from "@mui/material/IconButton";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import Typography from "@mui/material/Typography";
import Skeleton from "@mui/material/Skeleton";
import { imgData, ImgDataInterface } from "./images";


const CardGallery: React.FC = () => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const [filteredImages, setFilteredImages] = React.useState<ImageDataInterface[]>([]);
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
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % filteredImages.length);
    setLoading1(true);
    setLoading2(true);
  };

  const handlePrev = (): void => {
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
              <Grid item xs={12} sm={6} md={4} sx={{ padding: 2 }}>
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
            <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="image-modal-title"
              aria-describedby="image-modal-description"
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  bgcolor: "background.paper",
                  boxShadow: 24,
                  height: "85%",
                  width: "85%",
                  maxWidth: "100%",
                  maxHeight: "100%",
                  overflow: "hidden",
                  display: "flex",
                  textAlign: "center",
                  paddingTop: "10px",
                  paddingBottom: "10px",
                  paddingLeft: "25px",
                  paddingRight: "25px",
                }}
              >
                <IconButton
                  onClick={handlePrev}
                  sx={{
                    position: "absolute",
                    left: -1,
                    top: "50%",
                    zIndex: 2,
                    transform: "translateY(-50%)",
                  }}
                >
                  <ArrowBack />
                </IconButton>
                {imgData[currentImageIndex] && (
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Box
                      sx={{
                        maxWidth: "50%",
                        padding: "2px",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {loading1 && (
                        <Skeleton
                          sx={{ bgcolor: "grey.400", height: 450 }}
                          variant="rectangular"
                        />
                      )}
                      <img
                        src={filteredImages[currentImageIndex]?.img1}
                        alt={filteredImages[currentImageIndex]?.title}
                        onLoad={() => setLoading1(false)}
                        style={{
                          width: "100%",
                          height: "450px",
                          display: loading1 ? "none" : "block",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          alignSelf: "flex-start",
                          textAlign: "left",
                        }}
                      >
                        {imgData[currentImageIndex].description1}
                      </Typography>
                    </Box>

                    <Box
                      sx={{
                        maxWidth: "50%",
                        padding: "2px",
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      {loading2 && (
                        <Skeleton
                          sx={{ bgcolor: "grey.400", height: 450 }}
                          variant="rectangular"
                        />
                      )}
                      <img
                        src={filteredImages[currentImageIndex]?.img2}
                        alt={filteredImages[currentImageIndex]?.title}
                        onLoad={() => setLoading2(false)}
                        style={{
                          width: "100%",
                          height: "450px",
                          display: loading2 ? "none" : "block",
                          objectFit: "cover",
                        }}
                      />
                      <Typography
                        variant="body2"
                        sx={{
                          mt: 1,
                          alignSelf: "flex-start",
                          textAlign: "left",
                        }}
                      >
                        {imgData[currentImageIndex].description2}
                      </Typography>
                    </Box>
                  </Box>
                )}
                <IconButton
                  onClick={handleNext}
                  sx={{
                    position: "absolute",
                    right: -1,
                    top: "50%",
                    zIndex: 2,
                    transform: "translateY(-50%)",
                  }}
                >
                  <ArrowForward />
                </IconButton>
              </Box>
            </Modal>
          </React.Fragment>
        );
      })}
    </Box>
  );
};

export default CardGallery;
