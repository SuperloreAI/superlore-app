// components/FullScreenLayout.js
import React, { ReactNode } from "react";

interface FullScreenLayoutProps {
  children: ReactNode;
}
const FullScreenLayout = ({ children }: FullScreenLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        width: "100%",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "white",
      }}
    >
      {children}
    </div>
  );
};

export default FullScreenLayout;
