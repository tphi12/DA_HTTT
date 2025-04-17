import React, { useState } from "react";
import Header from "../../components/Header/Header";
import Content1 from "../../components/Content/Content1";
import Footer from "../../components/Footer/Footer";
import PlanPricing from "../../components/Content/planPricing";
import Content2 from "../../components/Content/Content2";
import Content3 from "../../components/Content/Content3";

function Home() {
  return (
    <div className="home">
      <Header />
      <Content1 />
      <PlanPricing />
      <Content2 />
      <Content3 />
      <Footer />
    </div>
  );
}
export default Home;
