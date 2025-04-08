import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  Divider,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import AppleIcon from "@mui/icons-material/Apple";

const MetaIcon = () => (
  <svg width="20" height="20" viewBox="0 0 512 512" fill="#1877f2">
    <path d="M512 256C512 114.6 397.4 0 256 0S0 114.6 0 256C0 376.6 85.7 478.5 203 503v-153H142v-94h61v-77.7c0-92.4 55.1-143.3 139-143.3 40.2 0 82.2 7.2 82.2 7.2v90.3h-46.3c-45.6 0-59.9 28.3-59.9 57.4V256h101.9l-16.3 94H318v153c117.3-24.5 203-126.4 203-247z" />
  </svg>
);

const LoginComponent = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Xử lý đăng nhập
    console.log("Logging in with:", email, password);
  };

  const handleSocialLogin = (provider) => {
    console.log(`Logging in with ${provider}`);
    // Xử lý đăng nhập với mạng xã hội
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f2f5",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          padding: 4,
          width: "100%",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: 2,
          borderRadius: 2,
        }}
      >
        <Typography
          variant="h5"
          align="center"
          sx={{
            mb: 3,
            fontWeight: 500,
            color: "#1976d2",
          }}
        >
          Login
        </Typography>

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            placeholder="get@contutorial.com"
            variant="outlined"
            margin="normal"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            placeholder="Password"
            type="password"
            variant="outlined"
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
          />

          <Box sx={{ mt: 2, mb: 3 }}>
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mb: 2 }}
            >
              Or continue with:
            </Typography>

            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: 2,
              }}
            >
              <Button
                variant="outlined"
                onClick={() => handleSocialLogin("Google")}
                sx={{
                  minWidth: "64px",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  color: "#757575",
                  p: 1,
                }}
              >
                <GoogleIcon style={{ color: "#4285F4" }} />
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleSocialLogin("Meta")}
                sx={{
                  minWidth: "64px",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  color: "#757575",
                  p: 1,
                }}
              >
                <MetaIcon />
              </Button>

              <Button
                variant="outlined"
                onClick={() => handleSocialLogin("Apple")}
                sx={{
                  minWidth: "64px",
                  borderRadius: 1,
                  border: "1px solid #e0e0e0",
                  color: "#757575",
                  p: 1,
                }}
              >
                <AppleIcon style={{ color: "#000" }} />
              </Button>
            </Box>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: 1,
              textTransform: "none",
              backgroundColor: "#1976d2",
            }}
          >
            Log in
          </Button>
        </form>
      </Paper>
    </Container>
  );
};

export default LoginComponent;
