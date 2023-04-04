import React from "react";
import Button from "@mui/material/Button";



export const AdminButton = () => {
    const routeChange = () =>{ 
        window.location.href = "/admin";
    }

  return (
    <Button variant="contained" color="primary" sx={{ height: 40, mr: 1 }} onClick={routeChange}>
        Admin
    </Button>
  );
};