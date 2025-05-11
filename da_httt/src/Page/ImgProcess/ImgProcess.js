import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import {
  CircularProgress,
  Typography,
  Pagination,
  Container,
  Select,
  Paper,
  Box,
  Switch,
  Backdrop,
  TextField,
  InputLabel,
  Menu,
  MenuItem,
  Button,
  IconButton,
  ListItem,
  ListItemText,
  FormControl,
  FormControlLabel,
  Dialog,
  DialogTitle,
  DialogActions,
  DialogContent,
  DialogContentText,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
  InputAdornment,
} from "@mui/material";

import {
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  ArrowBack as ArrowBackIcon,
  Search as SearchIcon,
} from "@mui/icons-material";

import { Rnd } from "react-rnd";

import apiClient from "../../api/config/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../index.css";

const CustomTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    borderRadius: 4,
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
    padding: "6px 8px",
    textAlign: "center",
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

const CustomPagination = styled(Pagination)(({ theme }) => ({
  "& .MuiPaginationItem-root": {
    borderRadius: 12,
    background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
    color: "#333",
    margin: "0 4px",
    "&:hover": {
      background: "linear-gradient(135deg, #e0e0e0 0%, #d0d0d0 100%)",
    },
    "&.Mui-selected": {
      background: "linear-gradient(135deg, #4F9CF9 0%, #4F9CF9 100%)",
      color: "#fff",
      boxShadow: "0 4px 8px rgba(101, 168, 244, 1)",
    },
  },
  "& .MuiPaginationItem-ellipsis": {
    color: "#757575",
  },
}));

const CustomListItem = styled(ListItem)(({ theme }) => ({
  borderRadius: 2,
  background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
  marginBottom: 8,
  "&:hover": {
    background: "linear-gradient(135deg, #f5f5f5 0%, #e0e0e0 100%)",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
  },
  "& .MuiListItemText-primary": {
    fontWeight: 500,
    color: "#333",
  },
}));

const ImgProcess = () => {
  const navigate = useNavigate();
  const location = useLocation();

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
    return filteredSearchList ? (Sort()[index] ? Sort()[index] : null) : null;
  };

  const currentImage = () => {
    return current() ? current().count_result.image : null;
  };

  const newSize = () => {
    return {
      width: currentImage().width / currentRatio(),
      height: currentImage().height / currentRatio(),
    };
  };

  const currentPrediction = () => {
    return current() ? current().count_result.predictions : [];
  };

  const componentRef = useRef(null);
  const [size, setSize] = useState({
    width: 0,
    height: 0,
  });

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
    const imageRatio = currentImage().width / currentImage().height;
    const borderRatio = size.width / size.height;
    return borderRatio / imageRatio > 1
      ? currentImage().height / size.height
      : currentImage().width / size.width;
  };

  const handleImageDetail = (value) => {
    setDetail(true);
    setIndex(value);
    setCurList(value - page * 5);
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

        const image_list = JSON.parse(localStorage.getItem("image_list")) || [
          {
            id: "2f4abecd-edc8-4144-9397-63c709194676",
          },
          {
            id: "76f12786-472e-4121-80c6-a3c8e55d2f43",
          },
          {
            id: "698f03cc-618d-4c8b-9343-14556db3a391",
          },
        ];

        if (!image_list) {
          throw new Error("Network response was not ok");
        }

        const newList = image_list
          .filter((item) => Boolean(item.count_result))
          .map((item, key) => ({
            ...item,
            index: key,
          }));

        setResponse(newList);
      } catch (err) {
        setError("An error occurred: " + err.message);
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (loading) handleProcess();
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

  const [page, setPage] = useState(0);

  const handlePageChange = (e, value) => {
    setPage(value - 1);
    navigate(`#page${value}`);
  };

  const [sortBy, setSortBy] = useState("name_asc");
  const [imageUrls, setImageUrls] = useState([]);

  useEffect(() => {
    const fetchImages = async () => {
      const urls = {};

      await Promise.all(
        Sort()
          .filter((item, key) => page * 5 <= key && key < page * 5 + 5)
          .map(async (item, key) => {
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

    fetchImages();

    return () => {
      Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
    };
  }, [response, page, sortBy]);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
    setDetail(false);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setDialog(null);
    setShowImage(false);
  };

  const [curList, setCurList] = useState(0);
  const [dialog, setDialog] = useState(null);
  const handleDialog = (e, value) => {
    setDialog(e.currentTarget);
    setCurList(value);
  };

  const handleDelete = () => {};

  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const handleDrawerToggle = (isOpen) => {
    setIsDrawerOpen(isOpen);
  };

  const [searchVal, setSearchVal] = useState("");
  const filteredSearchList = response.filter((item) => {
    if (!searchVal) return item;
    else {
      return item.id.includes(searchVal) && item;
    }
  });

  const handleSort = (e) => {
    setSortBy(e.target.value);
  };

  const sortMethods = {
    none: { method: (a, b) => (a.updated_at >= b.updated_at ? -1 : 1) },
    name_asc: { method: (a, b) => (a.id <= b.id ? -1 : 1) },
    name_desc: { method: (a, b) => (a.id >= b.id ? -1 : 1) },
    date_asc: { method: (a, b) => (a.updated_at <= b.updated_at ? -1 : 1) },
    date_desc: { method: (a, b) => (a.updated_at >= b.updated_at ? -1 : 1) },
  };

  const Sort = () => {
    return filteredSearchList.sort(sortMethods[sortBy].method);
  };

  const [showImage, setShowImage] = useState(false);

  const handleShowImage = (e) => {
    setShowImage(true);
  };

  const [isCrop, setCrop] = useState(false);
  const [showBox, setShowBox] = useState(true);
  const [showNumber, setShowNumber] = useState(true);
  const [isHighlight, setHighlight] = useState(false);

  const [baseImg, setBaseImg] = useState({
    width: 0,
    height: 0,
  });

  const baseLandscape = () => {
    return baseImg.width > baseImg.height;
  };

  const isLandscape = () => {
    return currentImage().width > currentImage().height;
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
    setBaseImg({
      width: naturalWidth,
      height: naturalHeight,
    });
  };

  const [cropPos, setCropPos] = useState({
    x: -1,
    y: -1,
  });
  const [cropSize, setCropSize] = useState({
    width: -1,
    height: -1,
  });

  return (
    <Container
      sx={{
        display: "flex",
        width: "100%",
        height: "100%",
        alignItems: "center",
      }}
    >
      <Sidebar onToggle={handleDrawerToggle} />
      {detail && (
        <Box
          sx={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 1000,
            backgroundColor: "#fff",
            boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            px: 3,
            py: 1.5,
          }}
        >
          <Button
            sx={{
              height: 40,
              marginRight: 3,
              borderRadius: 8,
              borderColor: "#4F9CF9",
              color: "#4F9CF9",
              "&:hover": {
                borderColor: "#3B7CD6",
                backgroundColor: "#E6F0FA",
              },
            }}
            size="medium"
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => {
              setDetail(false); // Quay về danh sách hình ảnh trong cùng component
            }}
          >
            Back
          </Button>
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: 3,
            }}
          >
            <FormControlLabel
              control={
                <Switch
                  checked={isCrop}
                  onChange={() => setCrop(!isCrop)}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "#B0BEC5",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: isCrop ? "#4F9CF9" : "#78909C",
                    },
                  }}
                />
              }
              label="Crop"
              sx={{
                color: "#455A64",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showBox}
                  onChange={() => setShowBox(!showBox)}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "#B0BEC5",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: showBox ? "#4F9CF9" : "#78909C",
                    },
                  }}
                />
              }
              label="Show Boxes"
              sx={{
                color: "#455A64",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={showNumber}
                  onChange={() => setShowNumber(!showNumber)}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "#B0BEC5",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: showNumber ? "#4F9CF9" : "#78909C",
                    },
                  }}
                />
              }
              label="Show Numbers"
              sx={{
                color: "#455A64",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={isHighlight}
                  onChange={() => setHighlight(!isHighlight)}
                  sx={{
                    "& .MuiSwitch-track": {
                      backgroundColor: "#B0BEC5",
                    },
                    "& .MuiSwitch-thumb": {
                      backgroundColor: isHighlight ? "#4F9CF9" : "#78909C",
                    },
                  }}
                />
              }
              label="Only Selected"
              sx={{
                color: "#455A64",
                fontFamily: "Inter, sans-serif",
                fontWeight: 500,
              }}
            />
          </Box>
        </Box>
      )}
      <div
        style={{
          paddingTop: detail ? "60px" : "20px",
          paddingBottom: "20px",
          width: "100%",
          height: `calc(100vh - 82px)`,
          display: detail ? "" : "none",
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
          maxWidth: "1200px",
          margin: "0 auto",
        }}
      >
        <Paper
          elevation={3}
          sx={{ height: "100%", marginTop: "52px", borderRadius: 12 }}
        >
          <div
            id="imaged"
            style={{
              padding: "10px",
              paddingBottom: "0px",
              width: "100%",
            }}
          >
            {detail &&
              (loading ? (
                <CircularProgress size="3rem" sx={{}} />
              ) : (
                <img
                  src={imageUrls[curList]}
                  alt=""
                  ref={componentRef}
                  id="border"
                  onLoad={(e) => handleLoadImg(e)}
                  style={{
                    zIndex: -1,
                    width: "calc(100% - 20px)",
                    height: `calc(100vh - ${detailHeight}px - 84px)`,
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
              ))}
            {detail &&
              showBox &&
              currentPrediction() &&
              currentPrediction().map((item, key) => {
                const x =
                  item.x1 / currentRatio() + (size.width - newSize().width) / 2;
                const y =
                  item.y1 / currentRatio() +
                  (size.height - newSize().height) / 2;
                const w = (item.x2 - item.x1) / currentRatio();
                const h = (item.y2 - item.y1) / currentRatio();

                const newX = x >= cropPos.x - 8 ? x : cropPos.x - 8;
                const newY = y >= cropPos.y - 8 ? y : cropPos.y - 8;

                const gapX = cropPos.x + cropSize.width - x - w - 12;
                const gapY = cropPos.y + cropSize.height - y - h - 12;

                const newW =
                  -(x >= cropPos.x - 8 ? 0 : newX - x) +
                  w +
                  (gapX < 0 ? gapX : 0);
                const newH =
                  -(y >= cropPos.y - 8 ? 0 : newY - y) +
                  h +
                  (gapY < 0 ? gapY : 0);

                const hidden =
                  cropPos.x === -1 ? false : newW <= 1 || newH <= 1;

                return (
                  <div
                    className="obj-detect-area"
                    id={key === objNo ? "highlight" : "unhighlight"}
                    style={{
                      position: "absolute",
                      marginLeft:
                        (isCrop ? newX : x) - 1.5 + (isDrawerOpen ? -90 : 0),
                      marginTop: (isCrop ? newY : y) - size.height - 6,
                      width: isCrop ? newW : w,
                      height: isCrop ? newH : h,
                      alignItems: "center",
                      display:
                        (!isHighlight || key === objNo) && (!isCrop || !hidden)
                          ? ""
                          : "none",
                    }}
                    onClick={() => {
                      setObjNo(key);
                    }}
                  >
                    {(!isHighlight || key === objNo) &&
                      (!isCrop || !hidden) &&
                      showNumber &&
                      key + 1}
                  </div>
                );
              })}
            {detail && isCrop && (
              <Rnd
                default={{
                  x: 18 + (size.width - newSize().width) / 2,
                  y: 18,
                  width: newSize().width + 4,
                  height: newSize().height + 4,
                }}
                position={{
                  x:
                    cropPos.x === -1
                      ? 8 + (size.width - newSize().width) / 2
                      : cropPos.x,
                  y: cropPos.y === -1 ? 8 : cropPos.y,
                }}
                size={{
                  width:
                    cropSize.width === -1
                      ? newSize().width + 4
                      : cropSize.width,
                  height:
                    cropSize.height === -1
                      ? newSize().height + 4
                      : cropSize.height,
                }}
                onDragStop={(e, d) => {
                  setCropPos({ x: d.x, y: d.y });
                }}
                onResizeStop={(e, direction, ref, delta, position) => {
                  setCropSize({
                    width: parseInt(ref.style.width, 10),
                    height: parseInt(ref.style.height, 10),
                  });
                  setCropPos(position);
                }}
                bounds="parent"
                style={{
                  border: "3px solid #4F9CF9",
                  background: "none",
                }}
              />
            )}
          </div>
          {detail && (
            <TableContainer
              component={Paper}
              sx={{
                width: "100%",
                mt: 2,
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
                        {current()
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
                        <TextField
                          type="number"
                          value={objCount() ? objNo + 1 : 0}
                          onChange={(e) => handleObjChange(e)}
                          inputProps={{ min: 1 }}
                          sx={{
                            width: "80px",
                            "& .MuiInputBase-input": {
                              textAlign: "center",
                              fontFamily: "Inter, sans-serif",
                              fontWeight: 500,
                              color: "#455A64",
                              padding: "4px 6px",
                            },
                            "& .MuiOutlinedInput-root": {
                              borderRadius: 4,
                              backgroundColor: "#fff",
                              "& fieldset": {
                                borderColor: "#B0BEC5",
                              },
                              "&:hover fieldset": {
                                borderColor: "#4F9CF9",
                              },
                              "&.Mui-focused fieldset": {
                                borderColor: "#4F9CF9",
                              },
                            },
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
                          ? (
                              currentPrediction()[objNo].confidence * 100
                            ).toFixed(2)
                          : "--"}
                        %
                      </Typography>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Paper>
      </div>
      <div
        style={{
          paddingTop: "20px",
          paddingBottom: "20px",
          width: "calc(100%)",
          display: detail ? "none" : "",
          marginLeft: isDrawerOpen ? "240px" : "60px",
          transition: "margin-left 0.3s ease",
        }}
      >
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
          Image List
        </Typography>
        <Box
          sx={{
            height: 55,
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            mb: 2,
            gap: 2,
            flexWrap: "wrap",
          }}
        >
          <CustomTextField
            variant="outlined"
            placeholder="Search by ID..."
            sx={{
              width: { xs: "100%", sm: "calc(100% - 320px)" },
              flexGrow: 1,
            }}
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: "#757575" }} />
                  </InputAdornment>
                ),
              },
            }}
          />
          <FormControl sx={{ minWidth: 150, flexShrink: 0 }}>
            <InputLabel
              id="sort-by-label"
              sx={{ color: "#757575", "&.Mui-focused": { color: "#4F9CF9" } }}
            >
              Sort by
            </InputLabel>
            <CustomSelect
              labelId="sort-by-label"
              value={sortBy}
              onChange={(e) => handleSort(e)}
              label="Sort by"
              IconComponent={MoreVertIcon}
            >
              <MenuItem value="name_asc">Name (Ascendance)</MenuItem>
              <MenuItem value="name_desc">Name (Descendance)</MenuItem>
              <MenuItem value="date_asc">Date (Ascendance)</MenuItem>
              <MenuItem value="date_desc">Date (Descendance)</MenuItem>
            </CustomSelect>
          </FormControl>
        </Box>
        <Paper
          elevation={3}
          sx={{
            width: "100%",
            borderRadius: 16,
            overflow: "hidden",
            background: "linear-gradient(135deg, #ffffff 0%, #f5f5f5 100%)",
          }}
        >
          {!detail &&
            Sort().map((item, key) => {
              if (page * 5 <= key && key < page * 5 + 5) {
                return (
                  <CustomListItem
                    key={item.id}
                    sx={{
                      padding: "12px 16px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <a href={`#detail&${item.id}`}>
                      <img
                        src={imageUrls[key - page * 5]}
                        style={{
                          width: 80,
                          height: 80,
                          objectFit: "cover",
                          borderRadius: 8,
                          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                        }}
                        onClick={() => handleImageDetail(key)}
                        alt=""
                      />
                    </a>
                    <ListItemText
                      href={`#detail&${item.id}`}
                      primary={`#${item.id}`}
                      sx={{
                        marginLeft: 2,
                        height: 80,
                        display: "flex",
                        alignItems: "center",
                        paddingTop: 0,
                      }}
                      onClick={() => handleImageDetail(key)}
                    />
                    <IconButton
                      aria-label="delete"
                      size="large"
                      onClick={(e) => handleDialog(e, key - page * 5)}
                      sx={{ color: "#d32f2f" }}
                    >
                      <DeleteIcon />
                    </IconButton>
                    <IconButton
                      aria-label="more"
                      size="large"
                      onClick={(e) => {
                        handleClick(e);
                        setCurList(key - page * 5);
                      }}
                      sx={{ color: "#757575" }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                    <Menu
                      id="basic-menu"
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      PaperProps={{
                        sx: {
                          borderRadius: 12,
                          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                        },
                      }}
                    >
                      <MenuItem
                        onClick={handleClose}
                        sx={{ "&:hover": { background: "#f5f5f5" } }}
                      >
                        Rename
                      </MenuItem>
                      <MenuItem
                        onClick={(e) => {
                          handleClose();
                          handleShowImage(e);
                        }}
                        sx={{ "&:hover": { background: "#f5f5f5" } }}
                      >
                        Show Image
                      </MenuItem>
                    </Menu>
                  </CustomListItem>
                );
              } else return null;
            })}
          <Box
            sx={{
              p: 2,
              display: "flex",
              justifyContent: "center",
              background: "linear-gradient(135deg, #ffffff 0%, #f0f0f0 100%)",
            }}
          >
            <CustomPagination
              count={~~(filteredSearchList.length / 5)}
              page={page + 1}
              onChange={handlePageChange}
              size="large"
              color="primary"
              siblingCount={1}
              boundaryCount={1}
            />
          </Box>
          <Dialog
            open={Boolean(dialog)}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            PaperProps={{
              sx: { borderRadius: 16, p: 2 },
            }}
          >
            <DialogTitle
              id="alert-dialog-title"
              sx={{ fontWeight: 600, color: "#d32f2f" }}
            >
              {"Warning"}
            </DialogTitle>
            <DialogContent>
              <img
                src={imageUrls[curList]}
                style={{
                  width: 80,
                  height: 80,
                  objectFit: "cover",
                  borderRadius: 8,
                }}
                alt=""
              />
              <DialogContentText
                id="alert-dialog-description"
                sx={{ mt: 1, color: "#333" }}
              >
                Are you sure to delete <br />#
                {current() ? current().id : "placeholder"}?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => {
                  handleClose();
                  handleDelete(current() ? current().index : 0);
                }}
                variant="contained"
                color="error"
                sx={{ borderRadius: 12 }}
              >
                Yes
              </Button>
              <Button
                onClick={handleClose}
                variant="outlined"
                sx={{ borderRadius: 12 }}
                autoFocus
              >
                No
              </Button>
            </DialogActions>
          </Dialog>
          <Backdrop
            sx={(theme) => ({
              color: "#fff",
              zIndex: theme.zIndex.drawer + 1,
              background: "rgba(0, 0, 0, 0.7)",
            })}
            open={showImage}
            onClick={handleClose}
          >
            <img
              src={imageUrls[curList]}
              alt=""
              ref={componentRef}
              id="border"
              onLoad={(e) => handleLoadImg(e)}
              onClick={(e) => {}}
              style={{
                width: "calc(100% - 40px)",
                height: `calc(100vh - ${detailHeight}px - 84px)`,
                objectFit: "contain",
                imageOrientation: "from-image",
                borderRadius: 12,
                boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              }}
            />
          </Backdrop>
        </Paper>
      </div>
    </Container>
  );
};

export default ImgProcess;
