import React from "react";
import { NavBarButtons } from "./navbar";
export const PageLayout = ({ children }) => {
  return (
    <div className="page-layout">
      <NavBarButtons />
      <div className="page-layout__content">{children}</div>
    </div>
  );
};