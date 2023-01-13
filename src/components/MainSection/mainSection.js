import {
  Box,
  Container,
  Drawer,
  Grid,
  List,
  ListItem,
  Menu,
  MenuItem,
  Typography,
  useMediaQuery,
} from "@mui/material";
import portrait from "../../images/hero.jpg";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { LoginModal, Logo, RegisterModal } from "../Header/header";
import { logOut } from "../../store/actions";

export function MobileDrawer({
  visible,
  cleanup, 
  updateLogin,
  updateRegister,
}) {
  const navigate_to = useNavigate();
  const { userDetails, loading } = useSelector((state) => state.user);
  const dispatch_action = useDispatch();

  function logout() {
    navigate_to("/");
    dispatch_action(logOut());
  }

  return (
    <Drawer open={visible} onClose={cleanup} anchor="bottom">
      <List>
        {userDetails && !loading && Object.keys(userDetails).length !== 0
          ? ["My cart", "Order History", "Logout"].map((item, i) => (
              <ListItem
                button
                key={i}
                divider
                sx={{ bgcolor: i === 2 && "red" }}
                onClick={(e) => {
                  if (i === 0) {
                    navigate_to("/cart");
                    cleanup();
                  } else if (i === 1) {
                    navigate_to("/orderHistory");
                    cleanup();
                  } else if (i === 2) {
                    logout();
                    cleanup();
                  }
                }}
              >
                {item}
              </ListItem>
            ))
          : ["Sign in", "Register"].map((item, i) => (
              <ListItem
                button
                key={i}
                divider
                sx={{ bgcolor: i === 2 && "red" }}
                onClick={(e) => {
                  if (i === 0) {
                    updateLogin();
                    cleanup();
                  } else if (i === 1) {
                    updateRegister();
                    cleanup();
                  }
                }}
              >
                {item}
              </ListItem>
            ))}
      </List>
    </Drawer>
  );
}

export default function MainSection() {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate_to = useNavigate();
  const isOpen = Boolean(anchorEl);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [showDrawer, setShowDrawer] = useState(false);
  const lessThan1200 = useMediaQuery(`(max-width: 1200px)`);

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Box
      sx={{
        p: (theme) => theme.spacing(4),
        minHeight: "80vh",
      }}
    >
      <Container maxWidth="xl">
        <Typography
          variant="h5"
          fontWeight="bold"
          sx={{ textShadow: "2px 2px 10px rgba(0, 0, 0, 0.4)" }}
          color="white"
          mt="15vh"
          mb={(theme) => theme.spacing(3)}
        >
          Step into the world of
        </Typography>
        <Logo height="10vw" maxHeight="100px" />
        <Grid
          container
          alignItems="center"
          columnSpacing={2}
          mt={(theme) => theme.spacing(4)}
        >
        </Grid>
      </Container>
      <img
        src={portrait}
        alt="ad"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: -1,
          objectFit: "cover",
        }}
      />
      <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
        {["t-shirts", "/t-shirts"].map((item, i) => (
          <MenuItem
            key={i}
            onClick={() => {
              navigate_to(item[1]);
              handleClose();
            }}
          >
            {item[0]}
          </MenuItem>
        ))}
      </Menu>
      <LoginModal visible={showLogin} cleanup={() => setShowLogin(false)} />
      <RegisterModal
        visible={showRegister}
        RegisterModal
        cleanup={() => setShowRegister(false)}
      />
      <MobileDrawer
        visible={showDrawer}
        cleanup={() => setShowDrawer(false)}
        updateLogin={() => setShowLogin(true)}
        updateRegister={() => setShowRegister(true)}
      />
    </Box>
  );
}
