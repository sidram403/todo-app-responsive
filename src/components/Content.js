import * as React from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import TodoContent from "./TodoContent";
import Sidebar from "./Sidebar";


export default function Content() {
 
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      { <Sidebar />}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <div className="container">
          <TodoContent  />
        </div>
      </Box>
    </Box>
  );
}
