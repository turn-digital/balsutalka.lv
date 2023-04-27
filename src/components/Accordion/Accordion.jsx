import React, { useState } from "react";
import "./Accordion.css";

function Accordion(props) {
  const [accordionShow, setAccordionShow] = useState(props.defaultState);

  return (
    <div className="accordion-container">
      <div>
        <button
          className={accordionShow ? "accordion active" : "accordion"}
          onClick={() => setAccordionShow(!accordionShow)}
        >
          {props.title}
        </button>
        <div className={accordionShow ? "panel show" : "panel hide"}>
          <p>{props.content}</p>
        </div>
      </div>
    </div>
  );
}

export default Accordion;
