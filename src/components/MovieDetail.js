import React, { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { styled } from "@mui/material/styles";
import CloseIcon from "@mui/icons-material/Close";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  getMovieDetails,
  getMovieCredits,
  getMovieVideos,
} from "../utils/tmdbApi";

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
  justifyContent: "center",
  height: "100%",
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
  height: "105%",
  objectFit: "cover",
  objectPosition: "top",
  transition: "all 1.5s ease-out",
  transform: isOpen ? "translateX(0) scale(1.05)" : "translateX(100%) scale(1)",
  transformOrigin: "center top",
  animation: isOpen ? "parallaxScroll 25s ease-out infinite alternate" : "none",
  "@keyframes parallaxScroll": {
    "0%": {
      objectPosition: "center 0%",
      transform: "translateX(0) scale(1)",
    },
    "100%": {
      objectPosition: "center 10%",
      transform: "translateX(0) scale(1.2)",
    },
  },
  "&:hover": {
    transform: isOpen ? "translateX(0) scale(1.12)" : "translateX(100%)",
    transition: "all 0.6s ease-out",
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

const formatCurrency = (amount) => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const MovieDetail = ({ movie, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const [details, credits, videos] = await Promise.all([
          getMovieDetails(movie.id),
          getMovieCredits(movie.id),
          getMovieVideos(movie.id),
        ]);

        setMovieDetails(details);
        setMovieCredits(credits);

        // Find the official trailer or first video
        const trailerVideo =
          videos.results.find(
            (video) =>
              video.type === "Trailer" &&
              video.site === "YouTube" &&
              video.official
          ) || videos.results[0];

        setTrailer(trailerVideo);
      } catch (error) {
        console.error("Error fetching movie data:", error);
      }
    };

    fetchMovieData();
  }, [movie.id]);

  // Helper function to get crew members by department
  const getCrewByJob = (job) => {
    if (!movieCredits?.crew) return "Loading...";
    return (
      movieCredits.crew
        .filter((person) => person.job === job)
        .map((person) => person.name)
        .join(", ") || "N/A"
    );
  };

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

  const handleTrailerClick = () => {
    if (trailer) {
      window.open(`https://www.youtube.com/watch?v=${trailer.key}`, "_blank");
    }
  };

  return (
    <Container isOpen={isOpen}>
      <LeftSection isOpen={isOpen}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            maxHeight: "80vh",
            justifyContent: "center",
          }}
        >
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
              mb: 4,
              opacity: isOpen ? 1 : 0,
              transform: `translateY(${isOpen ? "0" : "20px"})`,
              transition: "all 0.6s ease-in-out",
              transitionDelay: "0.6s",
            }}
          >
            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", textTransform: "uppercase" }}
              >
                USER SCORE
              </Typography>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: "bold",
                  color:
                    movieDetails?.vote_average >= 7 ? "#4CAF50" : "#FFC107",
                }}
              >
                {movieDetails
                  ? `${Math.round(movieDetails.vote_average * 10)}%`
                  : "Loading..."}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", textTransform: "uppercase" }}
              >
                DIRECTOR
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {getCrewByJob("Director")}
              </Typography>
            </Box>

            <Box sx={{ mb: 2 }}>
              <Typography
                variant="caption"
                sx={{ color: "#999", textTransform: "uppercase" }}
              >
                SCREENPLAY
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {getCrewByJob("Screenplay")}
              </Typography>
            </Box>

            <Box>
              <Typography
                variant="caption"
                sx={{ color: "#999", textTransform: "uppercase" }}
              >
                BOX OFFICE
              </Typography>
              <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                {movieDetails
                  ? formatCurrency(movieDetails.revenue)
                  : "Loading..."}
              </Typography>
            </Box>
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
            Enjoy your Marvel movie experience!
          </Typography>
        </Box>
      </LeftSection>

      <RightSection isOpen={isOpen}>
        <MovieImage
          src={movie.backdrop_path || movie.poster_path}
          alt={movie.title}
          isOpen={isOpen}
        />
        <TrailerButton
          onClick={handleTrailerClick}
          sx={{
            opacity: isOpen ? 1 : 0,
            transform: `translate(${isOpen ? "0, 0" : "100%, 0"})`,
            transition: "all 0.6s ease-in-out",
            transitionDelay: isOpen ? "0.4s" : "0s",
            cursor: trailer ? "pointer" : "not-allowed",
            backgroundColor: trailer ? "#e23636" : "#999",
          }}
        >
          {trailer ? (
            <>
              Watch trailer <PlayArrowIcon />
            </>
          ) : (
            "No trailer available"
          )}
        </TrailerButton>
      </RightSection>
    </Container>
  );
};

export default MovieDetail;
