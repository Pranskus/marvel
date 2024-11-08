import React, { useState, useEffect } from "react";
import { Box, Typography, Grid, IconButton, Skeleton } from "@mui/material";
import { styled } from "@mui/material/styles";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import YouTubeIcon from "@mui/icons-material/YouTube";
import MenuIcon from "@mui/icons-material/Menu";
import { getMarvelPhaseOneMovies } from "../utils/tmdbApi";
import MovieDetail from "./MovieDetail";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

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
  alignItems: "flex-start",
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
  minWidth: "40px",
  marginRight: "10px",
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

const BigYearDisplay = styled(Box)({
  position: "absolute",
  left: "0",
  right: "0",
  display: "flex",
  pointerEvents: "none",
  fontWeight: "bold",
  transition: "all 0.3s ease",
  zIndex: 2,
  fontSize: "60px",
  transform: "translateY(-30%)",
  justifyContent: "center",
});

const YearItem = styled(Box)({
  position: "relative",
  display: "flex",
  alignItems: "center",
  pointerEvents: "auto",
  width: "100px",
  cursor: "pointer",
  justifyContent: "flex-start",
  paddingLeft: "0px",
  marginLeft: "-10px",
  paddingRight: "40px",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.02)",
  },
});

const StyledMenu = styled(Menu)({
  "& .MuiPaper-root": {
    backgroundColor: "#fff",
    width: "300px",
    maxHeight: "80vh",
    borderRadius: "8px",
    boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
  },
});

const StyledMenuItem = styled(MenuItem)({
  padding: "12px 24px",
  "&:hover": {
    backgroundColor: "rgba(226, 54, 54, 0.08)",
  },
});

const YearHeader = styled(Typography)({
  padding: "16px 24px",
  color: "#e23636",
  fontWeight: "bold",
  fontSize: "18px",
});

const MarvelTimeline = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(2008);
  const [hoveredYear, setHoveredYear] = useState(null);
  const [hoveredYearPosition, setHoveredYearPosition] = useState(0);
  const [selectedYearPosition, setSelectedYearPosition] = useState(0);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [menuAnchor, setMenuAnchor] = useState(null);
  const [menuMovies, setMenuMovies] = useState({});

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

  useEffect(() => {
    const fetchAllMovies = async () => {
      const allMovies = {};
      for (const year of timelineYears) {
        try {
          const movies = await getMarvelPhaseOneMovies(year);
          allMovies[year] = movies;
        } catch (error) {
          console.error(`Error fetching movies for ${year}:`, error);
        }
      }
      setMenuMovies(allMovies);
    };

    fetchAllMovies();
  }, []);

  const timelineYears = [
    2008, 2010, 2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2021,
    2022, 2023,
  ];

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMovieSelect = (movie, year) => {
    setSelectedYear(year);
    setSelectedMovie(movie);
    handleMenuClose();
  };

  return (
    <Container container>
      {/* Left Section */}
      <LeftSection item xs={5}>
        <MenuButton onClick={handleMenuOpen}>
          <MenuIcon />
        </MenuButton>

        <StyledMenu
          anchorEl={menuAnchor}
          open={Boolean(menuAnchor)}
          onClose={handleMenuClose}
          anchorOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
        >
          {timelineYears.map((year) => (
            <React.Fragment key={year}>
              <YearHeader>
                {year} - Phase{" "}
                {year <= 2012
                  ? "I"
                  : year <= 2015
                    ? "II"
                    : year <= 2019
                      ? "III"
                      : "IV"}
              </YearHeader>
              {menuMovies[year]?.map((movie) => (
                <StyledMenuItem
                  key={movie.id}
                  onClick={() => handleMovieSelect(movie, year)}
                >
                  <ListItemText
                    primary={movie.title}
                    primaryTypographyProps={{
                      style: {
                        fontWeight: "500",
                        fontSize: "15px",
                      },
                    }}
                  />
                </StyledMenuItem>
              ))}
              {year !== timelineYears[timelineYears.length - 1] && <Divider />}
            </React.Fragment>
          ))}
        </StyledMenu>

        <Box
          sx={{
            textAlign: "left",
            maxWidth: "400px",
            marginLeft: "60px",
          }}
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            alt="Marvel Logo"
            style={{ width: "300px", marginBottom: "30px", display: "block" }}
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
              textAlign: "left",
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
            left: "40px",
          }}
        >
          For MARVEL fans
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
              display: "flex",
              alignItems: "center",
              lineHeight: 0.8,
            }}
          >
            <Box
              sx={{
                backgroundColor: "#000",
                padding: "0 10px",
                display: "flex",
                alignItems: "center",
                marginLeft: "-90px",
              }}
            >
              <Box
                sx={{
                  color: "#e23636",
                  display: "flex",
                  alignItems: "center",
                  lineHeight: "0.5",
                  position: "relative",
                  zIndex: 3,
                  letterSpacing: "0.1em",
                }}
              >
                20
              </Box>
            </Box>
            <Box
              sx={{
                color: "#fff",
                display: "flex",
                alignItems: "center",
                lineHeight: "0.5",
                position: "relative",
                zIndex: 2,
                width: "fit-content",
                marginLeft: "-8px",
              }}
            >
              {hoveredYear
                ? String(hoveredYear).slice(-2)
                : String(selectedYear).slice(-2)}
            </Box>
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
                    paddingLeft: "10px",
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
                  onClick={() => setSelectedMovie(movie)}
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

      {/* Add MovieDetail component */}
      {selectedMovie && (
        <MovieDetail
          movie={selectedMovie}
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </Container>
  );
};

export default MarvelTimeline;
