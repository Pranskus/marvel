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
import YouTube from "react-youtube";

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

  "@media (max-width: 1100px)": {
    flexDirection: "column",
    overflowY: "auto",
    height: "auto",
    minHeight: "100%",
  },
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
  height: "100vh",
  overflow: "auto",
  scrollbarWidth: "thin",
  "&::-webkit-scrollbar": {
    width: "8px",
  },
  "&::-webkit-scrollbar-track": {
    background: "#f1f1f1",
  },
  "&::-webkit-scrollbar-thumb": {
    background: "#888",
    borderRadius: "4px",
  },
  "&::-webkit-scrollbar-thumb:hover": {
    background: "#555",
  },

  "@media (max-width: 1100px)": {
    width: "100%",
    order: 2,
    padding: "40px 20px 40px",
    height: "auto",
    minHeight: "50vh",
    backgroundColor: "#fff",
    position: "relative",
    zIndex: 1,
    marginTop: "-20px",
    borderRadius: "40px 40px 0 0",
    overflow: "visible",
  },
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

  "@media (max-width: 1100px)": {
    width: "100%",
    order: 1,
    height: "70vh",
    minHeight: "300px",
    maxHeight: "400px",
    position: "relative",
    zIndex: 2,
    transition: "all 0.5s ease-in-out",
    transitionDelay: "0.4s",
  },
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

  "@media (max-width: 1100px)": {
    height: "100%",
    width: "100%",
    objectPosition: "center 20%",
    animation: "none",
    transition: "all 0.5s ease-out",
    transform: isOpen ? "translateX(0) scale(1)" : "translateX(100%) scale(1)",
    "&:hover": {
      transform: "none",
    },
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

  "@media (max-width: 1100px)": {
    bottom: "20px",
    right: "20px",
    padding: "8px 16px",
    fontSize: "14px",
  },
});

const CloseButton = styled(IconButton)(({ isOpen }) => ({
  position: "fixed",
  right: "40px",
  top: "40px",
  width: "40px",
  height: "40px",
  padding: 0,
  minWidth: "40px",
  minHeight: "40px",
  borderRadius: "4px",
  zIndex: 1200,
  backgroundColor: "#e23636",
  color: "#fff",
  opacity: isOpen ? 1 : 0,
  transform: `translate(${isOpen ? "0, 0" : "100%, 0"})`,
  transition: "all 0.6s ease-in-out",
  transitionDelay: isOpen ? "0.4s" : "0s",
  "&:hover": {
    backgroundColor: "#c62828",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "20px",
  },

  "@media (max-width: 1100px)": {
    right: "20px",
    top: "20px",
    width: "36px",
    height: "36px",
    minWidth: "36px",
    minHeight: "36px",
    "& .MuiSvgIcon-root": {
      fontSize: "18px",
    },
  },
}));

const YoutubeContainer = styled(Box)(({ isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  display: isOpen ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1100,

  "@media (max-width: 1100px)": {
    padding: "0 20px",
  },
}));

const TrailerCloseButton = styled(IconButton)({
  position: "absolute",
  top: "40px",
  right: "40px",
  color: "#fff",
  backgroundColor: "rgba(255, 255, 255, 0.1)",
  padding: "12px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "32px",
  },
});

const PlayerWrapper = styled(Box)({
  position: "relative",
  width: "80%",
  height: "80%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

const formatCurrency = (amount) => {
  if (!amount) return "N/A";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(amount);
};

const PosterContainer = styled(Box)(({ isOpen }) => ({
  position: "fixed",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.95)",
  display: isOpen ? "flex" : "none",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 1300,
  cursor: "pointer",
}));

const FullscreenPoster = styled("img")({
  maxWidth: "95vw",
  maxHeight: "95vh",
  objectFit: "contain",
  cursor: "default",
});

const MovieDetail = ({ movie, onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [movieDetails, setMovieDetails] = useState(null);
  const [movieCredits, setMovieCredits] = useState(null);
  const [trailer, setTrailer] = useState(null);
  const [showTrailer, setShowTrailer] = useState(false);
  const [player, setPlayer] = useState(null);
  const [showFullPoster, setShowFullPoster] = useState(false);

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
      setShowTrailer(true);
    }
  };

  const handleCloseTrailer = () => {
    if (player) {
      player.stopVideo(); // Stop the video when closing
    }
    setShowTrailer(false);
  };

  const handleBackdropClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseTrailer();
    }
  };

  const onReady = (event) => {
    setPlayer(event.target);
  };

  const handlePosterClick = (e) => {
    e.stopPropagation();
    setShowFullPoster(true);
  };

  const handleClosePoster = () => {
    setShowFullPoster(false);
  };

  return (
    <>
      <Container isOpen={isOpen}>
        <CloseButton onClick={handleClose} isOpen={isOpen}>
          <CloseIcon />
        </CloseButton>
        <LeftSection isOpen={isOpen}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              paddingTop: "40px",
              paddingBottom: "40px",
              height: "auto",
              "@media (max-width: 1100px)": {
                paddingTop: "10px",
                "& .marvel-logo": {
                  marginBottom: "60px",
                },
                "& .movie-title": {
                  marginTop: "10px",
                },
              },
            }}
          >
            <Box
              className="marvel-logo"
              sx={{
                display: "flex",
                justifyContent: "flex-start",
                mb: 4,
                opacity: isOpen ? 1 : 0,
                transform: `translateY(${isOpen ? "0" : "-20px"})`,
                transition: "all 0.6s ease-in-out",
                transitionDelay: "0.4s",
                "@media (max-width: 1100px)": {
                  display: "none",
                },
              }}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
                alt="Marvel Logo"
                style={{ width: "120px" }}
              />
            </Box>

            <Typography
              className="movie-title"
              variant="h3"
              sx={{
                mb: 3,
                fontWeight: "bold",
                opacity: isOpen ? 1 : 0,
                transform: `translateY(${isOpen ? "0" : "20px"})`,
                transition: "all 0.6s ease-in-out",
                transitionDelay: "0.5s",
                "@media (max-width: 1100px)": {
                  fontSize: "24px",
                  mb: 2,
                },
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
            onClick={handlePosterClick}
            sx={{ cursor: "pointer" }}
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

      <PosterContainer isOpen={showFullPoster} onClick={handleClosePoster}>
        <CloseButton
          onClick={handleClosePoster}
          isOpen={showFullPoster}
          sx={{
            position: "absolute",
            top: "40px",
            right: "40px",
            transform: "none",
            opacity: 1,
          }}
        >
          <CloseIcon />
        </CloseButton>
        <FullscreenPoster
          src={movie.backdrop_path || movie.poster_path}
          alt={movie.title}
          onClick={(e) => e.stopPropagation()}
        />
      </PosterContainer>

      <YoutubeContainer isOpen={showTrailer} onClick={handleBackdropClick}>
        <TrailerCloseButton onClick={handleCloseTrailer}>
          <CloseIcon />
        </TrailerCloseButton>
        {trailer && (
          <PlayerWrapper>
            <YouTube
              videoId={trailer.key}
              opts={{
                width: "100%",
                height: "100%",
                playerVars: {
                  autoplay: 0, // Changed to 0 to prevent autoplay
                  modestbranding: 1,
                  rel: 0,
                  controls: 1,
                },
              }}
              onReady={onReady}
              style={{ width: "100%", height: "100%" }}
            />
          </PlayerWrapper>
        )}
      </YoutubeContainer>
    </>
  );
};

export default MovieDetail;
