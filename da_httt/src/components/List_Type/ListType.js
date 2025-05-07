import React from "react";
import { Link } from 'react-router-dom';
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
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer Name</TableCell>
                <TableCell>Company</TableCell>
                <TableCell>Phone Number</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Country</TableCell>
                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
            {models.map((model) => (
              <TableRow key={model.id}>
                <TableCell>
                  <Link to={`/upload/${model.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {model.name}
                  </Link>
                </TableCell>
                <TableCell>{model.subtype_name}</TableCell>
                <TableCell>{model.phone || "(123) 456-7890"}</TableCell>
                <TableCell>{model.email || `${model.name.toLowerCase()}@example.com`}</TableCell>
                <TableCell>{model.country || "United States"}</TableCell>
                <TableCell>
                  <Chip
                    label={model.status || "Active"}
                    color={model.status === "Inactive" ? "error" : "success"}
                    sx={{ borderRadius: 1 }}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
          </Table>
        </TableContainer>

      </Box>
    </Box>
  );
};

export default ModelList;
