import React, { useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from "../Sidebar/Sidebar";
import {
  Container,
  CircularProgress,
  Typography,
  Grid,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Paper,
  List,
  ListItem,
  ListItemText,
  Divider,
  styled,
  InputAdornment,
} from "@mui/material";
import { Search as SearchIcon } from "@mui/icons-material";
import { Sort as SortIcon } from "@mui/icons-material";
import useFetchModels from "../../hooks/useFetchModels";

const CustomTextField = styled(TextField)(({ theme }) => ({
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
  "& .MuiInputBase-input": {
    padding: "10px 14px",
    transition: theme.transitions.create(["background-color", "color"]),
  },
}));

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
  },
}));

const ModelList = () => {
  const { models, loading, error } = useFetchModels();
  const [sortBy, setSortBy] = useState("newest");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model.id); // Cập nhật mô hình được chọn
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  // Lọc và sắp xếp danh sách
  const filteredModels = Array.isArray(models)
    ? models.filter((model) => {
        if (!model || !model.name) return false;
        return model.name.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  const sortedModels = [...filteredModels].sort((a, b) => {
    const dateA = new Date(a.updated_at || "1970-01-01");
    const dateB = new Date(b.updated_at || "1970-01-01");
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    switch (sortBy) {
      case "newest":
        return dateB - dateA;
      case "oldest":
        return dateA - dateB;
      case "a-z":
        return nameA.localeCompare(nameB);
      case "z-a":
        return nameB.localeCompare(nameA);
      default:
        return 0;
    }
  });

  if (loading) {
    return (
      <Container sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ mt: 4 }}>
        <Typography color="error">{error}</Typography>
      </Container>
    );
  }

  return (
    <Box sx={{ display: "flex" }}>
      <Sidebar onToggle={handleDrawerToggle} />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          backgroundColor: "#fff",
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12}>
            <Typography
              variant="h5"
              gutterBottom
              sx={{
                fontWeight: 700,
                fontFamily: "Inter, sans-serif",
                color: "#4F9CF9",
                mb: 3,
                textTransform: "uppercase",
                letterSpacing: 1,
              }}
            >
              All Types
            </Typography>
          </Grid>
        </Grid>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 4,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <CustomTextField
            variant="outlined"
            placeholder="Search by model name..."
            sx={{ width: { xs: "100%", sm: "300px" }, flexGrow: 1 }}
            value={searchTerm}
            onChange={handleSearchChange}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: "#757575" }} />
                </InputAdornment>
              ),
            }}
          />
          <FormControl sx={{ minWidth: 150, flexShrink: 0 }}>
            <InputLabel
              id="sort-by-label"
              sx={{ color: "#757575", "&.Mui-focused": { color: "#4F9CF9" } }}
            >
              Sort
            </InputLabel>
            <CustomSelect
              labelId="sort-by-label"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort"
              IconComponent={SortIcon}
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
              <MenuItem value="a-z">a ➝ z</MenuItem>
              <MenuItem value="z-a">z ➝ a</MenuItem>
            </CustomSelect>
          </FormControl>
        </Box>

        <Paper
          sx={{
            borderRadius: 8, // Tăng bo góc cho đồng nhất
            boxShadow: 3,
            maxHeight: 400,
            overflow: "auto",
            background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          }}
        >
          <List>
            {sortedModels.length > 0 ? (
              sortedModels.map((model, index) => (
                <React.Fragment key={model.id}>
                  <ListItem
                    button
                    selected={selectedModel === model.id}
                    onClick={() => handleModelSelect(model)}
                    sx={{
                      py: 2,
                      px: 3,
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      transition: "background-color 0.3s",
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                      },
                    }}
                  >
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500}>{model.name}</Typography>
                        }
                        secondary="Model Name"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500}>
                            {model.models.length > 0
                              ? model.models[0].version || "N/A"
                              : "N/A"}
                          </Typography>
                        }
                        secondary="Version"
                      />
                    </Box>
                    <Box sx={{ flex: 1 }}>
                      <ListItemText
                        primary={
                          <Typography fontWeight={500}>
                            {model.status || "N/A"}
                          </Typography>
                        }
                        secondary="Status"
                      />
                    </Box>
                    <Box
                      sx={{
                        flex: 1,
                        display: "flex",
                        justifyContent: "flex-end",
                      }}
                    >
                      <Chip
                        label={
                          model.models.length > 0
                            ? model.models[0].name || "N/A"
                            : "N/A"
                        }
                        sx={{
                          borderRadius: 12,
                          backgroundColor: "#1976d2",
                          color: "#fff",
                          "&:hover": {
                            backgroundColor: "#1565c0",
                          },
                        }}
                      />
                    </Box>
                  </ListItem>
                  {index < sortedModels.length - 1 && <Divider />}
                </React.Fragment>
              ))
            ) : (
              <Typography
                sx={{
                  p: 2,
                  textAlign: "center",
                  color: "#757575",
                  fontStyle: "italic",
                }}
              >
                No models found.
              </Typography>
            )}
          </List>
        </Paper>

        {selectedModel && (
          <Box sx={{ mt: 2, textAlign: "center" }}>
            <Link to={`/upload/${selectedModel}`}>
              <Button
                variant="contained"
                color="primary"
                sx={{ mt: 1, borderRadius: 8 }}
              >
                Go to Upload
              </Button>
            </Link>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default ModelList;
