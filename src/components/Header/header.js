import {
  AppBar,
  Button,
  Dialog,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Toolbar,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useState } from "react";
import Headroom from "react-headroom";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import ProfileAvatar from "../profileAvatar/profileAvatar";
import MenuIcon from "@mui/icons-material/Menu";
import { MobileDrawer } from "../MainSection/mainSection";
import logo from "../../images/logo.png";
import { register, signIn } from "../../store/actions";
import { LoadingModal } from "../Notifications/notification";

export const Logo = ({ height = "30px", maxHeight }) => {
  const navigate_to = useNavigate();
  return (
    <img
      src={logo}
      onClick={() => navigate_to("/")}
      style={{
        cursor: "pointer",
        height,
        maxHeight: maxHeight ? maxHeight : height,
      }}
      alt={"img"}
    />
  );
};

export default function Header({ transparentBg }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const navigate_to = useNavigate();
  const { pathname } = useLocation();
  const isOpen = Boolean(anchorEl);
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const { userDetails, loading } = useSelector((state) => state.user);
  const lessThan464 = useMediaQuery(`(max-width: 464px)`);
  const [showDrawer, setShowDrawer] = useState(false);

  function handleClose() {
    setAnchorEl(null);
  }

  return (
    <Headroom>
      <AppBar
        position="static"
        sx={{
          bgcolor: transparentBg ? "transparent" : "white",
          boxShadow:
            pathname === "/"
              ? transparentBg
                ? "none"
                : (theme) => theme.shadows[4]
              : "none",
        }}
      >
        <Toolbar sx={{ py: (theme) => theme.spacing(2) }}>
          <Grid container alignItems="center" justifyContent="space-between">
            <Grid item flex={2}>
              <Logo />
            </Grid>
            {(function () {
              if (lessThan464) {
                return (
                  <IconButton onClick={() => setShowDrawer(true)}>
                    <MenuIcon sx={{ color: "red" }} />
                  </IconButton>
                );
              } else {
                if (
                  userDetails &&
                  !loading &&
                  Object.keys(userDetails).length !== 0
                ) {
                  return <ProfileAvatar />;
                } else {
                  return (
                    <>
                      <Grid item>
                        <Button
                          variant="text"
                          sx={{ color: "red", fontSize: "18px" }}
                          onClick={() => setShowLogin(true)}
                        >
                          Sign in
                        </Button>
                      </Grid>
                      <Grid item>
                        <Button
                          variant="text"
                          sx={{ color: "red", fontSize: "18px" }}
                          onClick={() => setShowRegister(true)}
                        >
                          Register
                        </Button>
                      </Grid>
                    </>
                  );
                }
              }
            })()}
          </Grid>
        </Toolbar>
        <Menu anchorEl={anchorEl} open={isOpen} onClose={handleClose}>
          {[
            ["t-shirts", "/t-shirts"]
          ].map((item, i) => (
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
          cleanup={() => setShowRegister(false)}
        />
        <MobileDrawer
          visible={showDrawer}
          cleanup={() => setShowDrawer(false)}
          updateLogin={() => setShowLogin(true)}
          updateRegister={() => setShowRegister(true)}
        />
        {loading && <LoadingModal />}
      </AppBar>
    </Headroom>
  );
}

export function LoginModal({ visible, cleanup }) {
  const dispatch = useDispatch();

  function handleClose() {
    cleanup();
  }

  const [formdata, setFormdata] = useState({
    email: "",
    pwd: "",
  });

  function handleFields(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(signIn(formdata));
    cleanup();
  }

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { p: (theme) => theme.spacing(4) } }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={(theme) => theme.spacing(3)}
      >
        Sign in
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            required
            fullWidth
            value={formdata.email}
            onChange={handleFields}
            name="email"
            type="email"
            label="Email"
          />
          <TextField
            required
            fullWidth
            value={formdata.pwd}
            onChange={handleFields}
            name="pwd"
            label="Password"
            type="password"
          />
          <Button fullWidth type="submit" variant="contained">
            sign in
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}

export function RegisterModal({ visible, cleanup }) {
  const dispatch = useDispatch();

  function handleClose() {
    cleanup();
  }

  const [formdata, setFormdata] = useState({
    email: "",
    pwd: "",
    name: "",
    add: "",
  });

  function handleFields(e) {
    setFormdata({ ...formdata, [e.target.name]: e.target.value });
  }

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(register(formdata));
    cleanup();
  }

  return (
    <Dialog
      open={visible}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{ sx: { p: (theme) => theme.spacing(4) } }}
    >
      <Typography
        variant="h4"
        fontWeight="bold"
        mb={(theme) => theme.spacing(3)}
      >
        Create account
      </Typography>
      <form onSubmit={handleSubmit}>
        <Stack gap={2}>
          <TextField
            required
            fullWidth
            value={formdata.name}
            onChange={handleFields}
            name="name"
            label="Name"
          />
          <TextField
            required
            fullWidth
            value={formdata.email}
            onChange={handleFields}
            name="email"
            type="email"
            label="Email"
          />
          <TextField
            required
            fullWidth
            value={formdata.add}
            onChange={handleFields}
            name="add"
            label="Address"
          />
          <TextField
            required
            fullWidth
            value={formdata.pwd}
            onChange={handleFields}
            name="pwd"
            label="Password"
            type="password"
          />
          <Button fullWidth type="submit" variant="contained">
            register
          </Button>
        </Stack>
      </form>
    </Dialog>
  );
}
