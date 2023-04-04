import React from "react";
import Button from "@mui/material/Button";



export const HomeButton = () => {
    const routeChange = () =>{ 
        window.location.href = "/";
    }

  return (
    <Button variant="contained" color="primary" sx={{ height: 40, mr: 1 }} onClick={routeChange}>
        Home
    </Button>
  );
};