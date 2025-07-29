import React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
// import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Avatar from "@mui/material/Avatar";

import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
// import AdbIcon from "@mui/icons-material/Adb";

import Resume from "../../../assets/usersvg.svg";
import { NavLink } from "react-router";

function NavBarResponsive() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const onLogout = () => {
    localStorage.clear();
    dispatch(reset());
  };

  const authenticatedNavLinks = [
    {
      name: "Home",
      link: "/",
    },
    {
      name: "New Job",
      link: "/new",
    },
  ];
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: "green",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <img className="img-header" src={Resume} alt="An image of the logo" />
          <Typography
            variant="h6"
            noWrap
            component="p"
            sx={{
              marginLeft: "1rem",
            }}
          >
            Jobzy
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}></Box>
          <Box sx={{ flexGrow: 0 }} sx={{ display: "flex" }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              {authenticatedNavLinks.map((navLink) => (
                <MenuItem key={navLink.link} onClick={handleCloseUserMenu}>
                  <Typography sx={{ textAlign: "center" }}>
                    <NavLink to={navLink.link}>{navLink.name}</NavLink>
                  </Typography>
                </MenuItem>
              ))}
              <NavLink to="/signin" onClick={onLogout}>
                {" "}
                <Typography sx={{ textAlign: "center" }}>Log out</Typography>
              </NavLink>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default NavBarResponsive;
