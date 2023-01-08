import {Alert, Box, Dialog, DialogContent, DialogTitle, LinearProgress, Snackbar, useMediaQuery} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

export default function NotificationContainer(props) {
  const {notifications} = useSelector(state => state.notifications);
  return (
    <Box>
      {
        notifications.map((notification, i) => (
          <Notification key={i} type={notification.type} content={notification.content}/>
        ))
      }
    </Box>
  );
}

function Notification({type, content}) {
  const [visible, setVisible] = useState(true);
  const lessThan800 = useMediaQuery(`(max-width: 800px)`);
  return (
    <Snackbar
      open={visible}
      sx={{width: lessThan800 ? "100%" : "30%"}}
      onClose={() => setVisible(false)}
      autoHideDuration={6000}
    >
      <Alert severity={type}>
        {typeof content === "string" ? content : JSON.stringify({...content})}
      </Alert>
    </Snackbar>
  );
}

export class NotificationBuilder {
  constructor(type, content) {
    this.type = type;
    this.content = content;
  }
}

export function LoadingModal() {
  return (
    <Dialog
      open={true}
      fullWidth
      maxWidth="xs"
      PaperProps={{
        sx: {
          position: "absolute",
          top: 0,
        }
      }}
    >
      <DialogTitle>Please wait</DialogTitle>
      <DialogContent>
        <LinearProgress/>
      </DialogContent>
    </Dialog>
  );
}