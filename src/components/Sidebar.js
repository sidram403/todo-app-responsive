import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import ChecklistIcon from "@mui/icons-material/Checklist";
import TimerIcon from "@mui/icons-material/Timer";
import RestoreFromTrashIcon from "@mui/icons-material/RestoreFromTrash";
import '../App.css'

const drawerWidth = 240;

export default function Sidebar() {
 
  return (
      <Drawer
        variant="permanent"
        className="drawer"
        
      >
        <Toolbar />
        <Box sx={{ overflow: "auto" }}>
          <List>
            {["Add List", "Reminder", "Trash"].map((text, index) => (
              <ListItem key={text} disablePadding >
                <ListItemButton>
                  <ListItemIcon >
                    {index === 0 && <ChecklistIcon />}
                    {index === 1 && <TimerIcon />}
                    {index === 2 && <RestoreFromTrashIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
        </Box>
      </Drawer>
      
  );
}
