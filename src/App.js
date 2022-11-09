import "./AppStyle.scss";
import { useState } from "react";
import Keyboard from "./components/Keyboard";
import View from "./components/View";

let output = "";
let history = "";
let symbols = ["*", "-", "+", "/"];

function App() {
  const [state, setState] = useState({
    history: "",
    displayValue: "",
  });
  const updateState = () => {
    setState({ history: history.toString(), displayValue: output.toString() });
  };

  const functionKey = (id, lastInput) => {
    const resetOutput = (display) => {
      history = "";
      output = "";
      // Update state if display == true
      display && updateState();
    };
    const calculate = (lastInput) => {
      // Check if last input is number and output is not empty
      if (!symbols.includes(lastInput) && output) {
        try {
          history = output;
          output = eval(output.replace(/%/g, "*0.01"));
          output = Number.isInteger(output) ? output : output.toFixed(3);
          updateState();
          // update history to result and reset output
          history = output;
          output = "";
        } catch (error) {
          output = "Error";
          updateState();
          resetOutput();
        }
      }
    };

    switch (id) {
      case "clear":
        resetOutput(true);
        break;
      case "clearBack":
        output = output.slice(0, -1);
        updateState();
        break;
      case "calc":
        calculate(lastInput);
        break;
      default:
        return;
    }
  };
  const operatorKey = (value, lastInput) => {
    // prevent starting with an operator
    if (output === "" && value !== "-") {
      return;
    } else {
      // replace operator symbol if last input is operator
      symbols.includes(lastInput)
        ? (output = output.slice(0, -1) + value)
        : (output += value);
    }
    updateState();
  };
  const numberKey = (value, lastInput) => {
    // prevent entering . or % multipy times
    if (value === "." || value === "%") {
      // prevent starting with %
      if (output === "" && value === "%") return;
      lastInput === "." || lastInput === "%" || (output += value);
    } else {
      output += value;
    }
    updateState();
  };
  const handleValue = (id, keyType, value) => {
    output = output.toString();

    let lastInput = output.slice(-1);

    switch (keyType) {
      case "function":
        functionKey(id, lastInput);
        break;
      case "operator":
        operatorKey(value, lastInput);
        break;
      case "number":
        numberKey(value, lastInput);
        break;
      default:
        return;
    }
  };

  return (
    <div className="app animate__animated animate__fadeInBottomLeft">
      <div className="container">
        <View history={state.history} output={state.displayValue} />
        <Keyboard onClick={handleValue} />
      </div>
    </div>
  );
}

export default App;
