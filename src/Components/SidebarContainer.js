import { useEffect, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, Typography, useTheme } from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import "react-pro-sidebar/dist/css/styles.css";
import { tokens } from "../theme";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import CloseIcon from "@mui/icons-material/Close";
import { routesConfig } from "./RoutesConfig";
import SidebarBackground from "../Images/SidebarBackground_1.png";

const Item = ({ title, to, icon, onMenuItemClick }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <MenuItem
      active={isActive}
      style={{
        color: isActive ? "#6870fa" : colors.grey[100],
      }}
      onClick={onMenuItemClick}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const SidebarContainer = ({
  userData,
  setCollapsed,
  openFor,
  onMenuItemClick,
}) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const userRole = userData?.role;
  const classTeacherDetails = userData?.class_teacher_details;
  const userRoutes = routesConfig[userRole] || [];

  useEffect(() => {
    if (setCollapsed) {
      setCollapsed(isCollapsed);
    }
  }, [isCollapsed, setCollapsed]);

  return (
    <Box
      className="sideBar h-100"
      sx={{
        "& .pro-sidebar-inner": {
          background: `url(${SidebarBackground})`,
          backgroundRepeat: "round",
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          {openFor === "sidebar" && (
            <MenuItem
              onClick={() => setIsCollapsed(!isCollapsed)}
              icon={isCollapsed ? <MenuOutlinedIcon /> : <CloseIcon />}
              style={{ color: colors.grey[100] }}
            ></MenuItem>
          )}

          <Box>
            {userRoutes.map((item) => (
              // Check if the item route is "teacherDashboard/logBook" and classTeacherDetails exist
              // (item.code !== "logBook" ||
              // (item.code === "logBook" && classTeacherDetails)) && (
              //   <Item
              //     key={item.code}
              //     title={item.title}
              //     to={item.route}
              //     icon={item.icon}
              //     onMenuItemClick={onMenuItemClick}
              //   />
              // )
              <Item
                key={item.code}
                title={item.title}
                to={item.route}
                icon={item.icon}
                onMenuItemClick={onMenuItemClick}
              />
            ))}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};

export default SidebarContainer;
