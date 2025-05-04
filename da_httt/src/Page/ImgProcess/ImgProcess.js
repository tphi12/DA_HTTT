import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';

import { 
    CircularProgress,
    Typography,
    Pagination,
    Container,
    Select, 
    Paper,
    Box,
    Stack,
    Switch,
    Backdrop,
    TextField,
    InputLabel, 
    Menu, MenuItem,
    Button, IconButton,
    ListItem, ListItemText,
    FormControl, FormControlLabel, 
    Dialog, DialogTitle, DialogActions, DialogContent, DialogContentText,   
} from "@mui/material";

import {
    Delete as DeleteIcon,
    MoreVert as MoreVertIcon,
    ArrowBack as ArrowBackIcon,
    Paragliding,
} from "@mui/icons-material";

import { Rnd } from "react-rnd";

import apiClient from "../../api/config/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../index.css";

const ImgProcess = () => {
    const navigate = useNavigate();

    const [ response, setResponse ] = useState([]);

    const [ loading, setLoading ] = useState(true);
    const [ error, setError ] = useState(null);

    const detailHeight = 140;

    const [ index, setIndex ] = useState(0);
    const [ objNo, setObjNo ] = useState(0);

    const [ detail, setDetail ] = useState(false);
  
    const objCount = () => {
        return current() ? currentPrediction().length : 0;
    }

    const current = () => {
        return filteredSearchList ? (Sort()[index] ? Sort()[index] : null) : null;
    }

    const currentImage = () => {
        return current() ? current().count_result.image : null;
    }

    const newSize = () => {
        return {
            width: currentImage().width / currentRatio(),
            height: currentImage().height / currentRatio()
        }
    }

    const currentPrediction = () => {
        return current() ? current().count_result.predictions : [];
    }
 
    const componentRef = useRef(null);
    const [size, setSize] = useState({ 
        width: 0, 
        height: 0
    });

    const handleLoadImg = (e) => {
        if (componentRef.current) {
            setSize({
                width: componentRef.current.offsetWidth,
                height: componentRef.current.offsetHeight,
            });
        }
        handleBaseImg(e);
    }

    useEffect(() => {
        const updateSize = () => {
            if (componentRef.current) {
                setSize({
                    width: componentRef.current.offsetWidth,
                    height: componentRef.current.offsetHeight,
                });
            }
        };

        updateSize(); // Initial
        window.addEventListener('resize', updateSize);

        return () => window.removeEventListener('resize', updateSize);
    }, []);

    const currentRatio = () => {
        const imageRatio = currentImage().width / currentImage().height;
        const borderRatio = size.width / size.height;
        return (borderRatio / imageRatio > 1 ? currentImage().height / size.height
            : currentImage().width / size.width);
    }

    const handleImageDetail = (value) => {
        setDetail(true);
        setIndex(value);
        setCurList(value - page * 5)
        setObjNo(0);
    }

    useEffect(() => {
        const handleProcess = async () => {
            try {    
                const image_list = JSON.parse(localStorage.getItem("image_list")) || [
                    {
                        'id': '2f4abecd-edc8-4144-9397-63c709194676'
                    }, 
                    {
                        'id': '76f12786-472e-4121-80c6-a3c8e55d2f43'
                    },
                    {
                        'id': '698f03cc-618d-4c8b-9343-14556db3a391'
                    },
                ];

                if (!image_list) {
                    throw new Error('Network response was not ok');
                }

                const newList = (image_list
                    .filter((item) => Boolean(item.count_result)))
                    .map((item, key) => ({
                    ...item, index: key
                }))

                setResponse(newList);

            } catch (err) {
                setError('An error occurred: ' + err.message); // Nếu có lỗi xảy ra
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        if (loading) handleProcess();
    }, [error]);

    const handleObjChange = (e) => {
        const newValue = parseInt(e.target.value, 10);
        setObjNo(isNaN(newValue) || newValue <= 0 ? objNo : 
            (((newValue - 1) / objCount()) < 1) * (newValue - 1) % objCount() + (((newValue - 1) / objCount()) >= 1) * (objCount() - 1));
    };

    const dateOutput = (input) => {
        let date = input.substring(8, 10);
        let month = input.substring(5, 7);
        let year = input.substring(0, 4);
        let hour = input.substring(11, 19);

        return date + '-' + month + '-' + year + ' ' + hour;
    }

    //Page navigation
    const [ page, setPage ] = useState(0);

    const handlePageChange = (e, value) => {
        setPage(value - 1);
        navigate(`#page${value}`);
    }  

    const [ imageUrls, setImageUrls ] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = {};
        
            await Promise.all(
                Sort()
                .filter((item, key) => (page * 5 <= key && key < page * 5 + 5))
                .map(async (item, key) => {

                try {
                    const response = await apiClient.get(`/api/files/image/${item.id}`, {
                      responseType: 'blob',
                    });
                    const blob = await response.data;
                    const newBlob = blob.slice(0, blob.size, 'image/jpeg');
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
            // cleanup all blob URLs when unmounting
            Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [response, page]);

    const [ anchorEl, setAnchorEl ] = useState(null);
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

    const [ curList, setCurList ] = useState(0);
    const [ dialog, setDialog ] = useState(null);
    const handleDialog = (e, value) => {
        setDialog(e.currentTarget);
        setCurList(value);
    }

    const handleDelete = () => {
        
    }

    const [ sortBy, setSortBy ] = useState("date_desc");

    //Sidebar
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
      const handleDrawerToggle = (isOpen) => {
        setIsDrawerOpen(isOpen);
    };

    //Searchbar
    const [searchVal, setSearchVal] = useState("");
    const filteredSearchList = response.filter((item) => {
        if (!searchVal) return item;
            else {
                return item.id.includes(searchVal) && item;
            }
    });
    
    const handleSort = (e) => {
        setSortBy(e.target.value);
    }

    const sortMethods = {
        none: { method: (a, b) => null },
        name_asc: { method: (a, b) => (a.id < b.id ? -1 : 1) },
        name_desc: { method: (a, b) => (a.id > b.id ? -1 : 1) },
        date_asc: { method: (a, b) => (a.updated_at < b.updated_at ? -1 : 1) },
        date_desc: { method: (a, b) => (a.updated_at > b.updated_at ? -1 : 1) },
    };

    const Sort = () => {
        return filteredSearchList.sort(sortMethods[sortBy].method);
    }

    const [ showImage, setShowImage ] = useState(false);

    const handleShowImage = (e) => {
        setShowImage(true);
    }

    const [ isCrop, setCrop ] = useState(false);
    const [ showBox, setShowBox ] = useState(true);
    const [ showNumber, setShowNumber ] = useState(true);
    const [ isHighlight, setHighlight ] = useState(false);

    //Dealing with backend fault about image being rotated for no reason
    const [ baseImg, setBaseImg ] = useState({
        width: 0, height: 0,
    })

    const baseLandscape = () => {
        return baseImg.width > baseImg.height;
    }

    const isLandscape = () => {
        return currentImage().width > currentImage().height;
    }

    const handleRotate = () => {
        return baseImg.width === baseImg.height ? false : ((baseLandscape() || isLandscape()) && (!baseLandscape() || !isLandscape()));
    }

    const handleScale = () => {
        return handleRotate() ? baseImg.height / currentImage().height : 1;
    }

    const handleBaseImg = (e) => {
        const { naturalHeight, naturalWidth } = e.target;
        setBaseImg({
            width: naturalWidth,
            height: naturalHeight,
        })
    } 

    //Crop machenic
    const [ cropPos, setCropPos ] = useState({
        x:-1, y:-1, 
    })
    const [ cropSize, setCropSize ] = useState({
        width: -1, height: -1,
    })    

    return (
        <Container sx={{  
            display: "flex", 
            width: "100%", 
            height: "100%",
            alignItem: 'center', 
        }}>
            <Sidebar onToggle={handleDrawerToggle} />
            { detail && (<Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, zIndex: 1000 }}>
                <Button 
                    sx={{ 
                        position: 'absolute',
                        height: 40, 
                        marginTop: 3, 
                        marginLeft: isDrawerOpen ? 30 : 7.5, 
                        transition: "margin-left 0.3s ease", 
                    }} 
                    size='medium'
                    variant="outlined" 
                    startIcon={<ArrowBackIcon/>}
                    href="javascript:history.back()"
                    onClick={() => {setDetail(false)}}
                >
                    Back
                </Button>
                <Box sx={{ 
                    position: "absolute",
                    justifyContent: "space-between", 
                    mb: 4,
                    marginTop: 3,
                    marginLeft: `calc(${size.width}px - 480px)`, 
                    }}>
                    <FormControlLabel
                        control={
                            <Switch checked={isCrop}
                                onChange={() => setCrop(!isCrop)}/>
                        }
                        label="Crop"
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={showBox}
                                onChange={() => setShowBox(!showBox)}/>
                        }
                        label="Show Boxes"
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={showNumber}
                                onChange={() => setShowNumber(!showNumber)}/>
                        }
                        label="Show Numbers"
                    />
                    <FormControlLabel
                        control={
                            <Switch checked={isHighlight}
                                onChange={() => setHighlight(!isHighlight)}/>
                        }
                        label="Only selected"
                    />
                </Box>
            </Box>)}
            <div style={{ 
                paddingTop: "20px", paddingBottom: "20px",
                width: 'calc(100%)', 
                height: `calc(100vh - 82px)`,
                display: detail ? '' : 'none',
                marginLeft: isDrawerOpen ? "240px" : "60px", 
                transition: "margin-left 0.3s ease", 
                }}>
                <Paper elevation={3} sx={{ height: `100%`, marginTop: '52px' }}>
                    <div id='imaged'
                        style={{ 
                            padding: "10px", 
                            paddingBottom: "0px", 
                            width: '100%', 
                        }}
                    >
                        {detail && (loading ? <CircularProgress size="3rem" sx={{}}/> 
                            : <img src={imageUrls[curList]} 
                            alt="" ref={componentRef}
                            id="border"
                            onLoad={(e) => handleLoadImg(e)}
                            style={{ zIndex: -1,
                                width: 'calc(100% - 20px)',
                                height: `calc(100vh - ${detailHeight}px - 84px)`,
                                objectFit: 'contain',
                                imageOrientation: 'from-image',
                                transform: `rotate(${handleRotate() ? (baseLandscape() ? '90deg' : '270deg') : '0deg'}) scale(${handleScale()},${handleScale()})`,
                            }} 
                        />)}
                        { detail && showBox && (currentPrediction() && currentPrediction().map((item, key) => {

                            const x = item.x1 / currentRatio() + (size.width - newSize().width) / 2;
                            const y = item.y1 / currentRatio() + (size.height - newSize().height) / 2;
                            const w = (item.x2 - item.x1) / currentRatio();
                            const h = (item.y2 - item.y1) / currentRatio();

                            const newX =   (x >= cropPos.x - 18) ? x : (cropPos.x - 18);
                            const newY =   (y >= cropPos.y - 18) ? y : (cropPos.y - 18);
                            
                            const gapX = cropPos.x + cropSize.width  - x - w - 22;
                            const gapY = cropPos.y + cropSize.height - y - h - 22;

                            const newW = -((x >= cropPos.x - 18) ? 0 : (newX - x)) + w + (gapX < 0 ? gapX : 0);
                            const newH = -((y >= cropPos.y - 18) ? 0 : (newY - y)) + h + (gapY < 0 ? gapY : 0);

                            const hidden = cropPos.x === -1 ? false : ( newW <= 1 || newH <= 1 );

                            return (
                                <div className="obj-detect-area"
                                    id={key === objNo ? 'highlight' : 'unhighlight'} 
                                    style={{
                                        position: 'absolute',
                                        marginLeft: (isCrop ? newX : x) - 1.5 + (isDrawerOpen ? -90 : 0), 
                                        marginTop: (isCrop ? newY: y) - size.height - 6,
                                        width: isCrop ? newW : w,
                                        height: isCrop ? newH : h,
                                        alignItems: 'center',
                                        display: ((!isHighlight || (key === objNo)) && (!isCrop || !hidden)) ? "" : "none",
                                    }}
                                    onClick={() => {setObjNo(key)}}
                                >
                                    {(!isHighlight || (key === objNo)) && (!isCrop || !hidden) && showNumber && (key + 1)}
                                </div>
                            );
                        }))}
                        { detail && isCrop &&  (
                            <Rnd
                                default={{
                                    x: 18 + (size.width - newSize().width) / 2,
                                    y: 18,
                                    width: newSize().width + 4,
                                    height: newSize().height + 4,
                                }}

                                position={{ 
                                    x: (cropPos.x === -1) ? 8 + (size.width - newSize().width) / 2 : cropPos.x, 
                                    y: (cropPos.y === -1) ? 8                                      : cropPos.y,
                                }}
                                
                                size={{ 
                                    width:  (cropSize.width === -1)  ? newSize().width + 4 : cropSize.width, 
                                    height: (cropSize.height === -1) ? newSize().height + 4: cropSize.height, 
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
                                    border: "3px solid #4A90E2", 
                                    background: "none"
                                }}
                            />
                        )}
                    </div> 
                    { detail && (<div style={{ display: 'flex', paddingLeft: "20px", width: "100%", height: `${detailHeight}px` }}>
                        ID: {current() ? current().id : 'error'} <br/>
                        Status: {current() ? current().status : 'error'}<br/>
                        Created at: {current() ? dateOutput(current().created_at) : 'error'}<br/>
                        Updated at: {current() ? dateOutput(current().updated_at) : 'error'}<br/>              
                        <div style={{ position: 'absolute', marginLeft: '260px' }}><br/>
                            Size: {current() ? 
                                `${currentImage().width} x ${currentImage().height}`
                                : '--'}<br/>
                            Count: {objCount() || 0}<br/>             
                        </div>
                        <div style={{ position: 'absolute', marginLeft: '400px' }}><br/>
                            Object:&nbsp;
                            <input
                                type="number"
                                value={objCount() ? objNo + 1 : 0}
                                onChange={(e) => handleObjChange(e)}
                                min="1"
                                style={{ width: '50px', textAlign: 'center' }}
                            />&nbsp;<br/>
                            Area: {objCount() ?
                                `(${currentPrediction()[objNo].x1.toFixed(1)}, ${currentPrediction()[objNo].y1.toFixed(1)})
                                (${currentPrediction()[objNo].x2.toFixed(1)}, ${currentPrediction()[objNo].y2.toFixed(1)})`
                                : '--'}<br/>    
                            Class: {objCount() ? currentPrediction()[objNo].class : '--'}<br/>        
                            Confidence score: {objCount() ? (currentPrediction()[objNo].confidence * 100).toFixed(2) : '--'}%<br/>    
                        </div>
                    </div>  
                    )}        
                </Paper>
            </div> 
            <div style={{ 
                paddingTop: "20px", 
                paddingBottom: "20px", 
                width: "calc(100%)", 
                display: detail ? 'none' : '',
                marginLeft: isDrawerOpen ? "240px" : "60px", 
                transition: "margin-left 0.3s ease", 
                }}>
                <Typography variant="h5" gutterBottom>
                    Image List
                </Typography>
                <Box spacing={3} direction="row"
                    sx={{ height: 55, width: "100%", display: "flex", justifyContent: "space-between", mb: 2 }}>
                    <TextField
                        variant="outlined"
                        placeholder="Search"
                        sx={{ width: "calc(100% - 320px)" }}
                        onChange={e => setSearchVal(e.target.value)} 
                    />
                    <FormControl sx={{ minWidth: 120 }}>
                        <InputLabel>Sort by</InputLabel>
                            <Select
                                value={sortBy}
                                onChange={(e) => {handleSort(e)}}
                                label="Sort by"
                            >
                                <MenuItem value="name_asc">Name (Ascendance)</MenuItem>
                                <MenuItem value="name_desc">Name (Descendance)</MenuItem>
                                <MenuItem value="date_asc">Date (Ascendance)</MenuItem>
                                <MenuItem value="date_desc">Date (Descendance)</MenuItem>
                            </Select>
                    </FormControl>
                </Box>
                <Paper elevation={3} 
                    sx={{  
                        width: '100%',
                    }}>
                        {!detail && Sort().map((item, key) => {
                        if (page * 5 <= key && key < page * 5 + 5) {
                            return (
                                <div style={{
                                    borderBottom: '1px solid #dddddd'
                                }}>
                                <ListItem
                                    sx={{}}
                                    >
                                    <a href={`#detail&${item.id}`}>
                                        <img src={imageUrls[key - page * 5]}  
                                            style={{ 
                                                width: 60, 
                                                height: 60,
                                                objectFit: 'cover'
                                            }}
                                            onClick={() => {handleImageDetail(key)}}
                                            alt=""
                                        />
                                    </a>
                                    <ListItemText 
                                        href={`#detail&${item.id}`}
                                        primary={`#${item.id}`} 
                                        sx={{ marginLeft: 1, height: 40, paddingTop: "15px" }}
                                        onClick={() => handleImageDetail(key)}
                                    />
                                    <IconButton aria-label="delete" size="large"
                                        onClick={(e) => handleDialog(e, key - page * 5)}>
                                        <DeleteIcon />
                                    </IconButton>
                                    <IconButton aria-label="more" size="large"
                                        onClick={(e) => {handleClick(e); setCurList(key - page * 5)}}>
                                        <MoreVertIcon />
                                    </IconButton>
                                    <Menu
                                        id="basic-menu"
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleClose}
                                    >
                                        <MenuItem onClick={handleClose}>Rename</MenuItem>
                                        <MenuItem onClick={(e) => {handleClose(); handleShowImage(e)}}>Show Image</MenuItem>
                                    </Menu>
                                </ListItem>
                                </div>
                            );
                        }
                    else return;
                    })}
                <Pagination count={~~(response.length / 5)} page={page + 1} onChange={handlePageChange} />
                <Dialog
                    open={Boolean(dialog)}
                    onClose={handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">
                        {"Warning"}
                    </DialogTitle>
                    <DialogContent>
                        <img src={imageUrls[curList]}  
                            style={{ width: 60, height: 60, objectFit: 'cover' }}
                            alt=""/>
                            <DialogContentText id="alert-dialog-description">
                                Are you sure to delete <br/>
                                #{current() ? current().id : "placehoder"}?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => {handleClose(); handleDelete(current() ? current().index : 0)}}>Yes</Button>
                            <Button onClick={handleClose} autoFocus>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Backdrop
                        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
                        open={showImage}
                        onClick={handleClose}
                    >
                        <img src={imageUrls[curList]} 
                            alt="" ref={componentRef }
                            id="border"
                            onLoad={(e) => handleLoadImg(e)}
                            onClick={(e) => {}}
                            style={{ 
                                width: 'calc(100% - 20px)',
                                height: `calc(100vh - ${detailHeight}px - 64px)`,
                                objectFit: 'contain',
                                imageOrientation: 'from-image'
                            }} 
                        />
                    </Backdrop>
                </Paper> 
            </div>
        </Container>
    )

};

export default ImgProcess;
