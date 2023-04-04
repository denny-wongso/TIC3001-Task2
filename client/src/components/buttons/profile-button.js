import React from "react";
import Button from "@mui/material/Button";

export const ProfileButton = () => {
    const routeChange = () =>{ 
      window.location.href = "/profile";
    }

  return (
    <Button variant="contained" color="primary" sx={{ height: 40, mr: 1 }} onClick={routeChange}>
        Profile
    </Button>
  );
};