import React, { useState } from "react";
import Logo from "../../assets/image/logo.svg";
import LoginComponent from "../../Page/Login/Login.js";
import { Routes, Route, Router, Link, useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  Menu,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

function Header() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [openMenu, setOpenMenu] = useState(null);

  const handleClick = (event, menuName) => {
    setAnchorEl(event.currentTarget);
    setOpenMenu(menuName);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setOpenMenu(null);
  };

  const menuItems = {
    Products: ["Product 1", "Product 2"],
    Solutions: ["Solution 1", "Solution 2"],
    Resources: ["Resource 1", "Resource 2"],
    Pricing: ["Pricing Plan 1", "Pricing Plan 2"],
  };

  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <img src={Logo} alt="Logo" style={{ height: "40px" }} />
          <Typography
            variant="h6"
            sx={{
              ml: 1,
              color: "#4F9CF9",
              fontFamily: "Inter, sans-serif",
              fontWeight: "bold",
            }}
          >
            CountChan
          </Typography>
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "right",
            marginRight: "50px",
            fontFamily: "Inter, sans-serif",
          }}
        >
          {["Products", "Solutions", "Resources", "Pricing"].map((item) => (
            <div key={item}>
              <Button
                onClick={(e) => handleClick(e, item)}
                sx={{ color: "#4F9CF9", mx: 1 }}
                endIcon={<ArrowDropDownIcon />}
              >
                {item}
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={openMenu === item}
                onClose={handleClose}
              >
                {menuItems[item].map((subItem) => (
                  <MenuItem key={subItem} onClick={handleClose}>
                    {subItem}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          ))}
        </Box>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFE492", color: "#043873", mr: 1 }}
          component={Link}
          to="/login"
          onClick={handleLoginClick}
        >
          Login
        </Button>
        <Button
          variant="contained"
          sx={{ backgroundColor: "#4F9CF9", color: "#fff" }}
          endIcon={<ArrowForwardIcon />}
        >
          Try app free
        </Button>
      </Toolbar>
    </AppBar>
  );
}

export default Header;
