import * as React from "react";
import { useGesture } from "@use-gesture/react";
import { useMediaQuery, useTheme } from "@mui/material";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Skeleton from "@mui/material/Skeleton";
import Typography from "@mui/material/Typography";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import CloseIcon from "@mui/icons-material/Close";
import CompareArrowsIcon from "@mui/icons-material/CompareArrows";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { ImgDataInterface } from "./images";

const MIN_SCALE = 1;
const MAX_SCALE = 4;
const DOUBLE_TAP_SCALE = 2.5;

interface TransformState {
  x: number;
  y: number;
  s: number;
}

interface PanZoomModalProps {
  open: boolean;
  onClose: () => void;
  images: ImgDataInterface[];
  index: number;
  onIndexChange: (index: number) => void;
}

const clampNumber = (value: number, min: number, max: number): number =>
  Math.min(Math.max(value, min), max);

const isOnDividerHandle = (event: unknown): boolean => {
  const target = (event as Event | undefined)?.target as HTMLElement | null;
  return Boolean(target?.closest?.("[data-slider-handle]"));
};

const isTouchEvent = (event: unknown): boolean => {
  const pointerEvent = event as PointerEvent | undefined;
  if (pointerEvent && "pointerType" in pointerEvent) {
    return pointerEvent.pointerType === "touch";
  }
  return "touches" in (event as Partial<TouchEvent>);
};

const overlayControlSx = {
  bgcolor: "rgba(0, 0, 0, 0.5)",
  color: "common.white",
  boxShadow: 3,
  "&:hover": { bgcolor: "rgba(0, 0, 0, 0.7)" },
  "&.Mui-disabled": {
    bgcolor: "rgba(0, 0, 0, 0.2)",
    color: "rgba(255, 255, 255, 0.4)",
  },
  "&::before": { content: '""', position: "absolute", inset: -16 },
} as const;

const PanZoomModal: React.FC<PanZoomModalProps> = ({
  open,
  onClose,
  images,
  index,
  onIndexChange,
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const areaRef = React.useRef<HTMLDivElement | null>(null);
  const contentRef = React.useRef<HTMLDivElement | null>(null);
  const clipRef = React.useRef<HTMLDivElement | null>(null);
  const dividerRef = React.useRef<HTMLDivElement | null>(null);
  const transformRef = React.useRef<TransformState>({ x: 0, y: 0, s: 1 });
  const dividerDraggingRef = React.useRef(false);
  const lastTapRef = React.useRef(0);
  const lastPinchEndRef = React.useRef(0);
  const transitionTimeoutRef = React.useRef(0);

  const [loaded1, setLoaded1] = React.useState(false);
  const [loaded2, setLoaded2] = React.useState(false);
  const [expanded, setExpanded] = React.useState(false);

  const current = images[index];
  const canNavigate = images.length > 1;

  const goNext = React.useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((index + 1) % images.length);
  }, [images, index, onIndexChange]);

  const goPrev = React.useCallback(() => {
    if (images.length <= 1) return;
    onIndexChange((index - 1 + images.length) % images.length);
  }, [images, index, onIndexChange]);

  const clampT = React.useCallback((t: TransformState): TransformState => {
    const area = areaRef.current;
    const width = area?.clientWidth ?? window.innerWidth;
    const height = area?.clientHeight ?? window.innerHeight;
    const s = clampNumber(t.s, MIN_SCALE, MAX_SCALE);
    return {
      s,
      x: clampNumber(t.x, width * (1 - s), 0),
      y: clampNumber(t.y, height * (1 - s), 0),
    };
  }, []);

  const applyT = React.useCallback((t: TransformState) => {
    transformRef.current = t;
    if (contentRef.current) {
      contentRef.current.style.transform = `translate(${t.x}px, ${t.y}px) scale(${t.s})`;
    }
    if (areaRef.current) {
      areaRef.current.style.cursor = t.s > 1 ? "grab" : "default";
    }
  }, []);

  const animateT = React.useCallback(
    (t: TransformState) => {
      const el = contentRef.current;
      if (!el) {
        applyT(t);
        return;
      }
      window.clearTimeout(transitionTimeoutRef.current);
      el.style.transition = "transform 0.25s ease-out";
      applyT(t);
      transitionTimeoutRef.current = window.setTimeout(() => {
        el.style.transition = "";
      }, 270);
    },
    [applyT]
  );

  const zoomAt = React.useCallback(
    (nextScale: number, ox: number, oy: number) => {
      const t = transformRef.current;
      const s = clampNumber(nextScale, MIN_SCALE, MAX_SCALE);
      const k = s / t.s;
      applyT(
        clampT({
          s,
          x: ox - k * (ox - t.x),
          y: oy - k * (oy - t.y),
        })
      );
    },
    [applyT, clampT]
  );

  const handleTap = React.useCallback(
    (event: unknown) => {
      const now = Date.now();
      if (now - lastTapRef.current < 300) {
        lastTapRef.current = 0;
        const rect = areaRef.current?.getBoundingClientRect();
        if (!rect) return;
        const point = event as PointerEvent;
        if (transformRef.current.s > 1) {
          animateT({ x: 0, y: 0, s: 1 });
        } else {
          const ox = point.clientX - rect.left;
          const oy = point.clientY - rect.top;
          animateT(
            clampT({ s: DOUBLE_TAP_SCALE, x: ox * (1 - DOUBLE_TAP_SCALE), y: oy * (1 - DOUBLE_TAP_SCALE) })
          );
        }
      } else {
        lastTapRef.current = now;
      }
    },
    [animateT, clampT]
  );

  const updateDivider = React.useCallback((clientX: number) => {
    const el = contentRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    if (rect.width === 0) return;
    const pos = clampNumber(((clientX - rect.left) / rect.width) * 100, 4, 96);
    if (clipRef.current) {
      clipRef.current.style.clipPath = `inset(0 ${100 - pos}% 0 0)`;
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = `${pos}%`;
    }
  }, []);

  const handleDividerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dividerDraggingRef.current = true;
    updateDivider(event.clientX);
  };

  const handleDividerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dividerDraggingRef.current) {
      updateDivider(event.clientX);
    }
  };

  const handleDividerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    dividerDraggingRef.current = false;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const bind = useGesture(
    {
      onDrag: ({ delta: [dx, dy], tap, pinching, event }) => {
        if (pinching || isOnDividerHandle(event)) return;
        if (tap) {
          if (isTouchEvent(event)) handleTap(event);
          return;
        }
        const t = transformRef.current;
        if (t.s > 1) {
          applyT(clampT({ x: t.x + dx, y: t.y + dy, s: t.s }));
        }
      },
      onDragEnd: ({ offset: [ox, oy], velocity: [vx], pinching, event }) => {
        if (pinching || isOnDividerHandle(event)) return;
        if (Date.now() - lastPinchEndRef.current < 350) return;
        if (transformRef.current.s > 1) return;
        if (!isTouchEvent(event)) return;
        if (oy > 90 && oy > Math.abs(ox) * 1.2) {
          onClose();
          return;
        }
        const direction =
          Math.abs(ox) > 60 ? Math.sign(ox) : Math.abs(vx) > 0.5 ? Math.sign(vx) : 0;
        if (direction === 0) return;
        if (direction < 0) goNext();
        else goPrev();
      },
      onPinch: ({ origin, offset, first, memo, event }) => {
        if (isOnDividerHandle(event)) return;
        const base = first ? transformRef.current : memo;
        const rect = areaRef.current?.getBoundingClientRect();
        if (!rect || !base) return;
        const ox = origin[0] - rect.left;
        const oy = origin[1] - rect.top;
        const s = clampNumber(base.s * offset[0], MIN_SCALE, MAX_SCALE);
        const k = s / base.s;
        applyT(
          clampT({
            s,
            x: ox - k * (ox - base.x),
            y: oy - k * (oy - base.y),
          })
        );
        return base;
      },
      onPinchEnd: () => {
        lastPinchEndRef.current = Date.now();
      },
    },
    {
      drag: { filterTaps: true },
    }
  );

  const handleDoubleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = areaRef.current?.getBoundingClientRect();
    if (!rect) return;
    if (transformRef.current.s > 1) {
      animateT({ x: 0, y: 0, s: 1 });
    } else {
      zoomAt(DOUBLE_TAP_SCALE, event.clientX - rect.left, event.clientY - rect.top);
    }
  };

  React.useEffect(() => {
    if (!open) return;
    applyT({ x: 0, y: 0, s: 1 });
    lastTapRef.current = 0;
    setLoaded1(false);
    setLoaded2(false);
    setExpanded(false);
    if (clipRef.current) {
      clipRef.current.style.clipPath = "inset(0 50% 0 0)";
    }
    if (dividerRef.current) {
      dividerRef.current.style.left = "50%";
    }
  }, [open, index, images, applyT]);

  React.useEffect(() => {
    if (!open || images.length < 2) return;
    const total = images.length;
    [(index + 1) % total, (index - 1 + total) % total].forEach((neighborIndex) => {
      const neighbor = images[neighborIndex];
      if (!neighbor) return;
      [neighbor.img1, neighbor.img2].forEach((src) => {
        if (!src) return;
        const preloader = new Image();
        preloader.src = src;
      });
    });
  }, [open, index, images]);

  React.useEffect(() => {
    if (!open) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "ArrowRight") goNext();
      else if (event.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, goNext, goPrev]);

  React.useEffect(() => {
    const el = areaRef.current;
    if (!open || !el) return;
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      const rect = el.getBoundingClientRect();
      zoomAt(
        transformRef.current.s * Math.exp(-event.deltaY * 0.0022),
        event.clientX - rect.left,
        event.clientY - rect.top
      );
    };
    el.addEventListener("wheel", handleWheel, { passive: false });
    return () => el.removeEventListener("wheel", handleWheel);
  }, [open, zoomAt]);

  React.useEffect(
    () => () => window.clearTimeout(transitionTimeoutRef.current),
    []
  );

  const sliderImageStyle = (visible: boolean): React.CSSProperties => ({
    position: "absolute",
    inset: 0,
    width: "100%",
    height: "100%",
    objectFit: "contain",
    opacity: visible ? 1 : 0,
    transition: "opacity 0.3s ease",
    pointerEvents: "none",
  });

  const renderSlider = () => {
    if (!current) return null;
    return (
      <Box sx={{ position: "absolute", top: "56px", bottom: "44px", left: 0, right: 0 }}>
        {(!loaded1 || !loaded2) && (
          <Skeleton
            variant="rectangular"
            animation="wave"
            sx={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              bgcolor: "rgba(255, 255, 255, 0.14)",
              pointerEvents: "none",
            }}
          />
        )}
        <img
          src={current.img2}
          alt={`${current.category} - ${current.city2}`}
          draggable={false}
          referrerPolicy="no-referrer"
          onLoad={() => setLoaded2(true)}
          onError={() => setLoaded2(true)}
          style={sliderImageStyle(loaded2)}
        />
        <Box
          ref={clipRef}
          sx={{ position: "absolute", inset: 0, clipPath: "inset(0 50% 0 0)" }}
        >
          <img
            src={current.img1}
            alt={`${current.category} - ${current.city1}`}
            draggable={false}
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded1(true)}
            onError={() => setLoaded1(true)}
            style={sliderImageStyle(loaded1)}
          />
        </Box>
        <Box
          ref={dividerRef}
          data-slider-handle
          onPointerDown={handleDividerDown}
          onPointerMove={handleDividerMove}
          onPointerUp={handleDividerUp}
          onPointerCancel={handleDividerUp}
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            left: "50%",
            width: 44,
            marginLeft: "-22px",
            cursor: "ew-resize",
            zIndex: 5,
            touchAction: "none",
          }}
        >
          <Box
            sx={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: "50%",
              width: 2,
              marginLeft: "-1px",
              bgcolor: "rgba(255, 255, 255, 0.9)",
              boxShadow: "0 0 6px rgba(0, 0, 0, 0.7)",
            }}
          />
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 44,
              height: 44,
              borderRadius: "50%",
              bgcolor: "common.white",
              color: "common.black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: 4,
              pointerEvents: "none",
            }}
          >
            <CompareArrowsIcon sx={{ fontSize: 22 }} />
          </Box>
        </Box>
      </Box>
    );
  };

  const renderColumn = (side: 1 | 2) => {
    if (!current) return null;
    const loaded = side === 1 ? loaded1 : loaded2;
    const setLoaded = side === 1 ? setLoaded1 : setLoaded2;
    const city = side === 1 ? current.city1 : current.city2;
    const src = side === 1 ? current.img1 : current.img2;
    return (
      <Box sx={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
        <Box
          sx={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {!loaded && (
            <Skeleton
              variant="rectangular"
              animation="wave"
              sx={{
                position: "absolute",
                inset: 0,
                width: "100%",
                height: "100%",
                bgcolor: "rgba(255, 255, 255, 0.14)",
                pointerEvents: "none",
              }}
            />
          )}
          <img
            src={src}
            alt={`${current.category} - ${city}`}
            draggable={false}
            referrerPolicy="no-referrer"
            onLoad={() => setLoaded(true)}
            onError={() => setLoaded(true)}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
              display: "block",
              opacity: loaded ? 1 : 0,
              transition: "opacity 0.3s ease",
              pointerEvents: "none",
            }}
          />
        </Box>
      </Box>
    );
  };

  const renderCaptionColumn = (side: 1 | 2) => {
    if (!current) return null;
    const city = side === 1 ? current.city1 : current.city2;
    const country = side === 1 ? current.country1 : current.country2;
    const description = side === 1 ? current.description1 : current.description2;
    return (
      <Box sx={{ flex: 1, minWidth: 0 }}>
        <Typography noWrap variant="subtitle2" sx={{ color: "common.white", fontWeight: 700 }}>
          {city}, {country}
        </Typography>
        <Box sx={{ maxHeight: 84, overflowY: "auto", mt: 0.25 }}>
          <Typography variant="body2" sx={{ color: "rgba(255, 255, 255, 0.72)" }}>
            {description || "Sin descripción"}
          </Typography>
        </Box>
      </Box>
    );
  };

  const renderColumns = () => (
    <Box
      sx={{
        position: "absolute",
        inset: 0,
        display: "flex",
        gap: 2,
        px: 2,
        pt: "64px",
        pb: "128px",
      }}
    >
      {renderColumn(1)}
      {renderColumn(2)}
    </Box>
  );

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="compare-viewer-title">
      <Box
        role="dialog"
        aria-modal="true"
        sx={{
          position: "fixed",
          inset: 0,
          bgcolor: "common.black",
          display: "flex",
          flexDirection: "column",
          outline: "none",
          overflow: "hidden",
        }}
      >
        <Box
          ref={areaRef}
          {...bind()}
          onDoubleClick={handleDoubleClick}
          sx={{
            position: "relative",
            flex: 1,
            minHeight: 0,
            overflow: "hidden",
            touchAction: "none",
            userSelect: "none",
            WebkitUserSelect: "none",
            WebkitTouchCallout: "none",
            WebkitTapHighlightColor: "transparent",
          }}
        >
          <Box
            ref={contentRef}
            style={{ transformOrigin: "0 0", willChange: "transform" }}
            sx={{ position: "absolute", inset: 0 }}
          >
            {current && (isMobile ? renderSlider() : renderColumns())}
          </Box>
        </Box>

        {current && (
          <React.Fragment>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                zIndex: 20,
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 1,
                py: 1,
                pt: "calc(8px + env(safe-area-inset-top))",
                background:
                  "linear-gradient(to bottom, rgba(0, 0, 0, 0.65), transparent)",
              }}
            >
              <Typography
                id="compare-viewer-title"
                variant="subtitle1"
                noWrap
                sx={{
                  color: "common.white",
                  fontWeight: 700,
                  textTransform: "capitalize",
                  flex: 1,
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
                }}
              >
                {current.category}
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: "rgba(255, 255, 255, 0.85)",
                  textShadow: "0 1px 3px rgba(0, 0, 0, 0.6)",
                }}
              >
                {index + 1} / {images.length}
              </Typography>
              <IconButton onClick={onClose} aria-label="Cerrar" sx={overlayControlSx}>
                <CloseIcon />
              </IconButton>
            </Box>

            <IconButton
              onClick={goPrev}
              disabled={!canNavigate}
              aria-label="Anterior"
              sx={{
                ...overlayControlSx,
                position: "absolute",
                left: { xs: 4, sm: 14 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                p: { xs: 1.25, sm: 1.5 },
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
            </IconButton>
            <IconButton
              onClick={goNext}
              disabled={!canNavigate}
              aria-label="Siguiente"
              sx={{
                ...overlayControlSx,
                position: "absolute",
                right: { xs: 4, sm: 14 },
                top: "50%",
                transform: "translateY(-50%)",
                zIndex: 20,
                p: { xs: 1.25, sm: 1.5 },
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: { xs: 18, sm: 24 } }} />
            </IconButton>

            {isMobile ? (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 20,
                  bgcolor: "rgba(0, 0, 0, 0.62)",
                  backdropFilter: "blur(6px)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                }}
              >
                <Box
                  onClick={() => setExpanded((value) => !value)}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    px: 1.5,
                    py: 0.75,
                    cursor: "pointer",
                    pb: "calc(6px + env(safe-area-inset-bottom))",
                  }}
                >
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ color: "common.white", fontWeight: 700, flex: 1 }}
                  >
                    {current.city1} · {current.country1}
                  </Typography>
                  <IconButton
                    size="small"
                    aria-label={
                      expanded ? "Ocultar descripciones" : "Mostrar descripciones"
                    }
                    sx={{ color: "rgba(255, 255, 255, 0.8)", p: 0.5 }}
                  >
                    {expanded ? <KeyboardArrowDownIcon /> : <KeyboardArrowUpIcon />}
                  </IconButton>
                  <Typography
                    variant="body2"
                    noWrap
                    sx={{ color: "common.white", fontWeight: 700, flex: 1, textAlign: "right" }}
                  >
                    {current.city2} · {current.country2}
                  </Typography>
                </Box>
                {expanded && (
                  <Box
                    sx={{
                      display: "flex",
                      gap: 1.5,
                      px: 1.5,
                      pb: "calc(10px + env(safe-area-inset-bottom))",
                    }}
                  >
                    <Box sx={{ flex: 1, minWidth: 0, maxHeight: "24vh", overflowY: "auto" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5, display: "block" }}
                      >
                        {current.description1 || "Sin descripción"}
                      </Typography>
                    </Box>
                    <Box sx={{ flex: 1, minWidth: 0, maxHeight: "24vh", overflowY: "auto" }}>
                      <Typography
                        variant="caption"
                        sx={{ color: "rgba(255, 255, 255, 0.75)", lineHeight: 1.5, display: "block" }}
                      >
                        {current.description2 || "Sin descripción"}
                      </Typography>
                    </Box>
                  </Box>
                )}
              </Box>
            ) : (
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  bottom: 0,
                  zIndex: 20,
                  bgcolor: "rgba(0, 0, 0, 0.62)",
                  backdropFilter: "blur(6px)",
                  borderTop: "1px solid rgba(255, 255, 255, 0.08)",
                  display: "flex",
                  gap: 3,
                  px: 2.5,
                  py: 1.5,
                }}
              >
                {renderCaptionColumn(1)}
                {renderCaptionColumn(2)}
              </Box>
            )}
          </React.Fragment>
        )}
      </Box>
    </Modal>
  );
};

export default PanZoomModal;
