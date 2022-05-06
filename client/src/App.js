import "./App.css";
import React, { useEffect } from "react";
import axios from "axios";
import { Button } from "@mui/material";
function App() {
  useEffect(() => {
    axios
      .get("http://localhost:3001/test")
      .then((data) => {
        console.log({ data });
      })
      .catch((e) => {
        console.error(e);
      });
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <Button>Click Me</Button>
      </header>
    </div>
  );
}

export default App;
