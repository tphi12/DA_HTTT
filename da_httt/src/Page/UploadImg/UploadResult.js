import React, { useState, useEffect, useRef } from "react";
import {
  CircularProgress,
  Container,
  Paper,
  Box,
  Button,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { ArrowBack as ArrowBackIcon } from "@mui/icons-material";
import apiClient from "../../api/config/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import { styled } from "@mui/material/styles";

const CustomPaper = styled(Paper)(({ theme }) => ({
  borderRadius: 16,
  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
}));

const UploadResult = () => {
  const [response, setResponse] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const detailHeight = 140;
  const [index, setIndex] = useState(0);
  const [objNo, setObjNo] = useState(0);
  const [detail, setDetail] = useState(false);

  const objCount = () => {
    return current() ? currentPrediction().length : 0;
  };

  const current = () => {
    return response && response[index] ? response[index] : null;
  };

  const currentImage = () => {
    return current() && current().count_result
      ? current().count_result.image
      : null;
  };

  const newSize = () => {
    return currentImage()
      ? {
          width: currentImage().width / currentRatio(),
          height: currentImage().height / currentRatio(),
        }
      : { width: 0, height: 0 };
  };

  const currentPrediction = () => {
    return current() && current().count_result
      ? current().count_result.predictions
      : [];
  };

  const componentRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  const handleLoadImg = (e) => {
    if (componentRef.current) {
      setSize({
        width: componentRef.current.offsetWidth,
        height: componentRef.current.offsetHeight,
      });
    }
    handleBaseImg(e);
  };

  useEffect(() => {
    const updateSize = () => {
      if (componentRef.current) {
        setSize({
          width: componentRef.current.offsetWidth,
          height: componentRef.current.offsetHeight,
        });
      }
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const currentRatio = () => {
    const imageRatio =
      currentImage() && currentImage().width && currentImage().height
        ? currentImage().width / currentImage().height
        : 1;
    const borderRatio = size.width / size.height || 1;
    return borderRatio / imageRatio > 1
      ? currentImage().height / size.height
      : currentImage().width / size.width || 1;
  };

  const handleImageDetail = (value) => {
    setDetail(true);
    setIndex(value);
    setObjNo(0);
  };

  useEffect(() => {
    const handleProcess = async () => {
      try {
        const token = localStorage.getItem("auth_key");
        if (!token) {
          throw new Error(
            "No authentication token found. Please log in again."
          );
        }
        const image_list = JSON.parse(sessionStorage.getItem("images")) || [
          { id: "fd8946b0-6c0d-43f7-bb28-993e635b8fe6" },
          { id: "698f03cc-618d-4c8b-9343-14556db3a391" },
        ];
        const images = image_list.map((item) => item.id);
        const result = await apiClient.post("/api/images/process/", { images });

        if (!result) {
          throw new Error("Network response was not ok");
        }

        setResponse(result.data);
      } catch (err) {
        setError("An error occurred: " + err.message);
        console.log(error);
      } finally {
        if (!error) {
          const image_list =
            JSON.parse(localStorage.getItem("image_list")) || [];
          const newList = [...image_list, ...response];
          localStorage.setItem("image_list", JSON.stringify(newList));
        }
        setLoading(false);
      }
    };

    handleProcess();
  }, [error]);

  const handleObjChange = (e) => {
    const newValue = parseInt(e.target.value, 10);
    setObjNo(
      isNaN(newValue) || newValue <= 0
        ? objNo
        : ((newValue - 1) / objCount() < 1) * ((newValue - 1) % objCount()) +
            ((newValue - 1) / objCount() >= 1) * (objCount() - 1)
    );
  };

  const dateOutput = (input) => {
    let date = input.substring(8, 10);
    let month = input.substring(5, 7);
    let year = input.substring(0, 4);
    let hour = input.substring(11, 19);
    return date + "-" + month + "-" + year + " " + hour;
  };

  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = {};
      await Promise.all(
        response.map(async (item, key) => {
          if (imageUrls[key]) return;
          try {
            const response = await apiClient.get(
              `/api/files/image/${item.id}`,
              {
                responseType: "blob",
              }
            );
            const blob = await response.data;
            const newBlob = blob.slice(0, blob.size, "image/jpeg");
            const url = URL.createObjectURL(newBlob);
            urls[key] = url;
          } catch (err) {
            console.error(`Error loading image with id ${item.id}`, err);
          }
        })
      );
      setImageUrls(urls);
    };
    if (!Object.keys(imageUrls).length) fetchImages();

    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [response]);

  const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  const [baseImg, setBaseImg] = useState({ width: 0, height: 0 });

  const baseLandscape = () => {
    return baseImg.width > baseImg.height;
  };

  const isLandscape = () => {
    return currentImage() && currentImage().width > currentImage().height;
  };

  const handleRotate = () => {
    return baseImg.width === baseImg.height
      ? false
      : (baseLandscape() || isLandscape()) &&
          (!baseLandscape() || !isLandscape());
  };

  const handleScale = () => {
    return handleRotate() ? baseImg.height / currentImage().height : 1;
  };

  const handleBaseImg = (e) => {
    const { naturalHeight, naturalWidth } = e.target;
    setBaseImg({ width: naturalWidth, height: naturalHeight });
  };

  return (
    <Container
      sx={{
        display: "flex",
        width: "100vw",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <Sidebar onToggle={handleDrawerToggle} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          width: "100%",
          padding: "20px",
        }}
      >
        <Typography
          variant="h5"
          gutterBottom
          sx={{
            fontFamily: "Inter, sans-serif",
            fontWeight: 700,
            color: "#4F9CF9",
            textTransform: "uppercase",
            letterSpacing: 1,
            mb: 3,
          }}
        >
          Upload Result
        </Typography>
        {detail && (
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => setDetail(false)}
            size="small"
            sx={{
              position: "static",
              left: 2,
              ml: 2,
              mt: 1,
              borderRadius: 8,
              borderColor: "#4F9CF9",
              color: "#4F9CF9",
              fontFamily: "Inter, sans-serif",
              fontWeight: 500,
              padding: "4px 8px",
              "&:hover": {
                borderColor: "#3B7CD6",
                backgroundColor: "#E6F0FA",
              },
            }}
          >
            Back
          </Button>
        )}
        <CustomPaper
          elevation={3}
          sx={{
            width: "100%",
            overflow: "hidden",
            mb: 2,
            display: detail ? "none" : "block",
          }}
        >
          <Box sx={{ padding: 2, overflowX: "auto" }}>
            {response.map((item, key) => (
              <img
                key={item.id}
                src={imageUrls[key]}
                style={{
                  width: 60,
                  height: 60,
                  objectFit: "cover",
                  marginRight: 5,
                  borderRadius: 8,
                  cursor: "pointer",
                  boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
                }}
                onClick={() => handleImageDetail(key)}
                alt={item.id}
              />
            ))}
          </Box>
        </CustomPaper>
        <CustomPaper
          elevation={3}
          sx={{
            height: detail ? `calc(100vh - 140px)` : "auto",
            width: "100%",
            display: detail ? "block" : "none",
            mt: 6, // Thêm margin-top để tránh nút Back đè lên
          }}
        >
          <div
            id="imaged"
            style={{
              padding: "10px",
              width: "100%",
              height: `calc(100% - ${detailHeight}px)`,
              position: "relative",
            }}
          >
            {loading ? (
              <CircularProgress
                size="3rem"
                sx={{ display: "block", margin: "auto" }}
              />
            ) : (
              <img
                src={imageUrls[index]}
                alt=""
                ref={componentRef}
                id="border"
                onLoad={(e) => handleLoadImg(e)}
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "contain",
                  imageOrientation: "from-image",
                  transform: `rotate(${
                    handleRotate()
                      ? baseLandscape()
                        ? "90deg"
                        : "270deg"
                      : "0deg"
                  }) scale(${handleScale()},${handleScale()})`,
                }}
              />
            )}
            {currentPrediction().map((item, key) => {
              const x =
                item.x1 / currentRatio() + (size.width - newSize().width) / 2;
              const y =
                item.y1 / currentRatio() + (size.height - newSize().height) / 2;
              const w = (item.x2 - item.x1) / currentRatio();
              const h = (item.y2 - item.y1) / currentRatio();

              return (
                <div
                  className="obj-detect-area"
                  id={key === objNo ? "highlight" : "unhighlight"}
                  style={{
                    position: "absolute",
                    marginLeft: x - 1.5,
                    marginTop: y - size.height - 6,
                    width: w,
                    height: h,
                    alignItems: "center",
                    display: "flex",
                    justifyContent: "center",
                    background:
                      key === objNo ? "rgba(79, 156, 249, 0.3)" : "transparent",
                    border: "1px solid #4F9CF9",
                  }}
                  onClick={() => setObjNo(key)}
                >
                  {key + 1}
                </div>
              );
            })}
          </div>
          <TableContainer
            component={Paper}
            sx={{
              width: "100%",
              borderRadius: 12,
              overflow: "hidden",
              backgroundColor: "#FFF",
              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            <Table sx={{ minWidth: 650 }} aria-label="image details table">
              <TableHead>
                <TableRow
                  sx={{
                    backgroundColor: "#F5F7FA",
                    "& th": {
                      fontWeight: 600,
                      color: "#4F9CF9",
                      fontFamily: "Inter, sans-serif",
                    },
                  }}
                >
                  <TableCell>General Info</TableCell>
                  <TableCell>Image Info</TableCell>
                  <TableCell>Object Info</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      ID: {current() ? current().id : "Error"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Status: {current() ? current().status : "Error"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Created At:{" "}
                      {current() ? dateOutput(current().created_at) : "Error"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Updated At:{" "}
                      {current() ? dateOutput(current().updated_at) : "Error"}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Size:{" "}
                      {currentImage()
                        ? `${currentImage().width} x ${currentImage().height}`
                        : "--"}
                    </Typography>
                    <Typography
                      variant="body1"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 700,
                        color: "#FF9800",
                        mb: 0.5,
                        border: "1px solid #FF9800",
                        borderRadius: 4,
                        p: 0.5,
                        display: "inline-block",
                        backgroundColor: "#FFF3E0",
                      }}
                    >
                      Count: {objCount() || 0}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 0.5,
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          color: "#455A64",
                          mr: 1,
                        }}
                      >
                        Object:
                      </Typography>
                      <input
                        type="number"
                        value={objCount() ? objNo + 1 : 0}
                        onChange={handleObjChange}
                        min="1"
                        style={{
                          width: "40px",
                          textAlign: "center",
                          borderRadius: 4,
                          border: "1px solid #B0BEC5",
                          padding: "4px",
                          fontFamily: "Inter, sans-serif",
                          fontWeight: 500,
                          color: "#455A64",
                        }}
                      />
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Area:{" "}
                      {objCount()
                        ? `(${currentPrediction()[objNo].x1.toFixed(
                            1
                          )}, ${currentPrediction()[objNo].y1.toFixed(
                            1
                          )}) (${currentPrediction()[objNo].x2.toFixed(
                            1
                          )}, ${currentPrediction()[objNo].y2.toFixed(1)})`
                        : "--"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Class:{" "}
                      {objCount() ? currentPrediction()[objNo].class : "--"}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        fontFamily: "Inter, sans-serif",
                        fontWeight: 500,
                        color: "#455A64",
                        mb: 0.5,
                      }}
                    >
                      Confidence Score:{" "}
                      {objCount()
                        ? (currentPrediction()[objNo].confidence * 100).toFixed(
                            2
                          )
                        : "--"}
                      %
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </CustomPaper>
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
      </div>
    </Container>
  );
};

export default UploadResult;
