import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Route, Routes } from "react-router-dom";
import { PageLoader } from "./pages/page-loader";
import { Home } from "./pages/Home";
import { NotFound }  from "./pages/NotFound";
import { CallbackPage } from "./pages/callback-page";
import { ProfilePage } from "./pages/Profile";
import { Admin } from "./pages/Admin";

import { AuthenticationGuard } from "./components/authentication-guard";


export const App = () => {
    const { isLoading } = useAuth0();

    if (isLoading) {
      return (
        <div className="page-layout">
          { <PageLoader /> }
        </div>
      );
    }
  return (
    
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profile" element={<AuthenticationGuard component={ProfilePage} />}/>
        <Route path="/admin" element={<AuthenticationGuard component={Admin} />}/>
        <Route path="/callback" element={<CallbackPage />} />
        <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
