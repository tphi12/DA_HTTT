import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  CircularProgress,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Chip,
  Box,
} from "@mui/material";
import { People as PeopleIcon } from "@mui/icons-material";
import useFetchModels from "../../hooks/useFetchModels";

const ModelList = () => {
  const { models, loading, error } = useFetchModels();
  const [sortBy, setSortBy] = React.useState("newest");
  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);

  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
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
          marginLeft: isDrawerOpen ? "240px" : 0,
          transition: "margin-left 0.3s ease",
          width: "100%",
        }}
      >
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#4caf50", mr: 2 }} />
                <Box>
                  <Typography variant="h6">Total Customers</Typography>
                  <Typography variant="h4">5,423</Typography>
                  <Typography color="success.main">↑ 16% this month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#f44336", mr: 2 }} />
                <Box>
                  <Typography variant="h6">Members</Typography>
                  <Typography variant="h4">1,893</Typography>
                  <Typography color="error.main">↓ 1% this month</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4}>
            <Card sx={{ borderRadius: 3, boxShadow: 3 }}>
              <CardContent sx={{ display: "flex", alignItems: "center" }}>
                <PeopleIcon sx={{ color: "#2196f3", mr: 2 }} />
                <Box>
                  <Typography variant="h6">Active Now</Typography>
                  <Typography variant="h4">189</Typography>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Typography variant="h5" gutterBottom>
          All Customers
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          Active Members
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

        <TableContainer
          component={Paper}
          sx={{ borderRadius: 3, boxShadow: 3 }}
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
                  <TableCell>{model.name}</TableCell>
                  <TableCell>{model.subtype_name}</TableCell>
                  <TableCell>{model.phone || "(123) 456-7890"}</TableCell>
                  <TableCell>
                    {model.email || `${model.name.toLowerCase()}@example.com`}
                  </TableCell>
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
