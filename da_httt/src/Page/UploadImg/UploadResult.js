import React, { useState, useEffect, useRef } from "react";

import { 
    CircularProgress,
    Container,
    Paper,
    Box,
    Button,
    Typography,
} from "@mui/material";

import {
    ArrowBack as ArrowBackIcon,
} from "@mui/icons-material";

import apiClient from "../../api/config/axiosConfig";
import Sidebar from "../../components/Sidebar/Sidebar";
import "../../index.css";

const UploadResult = () => {

    const [ response, setResponse ] = useState([]);

    const [ loading, setLoading ] = useState(false);
    const [ error, setError ] = useState(null);

    const detailHeight = 140;

    const [ index, setIndex ] = useState(0);
    const [ objNo, setObjNo ] = useState(0);

    const [ detail, setDetail ] = useState(false);
  
    const objCount = () => {
        return current() ? currentPrediction().length : 0;
    }

    const current = () => {
        return response ? (response[index] ? response[index] : 0) : 0;
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
        setObjNo(0);
    }

    useEffect(() => {
        const handleProcess = async () => {
            try {    
                const token = localStorage.getItem("auth_key");
                if (!token) {
                    throw new Error("No authentication token found. Please log in again.");
                }
                const image_list = JSON.parse(sessionStorage.getItem("images")) || [
                    {
                        'id': 'fd8946b0-6c0d-43f7-bb28-993e635b8fe6'
                    },
                    {
                        'id': '698f03cc-618d-4c8b-9343-14556db3a391'
                    },
                ];
                const images = image_list.map(item => item.id);
                const result = await apiClient.post('/api/images/process/', { 'images': images });

                if (!result) {
                    throw new Error('Network response was not ok');
                }   

                setResponse(result.data);

            } catch (err) {
                setError('An error occurred: ' + err.message); // Nếu có lỗi xảy ra
                console.log(error);
            } finally {

                //Add new images into the image list #fromTuanTruong
                if (!error) {
                    const image_list = JSON.parse(sessionStorage.getItem("image_list"));
                    const newList = [
                        response, ...image_list, 
                    ]
                    localStorage.setItem("image_list", JSON.stringify(newList));
                }

                setLoading(false);
            }
        };

        handleProcess();
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

    const [ imageUrls, setImageUrls ] = useState([]);

    useEffect(() => {
        const fetchImages = async () => {
            const urls = {};
        
            await Promise.all(
                response.map(async (item, key) => {
                if (imageUrls[key]) return;

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
        if (!imageUrls.length) fetchImages();

        
        return () => {
            // cleanup all blob URLs when unmounting
            Object.values(imageUrls).forEach((url) => URL.revokeObjectURL(url));
        };
    }, [response]);

    //Sidebar
    const [isDrawerOpen, setIsDrawerOpen] = React.useState(false);
      const handleDrawerToggle = (isOpen) => {
        setIsDrawerOpen(isOpen);
    };

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

    return (
        <Container sx={{  
            display: "flex", 
            width: `calc(100wh)`, 
            height: "100vh",
            alignItem: 'center', 
        }}>
            <Sidebar onToggle={handleDrawerToggle} />
            <div style={{  
                diplay: 'flex',
                marginLeft: isDrawerOpen ? "240px" : "60px", 
                transition: "margin-left 0.3s ease", 
            }}>
                <Typography variant="h5" gutterBottom>
                    Upload Result
                </Typography>
                <Box sx={{  
                    position: 'absolute',
                    zIndex: 1000,
                }}>
                <Paper elevation={3} 
                    href="#detail"
                    sx={{  
                        diplay: 'flex',
                        width: '720px',
                        height: 60,
                        padding: '10px',
                        zIndex: 1000,
                    }}>
                    <div style={{
                        overflow: 'auto',
                        overflowX: 'auto',
                        overflowY: 'hidden',
                        
                        zIndex: 1000,
                    }}>
                        {response.map((item, key) => {
                            return (
                                <img src={imageUrls[item.index]}  

                                    style={{ 
                                        width: 60, 
                                        height: 60,
                                        objectFit: 'cover',
                                        marginLeft: 5,
                                        zIndex: 1000,
                                    }}
                                    onClick={() => {handleImageDetail(key)}}
                                    alt=""
                                />
                            );
                        })}
                    </div>
                </Paper> 
                </Box>
                <div style={{ 
                    paddingTop: "20px", paddingBottom: "20px",
                    width: 'calc(100%)', 
                    height: `calc(100vh - 82px)`,
                    display: 'flex',
                    marginTop: "80px",
                    transition: "margin-left 0.3s ease",      
                    }}>
                    <Paper elevation={3} sx={{ height: `100%` }}>
                        <div id='imaged'
                            style={{ 
                                padding: "10px", 
                                paddingBottom: "0px", 
                                width: 720, 
                                alignItems: 'center',
                                
                            }}
                        >
                            {loading ? <CircularProgress size="3rem" sx={{}}/> 
                                : <img src={imageUrls[current().index]} 

                                alt="" ref={componentRef}
                                id="border"
                                onLoad={(e) => handleLoadImg(e)}
                                style={{ zIndex: -1,
                                    width: 'calc(100%)',
                                    height: `calc(100vh - ${detailHeight}px - 84px)`,
                                    objectFit: 'contain',
                                    imageOrientation: 'from-image',
                                    transform: `rotate(${handleRotate() ? (baseLandscape() ? '90deg' : '270deg') : '0deg'}) scale(${handleScale()},${handleScale()})`,
                                }} 
                            />}
                            {currentPrediction && currentPrediction().map((item, key) => {

                                const x = item.x1 / currentRatio() + (size.width - newSize().width) / 2;
                                const y = item.y1 / currentRatio() + (size.height - newSize().height) / 2;
                                const w = (item.x2 - item.x1) / currentRatio();
                                const h = (item.y2 - item.y1) / currentRatio();

                                return (
                                    <div className="obj-detect-area"
                                        id={key === objNo ? 'highlight' : 'unhighlight'} 
                                        style={{
                                            position: 'absolute',
                                            marginLeft: x - 1.5 + (isDrawerOpen ? 0 : 0), 
                                            marginTop: y - size.height - 6,
                                            width: w,
                                            height: h,
                                            alignItems: 'center',
                                        }}
                                        onClick={() => {setObjNo(key)}}
                                    >
                                        {key + 1}
                                    </div>
                                );
                            })}
                        </div>
                        <div style={{ display: 'flex', paddingLeft: "20px", width: "100%", height: `${detailHeight}px` }}>
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
                    </Paper>
                </div>
            </div>
        </Container>
    )

};

export default UploadResult;
