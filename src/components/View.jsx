import React from "react";
import PropTypes from "prop-types";

function ResultView({ history, output }) {
  // change color to red if error occurred
  let colorStyle = {
    color: output === "Error" ? "#f11" : "#fff",
  };

  return (
    <div style={colorStyle} className="result">
      <div className="result__history">{history}</div>
      <div className="result__output">{output}</div>
    </div>
  );
}

ResultView.propTypes = {
  history: PropTypes.string,
  output: PropTypes.string,
};

export default ResultView;
