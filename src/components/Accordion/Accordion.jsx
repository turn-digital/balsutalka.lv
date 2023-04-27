import React, { useState } from "react";
import "./Accordion.css";

function Accordion() {
  const [activeIndex, setActiveIndex] = useState(null);

  const handleAccordionClick = (index) => {
    if (index === activeIndex) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  return (
    <div className="accordion-container">
      <h2>Accordion</h2>
      {[1, 2, 3].map((sectionIndex) => (
        <div key={sectionIndex}>
          <button
            className={
              activeIndex === sectionIndex ? "accordion active" : "accordion"
            }
            onClick={() => handleAccordionClick(sectionIndex)}
          >
            Section {sectionIndex}
          </button>
          <div
            className={
              activeIndex === sectionIndex ? "panel show" : "panel hide"
            }
          >
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat.
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Accordion;
