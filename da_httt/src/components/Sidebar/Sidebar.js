import React, { useState } from "react";
import {
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
} from "@mui/material";
import {
  ViewList as ViewListIcon,
  People as PeopleIcon,
  Upload as UploadIcon,
  Inventory as InventoryIcon,
  LocalOffer as PromoIcon,
  Help as HelpIcon,
} from "@mui/icons-material";
import Logo from "../../assets/image/logo.svg";

const Sidebar = ({ onToggle = () => {} }) => {
  const [open, setOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState("Upload");

  const toggleSidebar = () => {
    setOpen(!open);
    onToggle(!open);
  };

  const handleItemClick = (itemText) => {
    setSelectedItem(itemText);
  };

  return (
    <div
      style={{
        width: open ? 240 : 60,
        height: "100vh",
        backgroundColor: "#ffff",
        position: "fixed",
        top: 0,
        left: 0,
        transition: "width 0.3s ease",
        overflowX: "hidden",
        zIndex: 1100,
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          position: "absolute",
          top: 16,
          left: 16,
          zIndex: 1200,
        }}
      >
        <IconButton
          onClick={toggleSidebar}
          sx={{ color: "#4F9CF9", padding: 0 }}
        >
          <img src={Logo} alt="Logo" style={{ width: 30, height: 30 }} />
        </IconButton>
        {open && (
          <span
            style={{
              marginLeft: 10,
              fontSize: "16px",
              fontWeight: "bold",
              color: "#4F9CF9",
            }}
          >
            Counttp
          </span>
        )}
      </div>

      <List sx={{ marginTop: "60px", padding: "0 10px" }}>
        {[
          { text: "Users", icon: <PeopleIcon /> },
          { text: "List Types", icon: <ViewListIcon /> },
          { text: "Upload", icon: <UploadIcon /> },
          { text: "Orders", icon: <InventoryIcon /> },
          { text: "Promote", icon: <PromoIcon /> },
          { text: "Help", icon: <HelpIcon /> },
        ].map((item) => (
          <ListItem
            button
            key={item.text}
            onClick={() => handleItemClick(item.text)}
            sx={{
              borderRadius: "8px",
              margin: "4px 0",
              padding: open ? "8px 12px" : "8px 10px",
              width: "auto",
              backgroundColor:
                selectedItem === item.text ? "#4F9CF9" : "transparent",
              color: selectedItem === item.text ? "white" : "#9197B3",
              "&:hover": {
                backgroundColor:
                  selectedItem === item.text ? "#4F9CF9" : "#e8ecef",
              },
            }}
          >
            <ListItemIcon
              sx={{
                color: selectedItem === item.text ? "white" : "inherit",
                minWidth: open ? 40 : 30,
              }}
            >
              {item.icon}
            </ListItemIcon>
            {open && <ListItemText primary={item.text} />}
          </ListItem>
        ))}
      </List>

      <div
        style={{
          position: "absolute",
          bottom: 20,
          left: 16,
          right: 16,
          textAlign: "center",
        }}
      >
        {open && (
          <div
            style={{
              background: "linear-gradient(90deg, #7c4dff, #ff6f61)",
              padding: "10px",
              borderRadius: "8px",
              color: "white",
              marginBottom: "20px",
            }}
          >
            <p style={{ margin: 0, fontSize: "14px" }}>
              Upgrade to PRO to get access all features!
            </p>
            <button
              style={{
                marginTop: "10px",
                padding: "5px 15px",
                backgroundColor: "white",
                border: "none",
                borderRadius: "20px",
                color: "#7c4dff",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Get Pro Now!
            </button>
          </div>
        )}

        <div style={{ display: "flex", alignItems: "center" }}>
          <img
            src="https://api.dicebear.com/9.x/adventurer/svg?seed=Jude"
            alt="User Avatar"
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              marginRight: open ? 10 : 0,
            }}
          />
          {open && (
            <div style={{ textAlign: "left" }}>
              <p style={{ margin: 0, fontWeight: "bold" }}>Chan Chan</p>
              <p style={{ margin: 0, fontSize: "12px", color: "#888" }}>
                Project Manager
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
