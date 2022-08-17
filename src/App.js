import Box from "@mui/material/Box";
import { useState } from "react";
import "./App.css";
import Form from "./components/Form";

function App() {
  const [formId, setFormId] = useState(1);
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <Form key={formId} resetForm={() => setFormId(formId + 1)} />
      </Box>
    </div>
  );
}

export default App;
