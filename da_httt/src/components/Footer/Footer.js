import React, { useState } from "react";
import Logo from "../../assets/image/logo.svg";
import {
  Box,
  Typography,
  Link,
  Menu,
  MenuItem,
  IconButton,
  Button,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import GoogleIcon from "@mui/icons-material/Google";
import LanguageIcon from "@mui/icons-material/Language";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";

function Footer() {
  const [language, setLanguage] = useState("English");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    handleClose();
  };

  return (
    <Box sx={{ bgcolor: "#043873", color: "#fff", pt: 4, pb: 2 }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          px: 4,
          pb: 4,
          borderBottom: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <img
            src={Logo}
            alt="Logo"
            style={{ width: "100px", marginBottom: "10px" }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              mb: 1,
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
            }}
          >
            Support
          </Typography>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            Contact us
          </Link>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            FAQ
          </Link>
          <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
            Live chat
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              mb: 1,
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
            }}
          >
            Support
          </Typography>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            Contact us
          </Link>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            FAQ
          </Link>
          <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
            Live chat
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              mb: 1,
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
            }}
          >
            Support
          </Typography>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            Contact us
          </Link>
          <Link
            href="#"
            sx={{ color: "#fff", textDecoration: "none", mb: 0.5 }}
          >
            FAQ
          </Link>
          <Link href="#" sx={{ color: "#fff", textDecoration: "none" }}>
            Live chat
          </Link>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-start",
            mr: 2,
          }}
        >
          <Typography
            variant="h6"
            sx={{
              color: "#fff",
              mb: 1,
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
            }}
          >
            Try It Today
          </Typography>
          <Typography variant="caption" sx={{ color: "#fff", mb: 1 }}>
            Get started for free.
          </Typography>
          <Typography variant="caption" sx={{ color: "#fff", mb: 1 }}>
            Add your whole team
          </Typography>

          <Typography variant="caption" sx={{ color: "#fff", mb: 1 }}>
            as your needs grow.
          </Typography>
          <Button
            variant="contained"
            sx={{ bgcolor: "#4F9CF9", color: "#fff", textTransform: "none" }}
            endIcon={<ArrowForwardIcon />}
          >
            Start today
          </Button>
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          px: 4,
          pt: 2,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <Box
            sx={{ display: "flex", alignItems: "center", cursor: "pointer" }}
          >
            <Box
              onClick={handleClick}
              sx={{
                display: "flex",
                alignItems: "center",
                color: "#fff",
                "&:hover": { opacity: 0.8 },
              }}
            >
              <LanguageIcon fontSize="small" sx={{ mr: 0.5 }} />
              <Typography variant="body2" sx={{ mr: 0.5 }}>
                {language}
              </Typography>
              <KeyboardArrowDownIcon fontSize="small" />
            </Box>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              MenuListProps={{
                "aria-labelledby": "language-selector",
              }}
              sx={{
                "& .MuiPaper-root": {
                  backgroundColor: "#0a3158",
                  color: "#fff",
                  minWidth: "120px",
                  mt: 1,
                },
              }}
            >
              <MenuItem
                onClick={() => handleLanguageChange("English")}
                selected={language === "English"}
              >
                English
              </MenuItem>
              <MenuItem
                onClick={() => handleLanguageChange("Vietnamese")}
                selected={language === "Vietnamese"}
              >
                Vietnamese
              </MenuItem>
            </Menu>
          </Box>

          <Link href="#" sx={{ color: "#fff", textDecoration: "none", mx: 1 }}>
            Terms & privacy
          </Link>
          <Link href="#" sx={{ color: "#fff", textDecoration: "none", mx: 1 }}>
            Security
          </Link>
          <Link href="#" sx={{ color: "#fff", textDecoration: "none", mx: 1 }}>
            Sales
          </Link>
        </Box>

        <Typography variant="body2">© 2025 Counttp.</Typography>

        <Box sx={{ display: "flex", gap: 1 }}>
          <IconButton
            sx={{ color: "#fff" }}
            href="https://facebook.com"
            target="_blank"
          >
            <FacebookIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            href="https://twitter.com"
            target="_blank"
          >
            <TwitterIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            href="https://linkedin.com"
            target="_blank"
          >
            <LinkedInIcon />
          </IconButton>
          <IconButton
            sx={{ color: "#fff" }}
            href="https://google.com"
            target="_blank"
          >
            <GoogleIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}

export default Footer;
