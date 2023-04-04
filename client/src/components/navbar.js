import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { LoginButton } from "./buttons/login-button";
import { LogoutButton } from "./buttons/logout-button";
import { SignupButton } from "./buttons/signup-button";
import { ProfileButton } from "./buttons/profile-button";
import { HomeButton } from "./buttons/home-button";
import { AdminButton } from "./buttons/admin-button";
import Box from '@mui/material/Box';


export const NavBarButtons = () => {
  const { isAuthenticated } = useAuth0();

  return (
    <Box sx={{display:"flex", justifyContent:"flex-end", alignItems:"flex-end", mr: 6, mt: 2}}>
      
      <>
        <HomeButton />
      </>
      {!isAuthenticated && (
        <>
          <SignupButton />
          <LoginButton />
        </>
      )}
      {isAuthenticated && (
        <>
          <AdminButton />
          <ProfileButton />
          <LogoutButton />
        </>
      )}
    </Box>
  );
};