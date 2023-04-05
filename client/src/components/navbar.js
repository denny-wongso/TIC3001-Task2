import { useAuth0 } from "@auth0/auth0-react";
import { useState, useEffect } from "react";
import { LoginButton } from "./buttons/login-button";
import { LogoutButton } from "./buttons/logout-button";
import { SignupButton } from "./buttons/signup-button";
import { ProfileButton } from "./buttons/profile-button";
import { HomeButton } from "./buttons/home-button";
import { AdminButton } from "./buttons/admin-button";
import Box from '@mui/material/Box';
import { fetchAdmin } from '../api/admin';



export const NavBarButtons = () => {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [isAdmin, setIsAdmin] = useState(false);

  const checkAuth = async() => {    
    const token = await getAccessTokenSilently();
    checkIfAdmin(token);  
  }

  const checkIfAdmin = async (token) => {
    if ( token !== ""){
      const response = await fetchAdmin(token);
      setIsAdmin(response.status === 200);
    }
    
  };

  useEffect(() => {
    checkAuth()
  }, []);

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
        {isAdmin && (
          <>
            <AdminButton />
          </>
        )}
          <ProfileButton />
          <LogoutButton />
        </>
      )}
    </Box>
  );
};