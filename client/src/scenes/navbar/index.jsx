// Navbar.js
import { useState } from "react";
import {
  Box,
  IconButton,
  Typography,
  MenuItem,
  Menu,
  useMediaQuery,
} from "@mui/material";
import { Menu as MenuIcon, Close, Search } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../state";
import { useNavigate } from "react-router-dom";
import FlexBetween from "../../components/FlexBetween";
import {motion} from "framer-motion"

const Navbar = ({handleSearch}) => {
  const [isMobileMenuToggled, setIsMobileMenuToggled] = useState(false);
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const isNonMobileScreens = useMediaQuery("(min-width: 1000px)");

  const background = "#333333";
  const alt = "#181820";

  const fullName = `${user.firstName} ${user.lastName}`;

  const ProfileCircle = ({ fullName }) => {
    const firstLetter = fullName.charAt(0).toUpperCase();

    return (
      <motion.div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "35px",
          height: "35px",
          borderRadius: "50%",
          backgroundColor: "black",
          outline: "3px solid #545454",
          transition: "outline-color 0.2s",
          cursor: "pointer",
          "&:hover": {
            outlineColor: "#ffffff",
          },
        }}
        whileHover={{scale: 1.1}}
      >
        <p className="text-[22px] text-[#ffffff] font-medium ">
          {firstLetter}
        </p>
      </motion.div>
    );
  };

  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };

  return (
    <FlexBetween padding="1rem 6%" backgroundColor={alt}>
      <FlexBetween gap="1.75rem">
        <Typography
          className="name-link"
          fontWeight="bold"
          fontSize="clamp(1rem, 2rem, 2.25rem)"
          color="#fff"
          onClick={() => navigate("/home")}
          sx={{
            "&:hover": {
              transition: "0.3s",
              color: "#ffb498",
              cursor: "pointer",
            },
          }}
        >
          NoteMaster
        </Typography>
        <div className="w-full bg-[#374151] rounded-md p-1 ml-3 pl-4">
          <Search />
        <input
          type="text"
          placeholder="Search Notes"
          onChange={handleSearch}
          className="bg-[#374151] outline-none h-10 w-96 rounded-md ml-3"
        />
        </div>

      </FlexBetween>

      {/* DESKTOP NAV */}
      {isNonMobileScreens ? (
        <FlexBetween gap="2rem">
          <IconButton onClick={handleProfileMenuOpen}>
          <ProfileCircle fullName={fullName} />
          </IconButton>
          <Menu
            anchorEl={profileMenuAnchor}
            open={Boolean(profileMenuAnchor)}
            onClose={handleProfileMenuClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
          >
            <MenuItem>
            <Typography fontWeight="bold">
            {fullName.toUpperCase()}
            </Typography>

            </MenuItem>
            <MenuItem onClick={() => dispatch(setLogout())}>Log Out</MenuItem>
          </Menu>
        </FlexBetween>
      ) : (
        <IconButton
          onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
        >
          <MenuIcon sx={{ color: "white" }} />
        </IconButton>
      )}

      {/* MOBILE NAV */}
      {!isNonMobileScreens && isMobileMenuToggled && (
        <Box
          position="fixed"
          right="0"
          bottom="0"
          height="100%"
          zIndex="10"
          maxWidth="500px"
          minWidth="300px"
          backgroundColor={background}
        >
          {/* CLOSE ICON */}
          <Box display="flex" justifyContent="flex-end" p="1rem">
            <IconButton
              onClick={() => setIsMobileMenuToggled(!isMobileMenuToggled)}
            >
              <Close sx={{ color: "white" }} />
            </IconButton>
          </Box>

          {/* MENU ITEMS */}
          <FlexBetween
            display="flex"
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            gap="3rem"
          >
            <ProfileCircle fullName={fullName} />
            <Box
              width="100px"
              sx={{ cursor: "pointer" }}
              onClick={() => dispatch(setLogout())}
            >
              <Typography color="white">Log Out</Typography>
            </Box>
          </FlexBetween>
        </Box>
      )}

      
    </FlexBetween>
  );
};

export default Navbar;
