import React, { useState } from "react"; // Thêm useState
import Sidebar from "../Sidebar/Sidebar";
import {
  Container,
  CircularProgress,
  Typography,
  Grid,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Box,
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
} from "@mui/material";
import useFetchModels from "../../hooks/useFetchModels";

const ModelList = () => {
  const { models, loading, error } = useFetchModels();
  const [sortBy, setSortBy] = React.useState("newest");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const [selectedModel, setSelectedModel] = useState(null); // Trạng thái để theo dõi mô hình được chọn

  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model.id); // Cập nhật mô hình được chọn
  };

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
          backgroundColor: "#f5f7fa",
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}></Grid>

        <Typography variant="h5" gutterBottom>
          All Types
        </Typography>

        <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
          <TextField
            variant="outlined"
            placeholder="Search"
            sx={{ width: "300px" }}
          />
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Sort by</InputLabel>
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              label="Sort by"
            >
              <MenuItem value="newest">Newest</MenuItem>
              <MenuItem value="oldest">Oldest</MenuItem>
            </Select>
          </FormControl>
        </Box>

        <Paper
          sx={{
            borderRadius: 3,
            boxShadow: 3,
            maxHeight: 400,
            overflow: "auto",
          }}
        >
          <List>
            {models.map((model, index) => (
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
                  }}
                >
                  <Box sx={{ flex: 1 }}>
                    <ListItemText primary={model.name} secondary="Model Name" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ListItemText primary={model.version} secondary="Version" />
                  </Box>
                  <Box sx={{ flex: 1 }}>
                    <ListItemText primary={model.status} secondary="Status" />
                  </Box>
                  <Box
                    sx={{
                      flex: 1,
                      display: "flex",
                      justifyContent: "flex-end",
                    }}
                  >
                    <Chip label={model.models.name} sx={{ borderRadius: 1 }} />
                  </Box>
                </ListItem>
                {index < models.length - 1 && <Divider />}
              </React.Fragment>
            ))}
          </List>
        </Paper>
      </Box>
    </Box>
  );
};

export default ModelList;
