import Accordion from "../Accordion/Accordion.jsx";
import React from "react";

const Section3 = (props) => {
  console.log("section3");

  return (
    <div className="accordion">
      <Accordion client:load />
    </div>
  );
};

export default Section3;
