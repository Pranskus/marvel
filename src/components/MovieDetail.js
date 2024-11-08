import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

const Container = styled(Box)(({ isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "#fff",
  display: "flex",
  zIndex: 1000,
  opacity: isOpen ? 1 : 0,
  transition: "opacity 0.4s ease-in-out",
  visibility: isOpen ? "visible" : "hidden",
}));

const LeftSection = styled(Box)(({ isOpen }) => ({
  width: "43%",
  padding: "40px",
  display: "flex",
  flexDirection: "column",
  position: "relative",
  opacity: isOpen ? 1 : 0,
  transform: `translateX(${isOpen ? "0" : "-100%"})`,
  transition: "all 0.6s ease-in-out",
  transitionDelay: isOpen ? "0.2s" : "0s",
}));

const RightSection = styled(Box)(({ isOpen }) => ({
  width: "60%",
  position: "relative",
  overflow: "hidden",
  opacity: isOpen ? 1 : 0,
  transform: `translateX(${isOpen ? "0" : "100%"})`,
  transition: "all 0.6s ease-in-out",
  transitionDelay: isOpen ? "0.2s" : "0s",
  backgroundColor: "#000",
  padding: 0,
}));

const MovieImage = styled("img")(({ isOpen }) => ({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  objectPosition: "top",
  transition: "all 0.6s ease-in-out",
  transform: isOpen ? "translateX(0)" : "translateX(100%)",
  "&:hover": {
    transform: isOpen ? "scale(1.05)" : "translateX(100%)",
  },
}));

const TrailerButton = styled(Box)({
  position: "absolute",
  bottom: "40px",
  right: "40px",
  backgroundColor: "#e23636",
  color: "#fff",
  padding: "12px 24px",
  borderRadius: "4px",
  display: "flex",
  alignItems: "center",
  gap: "8px",
  cursor: "pointer",
  transform: "translateY(0)",
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    backgroundColor: "#c62828",
    transform: "translateY(-3px)",
    boxShadow: "0 4px 12px rgba(226, 54, 54, 0.3)",
  },
});

const CloseButton = styled(IconButton)(({ isOpen }) => ({
  opacity: isOpen ? 1 : 0,
  transform: `rotate(${isOpen ? "0" : "90deg"})`,
  transition: "all 0.3s ease-in-out",
  "&:hover": {
    transform: "rotate(90deg)",
  },
}));

const MovieDetail = ({ movie, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => {
      setIsOpen(true);
    });
    return () => setIsOpen(false);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    setTimeout(onClose, 600);
  };

  return (
    <Container isOpen={isOpen}>
      <LeftSection isOpen={isOpen}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            mb: 4,
            opacity: isOpen ? 1 : 0,
            transform: `translateY(${isOpen ? "0" : "-20px"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: "0.4s",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            alt="Marvel Logo"
            style={{ width: "120px" }}
          />
          <CloseButton onClick={handleClose} isOpen={isOpen}>
            <CloseIcon />
          </CloseButton>
        </Box>

        <Typography
          variant="h3"
          sx={{
            mb: 3,
            fontWeight: "bold",
            opacity: isOpen ? 1 : 0,
            transform: `translateY(${isOpen ? "0" : "20px"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: "0.5s",
          }}
        >
          {movie.title}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            mb: 4,
            color: "#666",
            lineHeight: 1.6,
            opacity: isOpen ? 1 : 0,
            transform: `translateY(${isOpen ? "0" : "20px"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: "0.6s",
          }}
        >
          {movie.overview}
        </Typography>

        <Box
          sx={{
            mt: "auto",
            opacity: isOpen ? 1 : 0,
            transform: `translateY(${isOpen ? "0" : "20px"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: "0.7s",
          }}
        >
          <Typography
            variant="caption"
            sx={{ color: "#999", textTransform: "uppercase" }}
          >
            RELEASE DATE
          </Typography>
          <Typography variant="h6" sx={{ fontWeight: "bold" }}>
            {new Date(movie.release_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </Typography>
        </Box>

        <Typography
          sx={{
            mt: 4,
            color: "#999",
            opacity: isOpen ? 1 : 0,
            transition: "opacity 0.6s ease-in-out",
            transitionDelay: "0.8s",
          }}
        >
          ©2018 MARVEL
        </Typography>
      </LeftSection>

      <RightSection isOpen={isOpen}>
        <MovieImage
          src={movie.backdrop_path || movie.poster_path}
          alt={movie.title}
          isOpen={isOpen}
        />
        <TrailerButton
          sx={{
            opacity: isOpen ? 1 : 0,
            transform: `translate(${isOpen ? "0, 0" : "100%, 0"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: isOpen ? "0.4s" : "0s",
          }}
        >
          Watch trailer <PlayArrowIcon />
        </TrailerButton>
      </RightSection>
    </Container>
  );
};

export default MovieDetail;
