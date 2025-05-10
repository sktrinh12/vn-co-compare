import { useRef, useState, useEffect } from "react";
import { useGesture } from "@use-gesture/react";
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
  const transformRef = useRef<HTMLDivElement | null>(null);
  const position = useRef({ x: 0, y: 0 });
  const [scale, setScale] = useState(1);

  const bind = useGesture(
    {
      onDrag: ({ offset: [dx, dy] }) => {
        position.current = { x: dx, y: dy };
        requestAnimationFrame(() => {
          if (transformRef.current) {
            transformRef.current.style.transform = `scale(${scale}) translate(${dx}px, ${dy}px)`;
          }
        });
      },
      onPinch: ({ offset: [d] }) => {
        const newScale = Math.min(Math.max(d, 0.5), 3);
        setScale(newScale);
        requestAnimationFrame(() => {
          if (transformRef.current) {
            const { x, y } = position.current;
            transformRef.current.style.transform = `scale(${newScale}) translate(${x}px, ${y}px)`;
          }
        });
      },
    },
    {
      drag: { filterTaps: true, eventOptions: { passive: false } },
      pinch: { threshold: 0.1, eventOptions: { passive: false } },
    },
  );

  useEffect(() => {
    if (open) {
      position.current = { x: 0, y: 0 };
      setScale(1);
      if (transformRef.current) {
        transformRef.current.style.transform = `scale(1) translate(0px, 0px)`;
      }
    }
  }, [open, currentImageIndex]);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="image-modal-title"
      aria-describedby="image-modal-description"
      disableAutoFocus
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          width: "1400px",
          overflow: "auto",
          display: "flex",
          textAlign: "center",
          p: 4,
          zIndex: 2,
          maxHeight: "90vh",
          flexDirection: "column",
        }}
      >
        <IconButton
          onClick={handleClose}
          sx={{
            position: "absolute",
            top: 2,
            right: 2,
          }}
        >
          <CloseIcon />
        </IconButton>

        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            transformOrigin: "center",
          }}
        >
          <div
            {...bind()}
            ref={transformRef}
            style={{
              transition: "transform 0.1s ease-out",
              transform: `scale(${scale}) translate(0px, 0px)`,
              cursor: "grab",
              touchAction: "none",
              justifyContent: "center",
              display: "flex",
              flex: 1,
              willChange: "transform",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "relative",
                flex: 1,
                display: "flex",
                alignItems: "center",
                height: "100%",
              }}
            >
              <IconButton
                onClick={handlePrev}
                disabled={filteredImages.length <= 1}
                sx={{
                  position: "relative",
                  zIndex: 10,
                  p: 2,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.07)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.15)",
                  },
                }}
              >
                <ArrowBack sx={{ fontSize: 40 }} />
              </IconButton>

              {filteredImages[currentImageIndex] && (
                <Box sx={{ display: "flex", alignItems: "flex-start", gap: 2 }}>
                  <Box
                    sx={{
                      flex: 1,
                      padding: "2px",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {loading1 && (
                      <Skeleton
                        sx={{
                          bgcolor: "grey.400",
                          width: "100%",
                          height: 420,
                          objectFit: "cover",
                        }}
                        variant="rectangular"
                      />
                    )}
                    <img
                      src={filteredImages[currentImageIndex]?.img1}
                      alt={filteredImages[currentImageIndex]?.category}
                      onLoad={() => setLoading1(false)}
                      draggable={false}
                      style={{
                        display: loading1 ? "none" : "block",
                        width: "100%",
                        height: "420px",
                        objectFit: "cover",
                      }}
                      className="responsive-image"
                    />
                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 1,
                        alignSelf: "flex-start",
                        textAlign: "left",
                      }}
                    >
                      {`${filteredImages[currentImageIndex].city1}, ${filteredImages[currentImageIndex].country1}`}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        alignSelf: "flex-start",
                        textAlign: "left",
                        width: "100%",
                      }}
                    >
                      {`${filteredImages[currentImageIndex].id} - ${filteredImages[currentImageIndex].description1}`}
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      flex: 1,
                      padding: "2px",
                      alignItems: "center",
                      display: "flex",
                      flexDirection: "column",
                    }}
                  >
                    {loading2 && (
                      <Skeleton
                        sx={{
                          bgcolor: "grey.400",
                          width: "100%",
                          height: 420,
                          objectFit: "cover",
                        }}
                        variant="rectangular"
                      />
                    )}
                    <img
                      src={filteredImages[currentImageIndex]?.img2}
                      alt={filteredImages[currentImageIndex]?.category}
                      onLoad={() => setLoading2(false)}
                      draggable={false}
                      style={{
                        display: loading2 ? "none" : "block",
                        width: "100%",
                        height: "420px",
                        objectFit: "cover",
                      }}
                      className="responsive-image"
                    />

                    <Typography
                      variant="subtitle1"
                      sx={{
                        mt: 1,
                        alignSelf: "flex-start",
                        textAlign: "left",
                      }}
                    >
                      {`${filteredImages[currentImageIndex].city2}, ${filteredImages[currentImageIndex].country2}`}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{
                        mt: 1,
                        alignSelf: "flex-start",
                        textAlign: "left",
                        width: "100%",
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
                  zIndex: 10,
                  p: 2,
                  borderRadius: "50%",
                  backgroundColor: "rgba(0,0,0,0.07)",
                  "&:hover": {
                    backgroundColor: "rgba(0,0,0,0.15)",
                  },
                }}
              >
                <ArrowForward sx={{ fontSize: 40 }} />
              </IconButton>
            </Box>
          </div>
        </Box>
      </Box>
    </Modal>
  );
};

export default PanZoomModal;
