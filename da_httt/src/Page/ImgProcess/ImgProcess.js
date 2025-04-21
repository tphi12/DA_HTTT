import React, { useState, useEffect, useRef } from "react";
import { 
  Container, 
  Paper,
} from '@mui/material';
import ImageIcon from '@mui/icons-material/Image';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
//import apiClient from "../../api/config/axiosConfig";
import "../../index.css";

const ImgProcess = () => {

  const [ response, setResponse ] = useState([]);

  const [ loading, setLoading ] = useState(true);
  const [ error, setError ] = useState(null);

  const detailHeight = 100;

  const [ index, setIndex ] = useState(0);
  const [ objNo, setObjNo ] = useState(0);
  
  const objCount = () => {
    return current() ? currentPrediction().length : 0;
  }

  const current = () => {
    return response ? (response[index] ? response[index] : null) : null;
  }

  const currentImage = () => {
    return current() ? current().count_result.image : null;
  }

  const currentPrediction = () => {
    return current() ? current().count_result.predictions : [];
  }

  const componentRef = useRef(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

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
    setIndex(value);
    setObjNo(0);
  }

  useEffect(() => {

    const handleProcess = async () => {

      console.log("startup have fun\n");
  
      try {
        const token = localStorage.getItem("auth_key");
        const image_list = sessionStorage.getItem("images");
        const images = image_list.map(item => item.id);

        const input = {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
          body: {
            'images': images
          }
        }
  
        const result = await fetch('https://counting.hpcc.vn/api/images/process/', input);

        console.log('lmao');

        if (!result) {
          throw new Error('Network response was not ok');
        }
        setResponse(result);
      } catch (err) {
        setError('An error occurred: ' + err.message); // Nếu có lỗi xảy ra
        console.log('hey there\'re some errors\n');
      } finally {
        setLoading(false);
        console.log('done :)\n');
      }
    };

    handleProcess();
  }, []);

  return (
    <Container sx={{  display: "flex", width: "100vw", height: "100vh" }}>
      <div class="image-list-panel" style={{ padding: "20px", width: "269px" }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <div style={{ padding: '20px'}}>
          {response.map((item, key) => {
            
            return (
              <ListItemButton 
              component="a" href="#simple-list"
              onClick={() => handleImageDetail(key)}>
                <ImageIcon />
                <ListItemText primary={`Image ${key + 1}`} sx={{ marginLeft: 1 }}/>
              </ListItemButton>
            );
          })}
          </div>

        </Paper>
      </div>
      <div class="image-info-panel" style={{ padding: "20px", width: "calc(100vw - 296px)" }}>
        <Paper elevation={3} sx={{ height: '100%' }}>
          <div class='image' id='imaged' style={{ padding: "20px", paddingBottom: "0px", width: '100%', height: `calc(100% - ${detailHeight}px)` }}>
            <img src={current() ? current().image : ""} 
            alt="" ref={componentRef }
            style={{ 
              width: 'calc(100% - 20px)',
              height: `calc(100% - 20px)`,
              objectFit: 'contain'
            }} />
            { currentPrediction && currentPrediction().map((item, key) => {
              return (
                <div class='obj-detect-area' 
                id={key == objNo ? 'highlight' : 'unhighlight'} 
                style={{
                  position: 'absolute',
                  marginLeft: item.x1 / currentRatio() + 20,
                  marginTop: item.y1 / currentRatio() - size.height,
                  width: (item.x2 - item.x1) / currentRatio(),
                  height: (item.y2 - item.y1) / currentRatio(),
                  alignItems: 'center'
                }}
                onClick={() => setObjNo(key)}>
                  {key + 1}
                </div>
              );
            })}
          </div>
          <div class='detail' style={{ display: 'flex', paddingLeft: "20px", width: "100%", height: `${detailHeight}px` }}>
            ID: {current() ? current().id : 'error'}<br/>
            Created at: {current() ? current().created_at : 'error'}<br/>
            Updated at: {current() ? current().updated_at : 'error'}<br/>              
            <div style={{ position: 'absolute', marginLeft: '300px' }}>
              <br/>
              Size: {current() ? 
                      `${currentImage().width} x ${currentImage().height}`
                    : '--'}<br/>
              Count: {objCount() || 0}<br/>             
            </div>
            <div style={{ position: 'absolute', marginLeft: '450px' }}>
              <br/>
              Object: {objCount() ? objNo + 1 : '--'}&nbsp;
              <t onClick={() => setObjNo((objNo - 1) % objCount())}>-</t>&nbsp;
              <t onClick={() => setObjNo((objNo + 1) % objCount())}>+</t>&nbsp;
              <br/>
              Area: {objCount() ?
                      `(${currentPrediction()[objNo].x1.toFixed(1)}, ${currentPrediction()[objNo].y1.toFixed(1)})
                      (${currentPrediction()[objNo].x2.toFixed(1)}, ${currentPrediction()[objNo].y2.toFixed(1)})`
                      : '--'}<br/>             
            </div>
          </div>          
        </Paper>
      </div>
      
    </Container>
  )

};

export default ImgProcess;
