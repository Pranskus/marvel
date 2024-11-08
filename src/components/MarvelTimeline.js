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
  height: "100%",
  margin: 0,
  padding: 0,
  display: "flex",
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
});

const YearsList = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "5px",
  color: "#333",
  minWidth: "20px",
  marginRight: "100px",
});

const MoviePosters = styled(Box)({
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "40px",
  maxHeight: "calc(120vh - 200px)",
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
  width: "80%",
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
  left: "40px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const MarvelTimeline = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2008);

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
          <IconButton color="primary">
            <FacebookIcon />
          </IconButton>
          <IconButton color="primary">
            <TwitterIcon />
          </IconButton>
          <IconButton color="primary">
            <InstagramIcon />
          </IconButton>
          <IconButton color="primary">
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
            style={{ width: "200px", marginBottom: "30px" }}
          />
          <Typography
            variant="h6"
            color="textSecondary"
            sx={{
              textTransform: "uppercase",
              letterSpacing: "1px",
              lineHeight: 1.4,
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
        <YearsList>
          {timelineYears.map((year) => (
            <Typography
              key={year}
              onClick={() => setSelectedYear(year)}
              sx={{
                color: selectedYear === year ? "#e23636" : "#666",
                fontWeight: "bold",
                fontSize: "24px",
                cursor: "pointer",
                transition: "color 0.3s ease",
                "&:hover": {
                  color: "#e23636",
                },
                fontFamily: "'Helvetica', sans-serif",
              }}
            >
              {String(year).slice(-2)}
            </Typography>
          ))}
        </YearsList>

        <Box
          sx={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            overflow: "hidden",
          }}
        >
          <Typography
            variant="h2"
            style={{
              color: "#fff",
              fontWeight: "bold",
              marginBottom: "40px",
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
