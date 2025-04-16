import { Container, Typography, Button, Box } from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import * as React from "react";

function Content1() {
  return (
    <Container sx={{ mt: 2 }}>
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          alignItems: "center",
          gap: 2,
        }}
      >
        <Box sx={{ flex: "1 1 50%" }}>
          <Typography
            variant="h3"
            sx={{
              color: "#4F9CF9",
              fontFamily: "Inter",
              fontWeight: "bold",
              mb: 2,
            }}
          >
            "Get Easy Counting, Track Objects Accurately with Counttp."
          </Typography>
          <Typography
            variant="body1"
            sx={{ mb: 4, color: "#4F9CF9", fontFamily: "Inter" }}
          >
            Cung cấp giải pháp đếm vật thể nhanh chóng và chính xác bằng mô hình
            AI. Dễ dàng theo dõi, thực hiện và trả lại kết quả một cách hiệu quả
            và chính xác, giúp bạn tiết kiệm thời gian với việc quản lý số lượng
            lớn vật liệu
          </Typography>
          <Button
            variant="contained"
            sx={{ backgroundColor: "#4F9CF9", color: "#fff", mb: 2 }}
            endIcon={<ArrowForwardIcon />}
          >
            Try Counttp free
          </Button>
        </Box>

        <Box sx={{ flex: "1 1 50%" }}>
          <img
            src="https://th.bing.com/th/id/OIP._BGQf-tzemBSUdRgPvXtKQHaFj?rs=1&pid=ImgDetMain"
            alt="Đếm vật thể với AI - số 9"
            style={{
              height: 400,
              width: "100%",
              objectFit: "cover",
              borderRadius: 8,
            }}
          />
        </Box>
      </Box>
    </Container>
  );
}

export default Content1;
