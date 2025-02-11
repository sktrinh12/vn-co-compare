import { useRef } from "react";
import { motion, useMotionValue } from "framer-motion";
import { Box, IconButton, Modal, Skeleton, Typography } from "@mui/material";
import ArrowBack from "@mui/icons-material/ArrowBack";
import ArrowForward from "@mui/icons-material/ArrowForward";
import CloseIcon from "@mui/icons-material/Close";
import { ImgDataInterface } from "./images";

interface PanZoomModalProps {
  open: boolean;
  handleClose: () => void;
  filteredImages: ImgDataInterface[];
  currentImageIndex: number;
  handleNext: () => void;
  handlePrev: () => void;
  loading1: boolean;
  loading2: boolean;
  setLoading1: (loading: boolean) => void;
  setLoading2: (loading: boolean) => void;
}

const PanZoomModal: React.FC<PanZoomModalProps> = ({
  open,
  handleClose,
  filteredImages,
  currentImageIndex,
  handleNext,
  handlePrev,
  loading1,
  loading2,
  setLoading1,
  setLoading2,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const boxWidth = window.innerWidth;
  const boxHeight = window.innerHeight * 0.75;
  const constraints = {
    top: -boxHeight / 2,
    bottom: boxHeight / 2,
    left: -boxWidth * 2.5,
    right: boxWidth / 2,
  };

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      disableAutoFocus
    >
      <Box
        ref={containerRef}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: "100%",
          overflow: "hidden",
          display: "flex",
          textAlign: "center",
          p: 4,
          zIndex: 2,
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
          }}
        >
          <CloseIcon />
        </IconButton>
        <motion.div
          style={{
            x,
            y,
            touchAction: "none",
            cursor: "grab",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
          drag
          dragConstraints={constraints}
          dragElastic={0}
          dragMomentum={false}
          initial={false}
        >
          <IconButton
            onClick={handlePrev}
            disabled={filteredImages.length <= 1}
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <ArrowBack />
          </IconButton>
          {filteredImages[currentImageIndex] && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box
                sx={{
                  maxWidth: "100%",
                  padding: "2px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {loading1 && (
                  <Skeleton
                    sx={{ bgcolor: "grey.400", height: 400 }}
                    variant="rectangular"
                  />
                )}
                <img
                  src={filteredImages[currentImageIndex]?.img1}
                  alt={filteredImages[currentImageIndex]?.category}
                  onLoad={() => setLoading1(false)}
                  style={{
                    width: "450px",
                    height: "400px",
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
                  {filteredImages[currentImageIndex].description1}
                </Typography>
              </Box>

              <Box
                sx={{
                  maxWidth: "100%",
                  padding: "2px",
                  position: "relative",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                {loading2 && (
                  <Skeleton
                    sx={{ bgcolor: "grey.400", height: 400 }}
                    variant="rectangular"
                  />
                )}
                <img
                  src={filteredImages[currentImageIndex]?.img2}
                  alt={filteredImages[currentImageIndex]?.category}
                  onLoad={() => setLoading2(false)}
                  style={{
                    width: "450px",
                    height: "400px",
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
                  {filteredImages[currentImageIndex].description2}
                </Typography>
              </Box>
            </Box>
          )}
          <IconButton
            onClick={handleNext}
            disabled={filteredImages.length <= 1}
            sx={{
              position: "relative",
              zIndex: 2,
            }}
          >
            <ArrowForward />
          </IconButton>
        </motion.div>
      </Box>
    </Modal>
  );
};

export default PanZoomModal;
