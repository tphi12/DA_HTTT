import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box sx={{ bgcolor: "#f5f5f5", p: 2, mt: 4 }}>
      <Typography variant="body2" align="center">
        © 2023 Counttp. All rights reserved.
      </Typography>
    </Box>
  );
}

export default Footer;
