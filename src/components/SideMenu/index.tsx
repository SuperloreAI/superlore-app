import React from "react";
import Link from "next/link";
import { Button } from "antd";

export interface SideMenuItem {
  id: string;
  text: string;
  destination: string;
  disabled: boolean;
}

const menuItems = [
  { id: "1", text: "Create Video", destination: "/canvas", disabled: false },
  {
    id: "2",
    text: "Video History",
    destination: "/videos/history",
    disabled: false,
  },
  {
    id: "3",
    text: "Asset Library",
    destination: "/assets/library",
    disabled: false,
  },
  {
    id: "4",
    text: "Profile Settings",
    destination: "/",
    disabled: true,
  },
];
const logo =
  "https://upload.wikimedia.org/wikipedia/en/thumb/a/a9/TikTok_logo.svg/1200px-TikTok_logo.svg.png";
const SideMenu = () => {
  const onSwitchProfile = () => {
    console.log("onSwitchProfile");
  };
  return (
    <div className="w-400 h-screen bg-gray-100 flex flex-col justify-between">
      <div className="p-4">
        <img src={logo} alt="Logo" className="w-32 h-auto mb-8" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          {menuItems.map((menuItem: SideMenuItem) =>
            menuItem.disabled ? (
              <Button key={menuItem.id} disabled style={{ margin: "20px 0px" }}>
                {menuItem.text}
              </Button>
            ) : (
              <Link
                key={menuItem.id}
                href={menuItem.destination}
                rel="noopener noreferrer"
                style={{ margin: "20px 0px" }}
              >
                <Button>{menuItem.text}</Button>
              </Link>
            )
          )}
        </div>
      </div>
      <div className="p-4">
        <button
          onClick={onSwitchProfile}
          className="text-left w-full text-lg font-medium text-gray-700 hover:text-gray-900 focus:outline-none"
          disabled
        >
          Switch Profile
        </button>
      </div>
    </div>
  );
};

export default SideMenu;
