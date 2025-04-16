import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

const Content2 = () => {
  return (
    <Box
      sx={{
        backgroundColor: "#043873",
        backgroundSize: "cover",
        position: "relative",
        overflow: "hidden",
        py: 8,
        height: "400px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          opacity: 0.1,
          zIndex: 1,
        }}
      />

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 2,
          textAlign: "center",
          fontFamily: "Inter",
        }}
      >
        <Box sx={{ maxWidth: 800, mx: "auto" }}>
          <Typography
            variant="h2"
            component="h1"
            sx={{
              fontWeight: 700,
              color: "white",
              mb: 3,
              fontSize: { xs: "2rem", md: "3.5rem" },
              textAlign: "center",
            }}
          >
            Your work, everywhere you are
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: "rgba(255, 255, 255, 0.9)",
              mb: 4,
              fontSize: { xs: "0.9rem", md: "1.1rem" },
              lineHeight: 1.6,
              maxWidth: "90%",
              mx: "auto",
              textAlign: "center",
            }}
          >
            Access your notes from your computer, phone or tablet by
            synchronising with various services, including whitepace, Dropbox
            and OneDrive. The app is available on Windows, macOS, Linux, Android
            and iOS. A terminal app is also available!
          </Typography>
          <Button
            variant="contained"
            endIcon={<ArrowForwardIcon />}
            sx={{
              backgroundColor: "#4d9bf0",
              "&:hover": {
                backgroundColor: "#3d8be0",
              },
              px: 3,
              py: 1.2,
              borderRadius: 2,
              textTransform: "none",
              fontWeight: 500,
            }}
          >
            Try Taskey
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Content2;
