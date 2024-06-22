import React, { useState } from "react";
import "./styles/error.css";

export default function ErrorAlert({ value }) {
  const [close, setClose] = useState(false);

  return (
    !close && (
      <div id="errorbox">
        <button id="closeBtn" onClick={() => setClose(true)}>
          x
        </button>
        <p id="errormsg">{value}</p>
      </div>
    )
  );
}
