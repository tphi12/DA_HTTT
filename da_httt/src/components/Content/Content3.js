import React, { useState } from "react";
import {
  Box,
  Typography,
  Container,
  Paper,
  Avatar,
  IconButton,
  Rating,
} from "@mui/material";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const Content3 = () => {
  const [activeIndex, setActiveIndex] = useState(1);

  const testimonials = [
    {
      id: 1,
      text: '"This app saves me so much time on inventory tasks. I just snap a photo, and it accurately counts the materials in seconds. Really helpful for construction site management."',
      name: "Bucky",
      position: "Actor, Marvel Studio",
      rating: 5,
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Jocelyn",
      backgroundColor: "#4d9bf0",
    },
    {
      id: 2,
      text: '"The detection accuracy is impressive, even in low lighting conditions. I used to manually count components in my warehouse—now I rely on this app daily."',
      name: "Chu Chan",
      position: "Founder, Cute Company",
      rating: 5,
      avatar: "https://api.dicebear.com/9.x/dylan/svg?seed=Jack",
      backgroundColor: "#4d9bf0",
    },
    {
      id: 3,
      text: '"Sometimes the app struggles with overlapping items, but overall it\'s a game-changer for tracking and organizing materials visually."',
      name: "Phi Hoang",
      position: "Founder, Counttp Company",
      rating: 5,
      avatar: "https://api.dicebear.com/9.x/adventurer/svg?seed=Liam",
      backgroundColor: "#4d9bf0",
    },
  ];

  const handlePrev = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const getVisibleTestimonials = () => {
    if (testimonials.length <= 3) {
      return testimonials;
    }

    const result = [
      testimonials[
        (activeIndex - 1 + testimonials.length) % testimonials.length
      ],
      testimonials[activeIndex],
      testimonials[(activeIndex + 1) % testimonials.length],
    ];

    return result;
  };

  const visibleTestimonials = getVisibleTestimonials();

  return (
    <Container maxWidth="lg" sx={{ py: 8 }}>
      <Box sx={{ position: "relative" }}>
        <Box sx={{ textAlign: "center", mb: 6, position: "relative" }}>
          <Typography
            variant="h3"
            component="h2"
            sx={{
              fontWeight: 700,
              color: "#333",
              position: "relative",
              display: "inline-block",
              zIndex: 2,
            }}
          >
            See what our users say
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: { xs: 2, md: 3 },
            flexWrap: { xs: "wrap", md: "nowrap" },
          }}
        >
          {visibleTestimonials.map((testimonial, index) => (
            <Paper
              key={index}
              elevation={3}
              sx={{
                p: 4,
                borderRadius: 3,
                flex: { xs: "1 1 100%", sm: "1 1 45%", md: "1 1 30%" },
                display: "flex",
                flexDirection: "column",
                maxWidth: { xs: "100%", sm: "350px" },
                minHeight: "280px",
                backgroundColor: testimonial.backgroundColor,
                color:
                  testimonial.backgroundColor === "#ffffff" ? "#333" : "#fff",
                transition: "all 0.3s ease",
                transform: index === 1 ? "scale(1)" : "scale(0.95)",
              }}
            >
              <Box sx={{ flexGrow: 1 }}>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 3,
                    fontSize: "0.95rem",
                    lineHeight: 1.6,
                    fontStyle: "italic",
                  }}
                >
                  {testimonial.text}
                </Typography>
              </Box>

              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                <Avatar
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  sx={{
                    width: 48,
                    height: 48,
                    border: "2px solid",
                    borderColor:
                      testimonial.backgroundColor === "#ffffff"
                        ? "#f0f0f0"
                        : "#ffffff",
                  }}
                />
                <Box sx={{ ml: 2 }}>
                  <Typography
                    variant="subtitle1"
                    sx={{
                      fontWeight: 600,
                      mb: 0.5,
                    }}
                  >
                    {testimonial.name}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      opacity: 0.8,
                    }}
                  >
                    {testimonial.position}
                  </Typography>
                </Box>
                <Box sx={{ ml: "auto" }}>
                  <Rating
                    value={testimonial.rating}
                    readOnly
                    size="small"
                    sx={{
                      "& .MuiRating-iconFilled": {
                        color:
                          testimonial.backgroundColor === "#ffffff"
                            ? "#FFB400"
                            : "#ffffff",
                      },
                    }}
                  />
                </Box>
              </Box>
            </Paper>
          ))}
        </Box>

        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <IconButton
            onClick={handlePrev}
            sx={{
              mr: 2,
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ArrowBackIosNewIcon sx={{ fontSize: 18 }} />
          </IconButton>
          <IconButton
            onClick={handleNext}
            sx={{
              backgroundColor: "#f5f5f5",
              "&:hover": {
                backgroundColor: "#e0e0e0",
              },
            }}
          >
            <ArrowForwardIosIcon sx={{ fontSize: 18 }} />
          </IconButton>
        </Box>
      </Box>
    </Container>
  );
};

export default Content3;
