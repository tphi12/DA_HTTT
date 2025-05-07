import { HashRouter, Routes, Route } from 'react-router-dom';
import ImgProcess from "../Page/ImgProcess/ImgProcess";

const HashRouting = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/images/#page" element={<ImgProcess/>} />
        <Route path="/#detail" element={<ImgProcess/>} />
      </Routes>
    </HashRouter>
  );
}

export default HashRouting;