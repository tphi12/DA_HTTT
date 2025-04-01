import React from "react";
import "./App.css";
import Header from "./components/Header";
//import Footer from "./components/Footer";
//import colors from "./utils/colors";
//import "./styles.css";
function App() {
  return (
    <div className="App">
      <div className="container">
        <Header></Header>
      </div>

      <footer className="footer">
        <p>footer</p>
      </footer>
    </div>
  );
}

export default App;
