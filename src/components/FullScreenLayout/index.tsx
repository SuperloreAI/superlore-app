// components/FullScreenLayout.js
import React, { ReactNode } from "react";
import SideMenu from "@/components/SideMenu";

interface FullScreenLayoutProps {
  children: ReactNode;
}
const FullScreenLayout = ({ children }: FullScreenLayoutProps) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        minHeight: "100vh",
        width: "100%",
        maxHeight: "100vh",
        overflow: "hidden",
      }}
    >
      <SideMenu />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
          width: "100%",
          alignItems: "center",
          justifyContent: "flex-start",
          backgroundColor: "white",
          overflowY: "scroll",
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default FullScreenLayout;
