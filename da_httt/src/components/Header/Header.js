import React, { useState } from "react";
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

  return (
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        {/* Logo */}
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {/* Thay bằng đường dẫn thực tế đến logo của bạn */}
          <img
            src="path/to/logo.png"
            alt="Counttp Logo"
            style={{ height: "40px" }}
          />
          <Typography variant="h6" sx={{ ml: 1, color: "#1976d2" }}>
            Counttp
          </Typography>
        </Box>

        {/* Navigation Items */}
        <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
          {["Products", "Solutions", "Resources", "Pricing"].map((item) => (
            <div key={item}>
              <Button
                onClick={(e) => handleClick(e, item)}
                sx={{ color: "#90caf9", mx: 1 }}
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

        {/* Buttons */}
        <Button
          variant="contained"
          sx={{ backgroundColor: "#FFE492", color: "#043873", mr: 1 }}
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
