import * as React from "react";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Grid from "@mui/material/Grid2";
import Typography from "@mui/material/Typography";
import { imgData, ImgDataInterface } from "./images";
import PanZoomModal from "./PanZoomModal";

const CardGallery: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = React.useState<string | null>(null);
  const [index, setIndex] = React.useState<number>(0);

  const categoryData = React.useMemo(() => {
    const map = new Map<string, { first: ImgDataInterface; count: number }>();
    imgData.forEach((img) => {
      const existing = map.get(img.category);
      if (existing) {
        existing.count += 1;
      } else {
        map.set(img.category, { first: img, count: 1 });
      }
    });
    return map;
  }, []);

  const filteredImages = React.useMemo<ImgDataInterface[]>(
    () =>
      selectedCategory
        ? imgData.filter((img) => img.category === selectedCategory)
        : [],
    [selectedCategory]
  );

  const handleOpen = (category: string): void => {
    setSelectedCategory(category);
    setIndex(0);
  };

  const handleClose = (): void => {
    setSelectedCategory(null);
  };

  const handleSelect = (
    event: React.KeyboardEvent<HTMLDivElement>,
    category: string
  ): void => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleOpen(category);
    }
  };

  return (
    <Box sx={{ pb: 6 }}>
      <Grid container spacing={2}>
        {Array.from(categoryData.entries()).map(([category, data]) => (
          <Grid key={category} size={{ xs: 12, sm: 6, md: 4 }}>
            <Card
              role="button"
              tabIndex={0}
              onClick={() => handleOpen(category)}
              onKeyDown={(event) => handleSelect(event, category)}
              sx={{
                cursor: "pointer",
                outline: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
                "@media (hover: hover)": {
                  "&:hover": {
                    transform: "translateY(-3px)",
                    boxShadow: 6,
                  },
                },
                "&:focus-visible": {
                  boxShadow: 4,
                },
              }}
            >
              <Box sx={{ display: "flex", height: { xs: 150, sm: 180 }, bgcolor: "action.hover" }}>
                <CardMedia
                  component="img"
                  image={data.first.img1}
                  alt={`${category} - ${data.first.country1}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <CardMedia
                  component="img"
                  image={data.first.img2}
                  alt={`${category} - ${data.first.country2}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sx={{
                    flex: 1,
                    minWidth: 0,
                    height: "100%",
                    objectFit: "cover",
                    borderLeft: "1px solid rgba(0, 0, 0, 0.25)",
                  }}
                />
              </Box>
              <CardContent sx={{ py: 1.25, "&:last-child": { pb: 1.25 } }}>
                <Typography
                  noWrap
                  variant="subtitle1"
                  sx={{ textTransform: "capitalize", fontWeight: 600 }}
                >
                  {category}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {data.count === 1 ? "1 comparación" : `${data.count} comparaciones`}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      <PanZoomModal
        open={selectedCategory !== null}
        onClose={handleClose}
        images={filteredImages}
        index={index}
        onIndexChange={setIndex}
      />
    </Box>
  );
};

export default CardGallery;
