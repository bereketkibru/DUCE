import React from "react";

export default function Spinner() {
  return (
    <div>
      <img
        src={require("./spinner.gif")}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt="Loading"
      />
    </div>
  );
}
