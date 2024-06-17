import { PiSquaresFour } from "react-icons/pi";
import { IoFastFoodOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { MdOutlineRestaurantMenu } from "react-icons/md";

export const navItems = [
  {
    title: "Menu",
    icon: <IoFastFoodOutline />,
    path: "/menu",
    roles: ["manager", "waiter"]
  },
  {
    title: "Tables",
    icon: <PiSquaresFour />,
    path: "/tables",
    roles: ["manager", "waiter"]
  },
  {
    title: "Orders",
    icon: <MdOutlineRestaurantMenu />,
    path: "/orders",
    roles: ["manager", "cooker"]
  },
  {
    title: "Settings",
    icon: <IoSettingsOutline />,
    path: "/settings",
    roles: ["manager", "waiter", "cooker"]
  },
];
