import {Avatar, IconButton, Menu, MenuItem} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router";
import {logOut, successNotification} from "../../store/actions";
import {NotificationBuilder} from "../Notifications/notification";

export default function ProfileAvatar() {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate_to = useNavigate();
  const dispatch_action = useDispatch();

  function handleClose() {
    setAnchorEl(null);
  }

  function logout() {
    navigate_to("/");
    dispatch_action(logOut());
    dispatch_action(successNotification(new NotificationBuilder("success", "Logged out")));
  }

  return (
    <>
      <IconButton onClick={(e) => setAnchorEl(e.currentTarget)}>
        <Avatar/>
      </IconButton>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        <MenuItem
          onClick={() => {
            navigate_to("/cart");
            handleClose();
          }}
        >
          My cart
        </MenuItem>
        <MenuItem
          onClick={() => {
            navigate_to("/orderHistory");
            handleClose();
          }}
        >
          Order history
        </MenuItem>
        <MenuItem onClick={logout}>Logout</MenuItem>
      </Menu>
    </>
  );
}