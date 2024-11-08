import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { getMarvelPhaseOneMovies } from "../utils/tmdbApi";

const Container = styled(Grid)({
  height: "100vh",
  margin: 0,
  padding: 0,
  display: "flex",
  overflow: "hidden",
});

const LeftSection = styled(Grid)({
  backgroundColor: "#fff",
  padding: "40px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
  overflow: "hidden",
});

const MenuButton = styled(IconButton)({
  position: "absolute",
  top: "20px",
  left: "20px",
});

const RightSection = styled(Grid)({
  backgroundColor: "#000",
  padding: "40px",
  display: "flex",
  flexDirection: "row",
  gap: "40px",
  width: "60%",
  height: "100vh",
  overflow: "hidden",
});

const YearsList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "90vh",
  color: "#333",
  minWidth: "100px",
  marginRight: "100px",
  position: "relative",
});

const YearsContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
  height: "100%",

  pointerEvents: "none",
});

const MoviePosters = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "40px",
  maxHeight: "calc(100vh - 200px)",
  borderRadius: "8px",
  overflowY: "auto",
  paddingRight: "10px",
  "&::-webkit-scrollbar": {
    width: "0",
    display: "none",
  },
  msOverflowStyle: "none",
  scrollbarWidth: "none",
});

const MoviePoster = styled("img")({
  width: "100%",
  height: "auto",
  borderRadius: "8px",
  transition: "transform 0.3s ease",
  objectFit: "cover",
  "&:hover": {
    transform: "scale(1.05)",
  },
});

const LoadingPoster = styled(Skeleton)({
  width: "100%",
  height: "300px",
  borderRadius: "8px",
});

const SocialIcons = styled(Box)({
  position: "absolute",
  left: "20px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const BigYearDisplay = styled(Box)({
  position: "absolute",
  left: "0",
  right: "0",
  display: "flex",
  pointerEvents: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  zIndex: 2,
  fontSize: "100px",
  transform: "translateY(-42%)",
  justifyContent: "center",
});

const YearItem = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  pointerEvents: "auto",
  width: "100px",
  cursor: "pointer",
  justifyContent: "center",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
});

const MarvelTimeline = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2008);
  const [hoveredYear, setHoveredYear] = useState(null);
  const [hoveredYearPosition, setHoveredYearPosition] = useState(0);
  const [selectedYearPosition, setSelectedYearPosition] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const movieData = await getMarvelPhaseOneMovies(selectedYear);
        setMovies(movieData);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedYear]);

  const timelineYears = [
    2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021,
    2022, 2023,
  ];

  return (
    <Container container>
      {/* Left Section */}
      <LeftSection item xs={5}>
        <MenuButton>
          <MenuIcon />
        </MenuButton>

        <SocialIcons>
          <IconButton color="black">
            <FacebookIcon />
          </IconButton>
          <IconButton color="black">
            <TwitterIcon />
          </IconButton>
          <IconButton color="black">
            <InstagramIcon />
          </IconButton>
          <IconButton color="black">
            <YouTubeIcon />
          </IconButton>
        </SocialIcons>

        <Box
          sx={{
            textAlign: "center",
            maxWidth: "400px",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            alt="Marvel Logo"
            style={{ width: "300px", marginBottom: "30px" }}
          />
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              lineHeight: 1.4,
              fontSize: "18px",
              fontWeight: "bold",
            }}
          >
            How to watch every Marvel Cinematic Universe film in the perfect
            order
          </Typography>
        </Box>

        <Typography
          variant="caption"
          color="textSecondary"
          sx={{
            position: "absolute",
            bottom: "40px",
          }}
        >
          ©2018 MARVEL
        </Typography>
      </LeftSection>

      {/* Right Section */}
      <RightSection item xs={7}>
        <BigYearDisplay
          sx={{
            top: hoveredYear ? hoveredYearPosition : selectedYearPosition,
          }}
        >
          <Box
            sx={{
              color: "#e23636",
              marginRight: "-8px",
              display: "flex",
              alignItems: "center",
            }}
          >
            20
          </Box>
          <Box
            sx={{
              color: "#fff",
              display: "flex",
              alignItems: "center",
            }}
          >
            {hoveredYear
              ? String(hoveredYear).slice(-2)
              : String(selectedYear).slice(-2)}
          </Box>
        </BigYearDisplay>

        <YearsList
          onMouseLeave={() => {
            setHoveredYear(null);
          }}
        >
          <YearsContainer>
            {timelineYears.map((year) => (
              <YearItem
                key={year}
                onClick={(e) => {
                  setSelectedYear(year);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setSelectedYearPosition(rect.top);
                }}
                onMouseEnter={(e) => {
                  setHoveredYear(year);
                  const rect = e.currentTarget.getBoundingClientRect();
                  setHoveredYearPosition(rect.top);
                }}
                ref={(node) => {
                  if (node && year === selectedYear) {
                    const rect = node.getBoundingClientRect();
                    setSelectedYearPosition(rect.top);
                  }
                }}
              >
                <Typography
                  sx={{
                    color: selectedYear === year ? "#e23636" : "#666",
                    fontWeight: "bold",
                    fontSize: "20px",
                    transition: "all 0.3s ease",
                    fontFamily: "'Helvetica', sans-serif",
                    lineHeight: 1,
                    position: "relative",
                    zIndex: 1,
                    pointerEvents: "none",
                    opacity: hoveredYear === year ? 0 : 1,
                  }}
                >
                  {String(year).slice(-2)}
                </Typography>
              </YearItem>
            ))}
          </YearsContainer>
        </YearsList>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
            padding: "10px 0",
            gap: "40px",
          }}
        >
          <Typography
            variant="h2"
            sx={{
              color: "#fff",
              fontWeight: "bold",
              textAlign: "center",
              fontSize: "36px",
              margin: "0 0 40px 0",
              flexShrink: 0,
            }}
          >
            {selectedYear <= 2012
              ? "PHASE I"
              : selectedYear <= 2015
                ? "PHASE II"
                : selectedYear <= 2019
                  ? "PHASE III"
                  : "PHASE IV"}
          </Typography>

          <MoviePosters>
            {loading ? (
              <>
                <LoadingPoster variant="rectangular" animation="wave" />
                <LoadingPoster variant="rectangular" animation="wave" />
              </>
            ) : (
              movies.map((movie) => (
                <MoviePoster
                  key={movie.id}
                  src={movie.poster_path}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.src =
                      "https://via.placeholder.com/280x420?text=No+Poster";
                    console.log(`Failed to load poster for ${movie.title}`);
                  }}
                />
              ))
            )}
          </MoviePosters>
        </Box>
      </RightSection>
    </Container>
  );
};

export default MarvelTimeline;
