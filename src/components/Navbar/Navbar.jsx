import {
  Button,
  createTheme,
  ThemeProvider,
  Avatar,
  IconButton,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
} from "@mui/material";
import { HiOutlineLogout } from "react-icons/hi";
import { BsFillHeartFill } from "react-icons/bs";
import { motion } from "framer-motion";
import React, { useContext } from "react";
import "./navbar.css";
import { auth } from "../../firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { PropertiesArray } from "../../App";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [properties] = useContext(PropertiesArray);
  const [badgeContent, setBadgeContent] = useState(0);

  useEffect(() => {
    setBadgeContent(properties.length);
  }, [properties]);

  const [user] = useAuthState(auth);
  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider);
  };

  const theme = createTheme({
    palette: {
      primary: {
        main: "#ADEFD1FF",
      },
    },
  });
  const navbar_logo = {
    initial: {
      x: [0, 0],
      y: [-5, 5],
      transition: {
        y: {
          repeat: Infinity,
          duration: 1,
          ease: "easeInOut",
          repeatType: "reverse",
          x: {
            repeat: Infinity,
            duration: 1,
            ease: "easeInOut",
            repeatType: "reverse",
          },
        },
      },
    },
  };

  const linkAnimation = {
    initial: {
      scale: 1.5,
      transition: 1,
      type: "spring",
      stiffness: 200,
    },
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="navbar">
      <motion.div
        className="navbar_logo"
        variants={navbar_logo}
        animate="initial"
      >
        <h1>
          <a href="/home">HomeLand</a>
        </h1>
      </motion.div>
      <div className="navbar_links">
        <motion.li
          variants={linkAnimation}
          whileHover={"initial"}
          whileTap={{ scale: 1.2 }}
          className="home"
        >
          <a href="/">Home</a>
        </motion.li>
        {user && (
          <motion.li
            className="favorite_icon"
            variants={linkAnimation}
            whileHover={"initial"}
            whileTap={{ scale: 1.2 }}
          >
            <Badge
              badgeContent={badgeContent}
              sx={{
                "& .MuiBadge-badge": {
                  color: "black",
                  backgroundColor: "#ADEFD1FF",
                },
              }}
            >
              <Link to={"/favorites"}>
                <BsFillHeartFill
                  style={{
                    color: "#db243d",
                    cursor: "pointer",
                    fontSize: "1.5rem",
                  }}
                />
              </Link>
            </Badge>
          </motion.li>
        )}
        <li>
          <ThemeProvider theme={theme}>
            {user ? (
              user &&
              user.photoURL && (
                <motion.div
                  variants={linkAnimation}
                  whileHover={"initial"}
                  whileTap={{ scale: 1.2 }}
                  className="avatar"
                >
                  <Tooltip title="Account settings">
                    <IconButton
                      onClick={handleClick}
                      size="medium"
                      sx={{ ml: 2 }}
                      aria-controls={open ? "account-menu" : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? "true" : undefined}
                    >
                      <Avatar sx={{ width: 45, height: 45 }}>
                        <img src={user.photoURL} alt={user.name} />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    id="account-menu"
                    open={open}
                    onClose={handleClose}
                    onClick={handleClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: "visible",
                        filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                        "& .MuiAvatar-root": {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        "&:before": {
                          content: '""',
                          display: "block",
                          position: "absolute",
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          transform: "translateY(-50%) rotate(45deg)",
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: "right", vertical: "top" }}
                    anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
                  >
                    <MenuItem onClick={() => auth.signOut()}>
                      <HiOutlineLogout style={{fontSize: "1.5rem"}} /> Sign Out
                    </MenuItem>
                  </Menu>
                </motion.div>
              )
            ) : (
              <motion.div
                variants={linkAnimation}
                whileHover={"initial"}
                className="login"
              >
                <Button
                  variant="outlined"
                  size="medium"
                  color="primary"
                  onClick={googleSignIn}
                >
                  Login
                </Button>
              </motion.div>
            )}
          </ThemeProvider>
        </li>
      </div>
    </div>
  );
};

export default Navbar;
