import { Outlet, useLocation, useNavigate } from "react-router-dom";
import React, { Fragment, useEffect, useState } from "react";
import {
  Alert,
  AlertTitle,
  AppBar,
  Avatar,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import styled from "@emotion/styled";
import AdbIcon from "@mui/icons-material/Adb";
import useNotifications from "../../hooks/useNotification";
import { useOnlineStatus } from "../../hooks/useNetwork";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AccountPopover from "../../components/avatar/avatar";
import Logo from "../../components/logo/logo";
import ReactSession from "../../adapters/session/session";

export default function MainLayout() {
  const [, notificationsActions] = useNotifications();
  const [user, setUser] = useState(null);
  const isOnline = useOnlineStatus();
  const navigate = useNavigate();
  const location = useLocation();
  const routes = ['/app/change-password', '/app/home']
  const isBack = routes.includes(location.pathname)
  const StyledRoot = styled("div")({
    minHeight: "100%",
    overflow: "hidden",
  });

  const Main = styled("div")(({ theme }) => ({
    overflow: "auto",
    minHeight: "100%",
    backgroundColor: 'transparent',
  }));

  function showNotification() {
    notificationsActions.push({
      options: {
        content: (
          <Alert
            sx={{ backgroundColor: "#fff" }}
            variant="outlined"
            severity="error"
          >
            No se detecta conexión a internet
          </Alert>
        )
      },
    });
  }

  useEffect(() => {
    if(!isOnline){
      showNotification();
    }
  }, [isOnline]);

  useEffect(() => {
    const user = ReactSession.get('user')
    if(user){
      setUser(user)

    }else{
      navigate('/login')
    }
    
  },[])

  return (
    <StyledRoot>
      {!isOnline && (
        <Alert variant="outlined" severity="warning">
          Actualmente no tienes conexión a internet y estas trabajando en modo
          offline
        </Alert>
      )}
      <AppBar color="transparent" sx={{ borderBottom: 1 }} position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            {!isBack && (
              <IconButton aria-label="delete" onClick={() => navigate(-1)}>
                <ArrowBackIcon fontSize="inherit" />
              </IconButton>
            )}
            <Logo />
            <Box sx={{ flexGrow: 1 }}></Box>
            <Box sx={{ flexGrow: 0 }}>
              <AccountPopover />
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Main>
        <Outlet />
      </Main>
    </StyledRoot>
  );
}
