import React, {useState, useEffect} from "react";
import {
  Add,
  Favorite,
  DeleteOutlineOutlined,
  Archive,
  AccountCircle,
  Home
} from "@mui/icons-material";
import { motion } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";

const Sidebar = ({ handleTogglePopup }) => {
  const navigate = useNavigate()
  const location = useLocation();
  
  const routeColors = {
    "/home": "#333333",
    "/favourites": "#333333",
    "/archive": "#333333",
    "/trashbin": "#333333",
    "/account": "#333333",
  };

  const handleHome = () => {
    navigate("/home")
  }

  const handleFavourite = () => {
    navigate("/favourites")
  }

  const handleArchive = () => {
    navigate("/archive")
  }

  const handleTrash = () => {
    navigate("/trashbin")
  }


  const getIconStyle = (path) => {
    return {
      backgroundColor: location.pathname === path ? routeColors[path] : "transparent",
      borderRadius: "10px"
    };
  };

  return (
    <div className="flex flex-col h-[85vh] bg-gray-700 w-14 items-center space-y-7 ml-3 rounded-xl p-3">

      <motion.div whileHover={{ scale: 1.2 }} onClick={handleTogglePopup}>
        <Add sx={{ fontSize: "30px",cursor: "pointer" }} />
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }} style={getIconStyle("/home")} >
        <Home sx={{ fontSize: "30px", cursor: "pointer"}} onClick={handleHome} />
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }} style={getIconStyle("/favourites")}>
        <Favorite sx={{ fontSize: "30px", cursor: "pointer" }} onClick={handleFavourite}  />
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }}  style={getIconStyle("/archive")}>
        <Archive sx={{ fontSize: "30px", cursor: "pointer" }} onClick={handleArchive} />
      </motion.div>

      <motion.div whileHover={{ scale: 1.2 }} style={getIconStyle("/trashbin")}>
        <DeleteOutlineOutlined sx={{ fontSize: "30px", cursor: "pointer" }} onClick={handleTrash}  />
      </motion.div>

    </div>
  );
};

export default Sidebar;
