import { Button, Stack, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

export default function OrderConfirmed() {
  const navigate_to = useNavigate();
  return (
    <Stack justifyContent="center" alignItems="center">
      <Typography
        variant="h2"
        color="green"
        fontWeight="bold"
        my={(theme) => theme.spacing(4)}
      >
        Order placed
      </Typography>
      <Button variant="contained" onClick={() => navigate_to("/orderHistory")}>
        View order history
      </Button>
    </Stack>
  );
}