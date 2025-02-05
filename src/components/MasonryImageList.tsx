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
import { imgData }  from "./images";

interface MasonryImageListProps {
  subfolder?: string;
}

const MasonryImageList: React.FC<MasonryImageListProps> = ({ subfolder }) => {
  const [open, setOpen] = React.useState<boolean>(false);
  const [currentImageIndex, setCurrentImageIndex] = React.useState<number>(0);
  const [loading1, setLoading1] = React.useState<boolean>(true);
  const [loading2, setLoading2] = React.useState<boolean>(true);

  const handleOpen = (index: number): void => {
    setCurrentImageIndex(index);
    setOpen(true);
    setLoading1(true);
    setLoading2(true);
  };

  const handleClose = (): void => {
    setOpen(false);
  };

  const handleNext = (): void => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % imgData.length);
    setLoading1(true);
    setLoading2(true);
  };

  const handlePrev = (): void => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imgData.length - 1 : prevIndex - 1
    );
    setLoading1(true);
    setLoading2(true);
  };

  return (
    <Box sx={{ display: "flex", marginTop: '50px', paddingX: '20px' }}>
      <Grid container spacing={2} > 
        {imgData.map((item, index) => (
          <Grid item xs={12} sm={6} md={4} key={index} >
       <Card
          key={index}
          sx={{
                maxWidth: "100%",
                cursor: "pointer",
          }}
          onClick={() => handleOpen(index)}
        >
          <CardMedia
            sx={{ height: 140 }}
            image={item.img1}
            title={item.title}
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {item.title}
            </Typography>
          </CardContent>
        </Card>
          </Grid>
      ))}
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
            <Box sx={{ display: "flex", alignItems: "center"}}>
             <Box sx={{ maxWidth: "50%", padding: "2px"}}>
                {loading1 && (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width="100%"
                    height="100%"
                  />
                )}
            <img
              src={imgData[currentImageIndex].img1}
              alt={imgData[currentImageIndex].title}
              onLoad={() => setLoading1(false)}
              style={{
                maxWidth: "100%",
                display: loading1 ? "none" : "block",
              }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
              {imgData[currentImageIndex].description1}
            </Typography>
           </Box>

           <Box sx={{  maxWidth: "50%", padding: "2px"}}>
                {loading2 && (
                  <Skeleton
                    sx={{ bgcolor: "grey.900" }}
                    variant="rectangular"
                    width="100%"
                    height="100%"
                  />
                )}
           <img
              src={imgData[currentImageIndex].img2}
              alt={imgData[currentImageIndex].title}
              onLoad={() => setLoading2(false)}
              style={{
                maxWidth: "100%",
                display: loading2 ? "none" : "block",
              }}
            />
            <Typography variant="body2" sx={{ mt: 1 }}>
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
    </Box>
  );
};

export default MasonryImageList;
