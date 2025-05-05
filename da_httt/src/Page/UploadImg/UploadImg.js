import React, { useState } from 'react';
import { Box, Button, Container, TextField, Typography, CircularProgress, Paper } from '@mui/material';
import apiClient from "../../api/config/axiosConfig";
import Sidebar from '../../components/Sidebar/Sidebar';

function UploadImg() {
  const [typeId, setTypeId] = useState('');
  const [imageFiles, setImageFiles] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (event) => {
    const files = event.target.files;
    setImageFiles(files);
    const previews = Array.from(files).map(file => URL.createObjectURL(file));
    setImagePreviews(previews);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!imageFiles) {
      setError('Please select at least one image.');
      setLoading(false);
      return;
    }

    try {
      const token = localStorage.getItem("auth_key");
      if (!token) {
        throw new Error("No authentication token found. Please log in again.");
      }

      console.log(JSON.stringify(input));

      const response = await apiClient.post('/api/images', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
        }
      });

      setResponse(response.data);
      sessionStorage.setItem("images", JSON.stringify(response.data));

      window.location.pathname ="/upload/result";
    } catch (err) {
      setError('An error occurred: ' + err.message); // Nếu có lỗi xảy ra
    } finally {
      setLoading(false);
    }
  };

  //Sidebar
      const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
      
        const handleDrawerToggle = (isOpen) => {
          setIsDrawerOpen(isOpen);
      };

  return (
    <Container maxWidth="sm" sx={{ marginTop: 4 }}>
      <Sidebar onToggle={handleDrawerToggle} />
      <Paper elevation={3} sx={{ padding: 3, marginLeft: isDrawerOpen ? "150px" : "60px", 
                transition: "margin-left 0.3s ease"}}>
        <Typography variant="h5" align="center" sx={{ mb: 3 }}>
          Image Upload Form
        </Typography>
        <form onSubmit={handleSubmit}>

          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Type ID"
              value={typeId}
              onChange={(e) => setTypeId(e.target.value)}
              required
              variant="outlined"
            />
          </Box>

          <Box sx={{ mb: 2 }}>
            <input
              type="file"
              id="imageFiles"
              onChange={handleFileChange}
              required
              multiple
              style={{ padding: '8px' }}
            />
          </Box>

          {imagePreviews.length > 0 && (
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" align="center" sx={{ mb: 2 }}>
                Image Preview:
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap' }}>
                {imagePreviews.map((preview, index) => (
                  <img
                    key={index}
                    src={preview}
                    alt={`preview-img-${index}`}
                    style={{
                      width: '100px',
                      height: '100px',
                      objectFit: 'cover',
                      marginRight: '10px',
                      marginBottom: '10px',
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
            sx={{ py: 1.5 }}
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} color="inherit" /> : 'Upload'}
          </Button>
        </form>

        {error && (
          <Typography color="error" variant="body2" align="center" sx={{ mt: 2 }}>
            {error}
          </Typography>
        )}

        {response && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6">Uploaded Image ID(s):</Typography>
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default UploadImg;
