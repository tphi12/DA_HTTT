import React from "react";
import Header from "./components/Header/Header";
import Content1 from "./components/Content/Content1";
import Footer from "./components/Footer/Footer";
import PlanPricing from "./components/Content/planPricing";
import "./App.css";
import Content2 from "./components/Content/Content2";
import Content3 from "./components/Content/Content3";

function App() {
  return (
    <>
      <Header />
      <Content1 />
      <Content1 />
      <Content1 />
      <Content1 />
      <Content1 />
      <PlanPricing />
      <Content2 />
      <Content3 />
      <Footer />
    </>
  );
}

export default App;
