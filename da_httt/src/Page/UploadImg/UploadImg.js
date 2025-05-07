import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Typography,
  CircularProgress,
  Paper,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  styled,
} from "@mui/material";
import apiClient from "../../api/config/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";

const CustomSelect = styled(Select)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 20,
    backgroundColor: "#f5f5f5",
    "& fieldset": {
      borderColor: "transparent",
    },
    "&:hover fieldset": {
      borderColor: "transparent",
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.main,
    },
  },
  "& .MuiSelect-select": {
    padding: "10px 14px",
    fontFamily: "Inter, sans-serif",
    fontWeight: 500,
    color: "#455A64",
  },
}));

function UploadImg() {
  const { typeId: typeIdFromURL } = useParams();
  const [typeId, setTypeId] = useState("");
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [models, setModels] = useState([]);

  useEffect(() => {
    const fetchModels = async () => {
      try {
        const response = await apiClient.get("/api/types/");
        setModels(response.data);

        if (typeIdFromURL) {
          setTypeId(typeIdFromURL);
        }
      } catch (err) {
        console.error("Error fetching models", err);
      }
    };

    fetchModels();
  }, [typeIdFromURL]);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
    const previews = Array.from(files).map((file) => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!imageFiles || imageFiles.length === 0) {
      setError("Please select at least one image.");
      setLoading(false);
      return;
    }

    try {
      const token = sessionStorage.getItem("auth_key");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      const formData = new FormData();
      formData.append("type_id", typeId);
      Array.from(imageFiles).forEach((file) => formData.append("images", file));

      const response = await apiClient.post("/api/images", formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      setResponse(response.data);
      sessionStorage.setItem("images", JSON.stringify(response.data));
      // Chuyển hướng sau khi upload thành công (bỏ onClick redirect ra khỏi Button)
      window.location.pathname = "/upload/result";
    } catch (err) {
      setError("An error occurred: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  return (
    <Container maxWidth="md" sx={{ marginTop: 4, paddingBottom: 4 }}>
      <Sidebar onToggle={handleDrawerToggle} />
      <Paper
        elevation={3}
        sx={{
          padding: 4,
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          borderRadius: 16,
          background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 4,
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            color: "#4F9CF9",
            textTransform: "uppercase",
            letterSpacing: 1,
          }}
        >
          Upload Images
        </Typography>
        <Typography
          variant="body2"
          align="center"
          sx={{
            mb: 3,
            fontFamily: "Inter, sans-serif",
            fontWeight: 500,
            color: "#757575",
          }}
        >
          Select a type and upload your images. Preview will be shown below.
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ mb: 3 }}>
            <FormControl fullWidth required sx={{ mb: 2 }}>
              <InputLabel
                id="type-label"
                sx={{
                  color: "#757575",
                  "&.Mui-focused": { color: "#4F9CF9" },
                  fontFamily: "Inter, sans-serif",
                }}
              >
                Type
              </InputLabel>
              <CustomSelect
                labelId="type-label"
                value={typeId}
                onChange={(e) => setTypeId(e.target.value)}
                label="Type"
                displayEmpty
              >
                {models.map((model) => (
                  <MenuItem
                    key={model.id}
                    value={model.id}
                    sx={{
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 500,
                      color: "#455A64",
                    }}
                  >
                    {model.name}
                  </MenuItem>
                ))}
              </CustomSelect>
            </FormControl>
          </Box>

          <Box sx={{ mb: 3 }}>
            <input
              type="file"
              id="imageFiles"
              onChange={handleFileChange}
              required
              multiple
              style={{
                padding: "12px",
                width: "100%",
                border: "1px solid #e0e0e0",
                borderRadius: 8,
                backgroundColor: "#fff",
                cursor: "pointer",
                "&:hover": { borderColor: "#4F9CF9" },
              }}
            />
          </Box>

          {imagePreviews.length > 0 && (
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="body2"
                align="center"
                sx={{
                  mb: 2,
                  fontFamily: "Inter, sans-serif",
                  fontWeight: 500,
                  color: "#455A64",
                }}
              >
                Image Preview:
              </Typography>
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(100px, 1fr))",
                  gap: 2,
                  justifyContent: "center",
                }}
              >
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-img-${index}`}
                    style={{
                      width: "100px",
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: 8,
                      boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "scale(1.05)" },
                    }}
                  />
                ))}
              </Box>
            </Box>
          )}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{
              py: 1.5,
              borderRadius: 12,
              fontFamily: "Inter, sans-serif",
              fontWeight: 600,
              textTransform: "none",
              "&:hover": {
                backgroundColor: "#3B7CD6",
                boxShadow: "0 4px 8px rgba(79, 156, 249, 0.3)",
              },
              "&:disabled": {
                backgroundColor: "#b0bec5",
                color: "#fff",
              },
            }}
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Upload Images"
            )}
          </Button>
        </form>

        {error && (
          <Typography
            color="error"
            variant="body2"
            align="center"
            sx={{
              mt: 2,
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              padding: 1,
              backgroundColor: "#ffebee",
              borderRadius: 4,
            }}
          >
            {error}
          </Typography>
        )}

        {response && (
          <Box sx={{ mt: 3 }}>
            <Typography
              variant="h6"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 700,
                color: "#4F9CF9",
                mb: 1,
              }}
            >
              Uploaded Image ID(s):
            </Typography>
            <Typography
              variant="body2"
              sx={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
                color: "#455A64",
                wordBreak: "break-all",
              }}
            >
              {Array.isArray(response)
                ? response.map((item) => item.id).join(", ")
                : response.id || "No IDs available"}
            </Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default UploadImg;
