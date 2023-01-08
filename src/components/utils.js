import {Alert,  Snackbar, Typography} from "@mui/material";

export function DangerAlert(props) {
  const {message, name, stack} = props;
  return (
    <Snackbar
      anchorOrigin={{vertical: "top", horizontal: "right"}}
      autoHideDuration={3000}
      sx={{mt: "7vh"}}
    >
      <Alert severity="success" sx={{ width: '100%' }}>
        <Typography>
          {message}
        </Typography>
        <Typography>
          {name}
        </Typography>
        <Typography>
          {stack}
        </Typography>
      </Alert>
    </Snackbar>
  )
}