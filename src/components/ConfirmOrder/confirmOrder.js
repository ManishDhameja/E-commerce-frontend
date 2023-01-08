import {
  Typography,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardMedia,
  Stack,
  Avatar,
  CircularProgress,
  useMediaQuery,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { placeOrder as place_order } from "../../store/orderHistory/actions";
import qr from "../../images/qr.png";
import { polo_inflation, VARIANTS } from "../ProductDescription/productDescription";

export default function ConfirmOrder() {
  const { userDetails, loading } = useSelector((state) => state.user);
  const { pathname } = useLocation();
  const [orders, setOrders] = useState({});
  const [totalAmt, setTotalAmt] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact: "",
    transactionID: "",
  });
  const dispatch_action = useDispatch();
  const navigate_to = useNavigate();
  const { processing } = useSelector((state) => state.orderHistory);

  useEffect(() => {
    if (!loading) {
      setFormData({
        ...formData,
        name: userDetails.name,
        email: userDetails.userEmail,
      });
    }
  }, [loading, userDetails.name, userDetails.userEmail]);

  useEffect(() => {
    const cart = JSON.parse(decodeURIComponent(pathname.split("/")[2]));
    setOrders(cart);
    let total = 0;
    cart.forEach((item) => {
      total += item.total;
    });
    setTotalAmt(total);

    window.scrollTo(0, 0);
  }, []);

  function placeOrder() {
    if (
      !!formData.name &&
      !!formData.email &&
      !!formData.contact &&
      !!formData.transactionID
    ) {
      dispatch_action(
        place_order({
          cart: orders,
          uid: userDetails.userId,
          ...formData,
        })
      );
      if (!processing) navigate_to("/orderConfirmed");
    } else {
      alert("Please enter all required details.");
      return;
    }
  }

  return (
    <Box sx={{ p: (theme) => theme.spacing(4) }}>
      <Typography variant="h4" fontWeight="bold">
        Confirm your order
      </Typography>
      <br />
      <br />

      <Grid container>
        <Grid item xs={12} md={6}>
          <TextField
            name="name"
            required
            value={formData.name}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            fullWidth
            label="Name"
          />
          <br />
          <br />
          <TextField
            name="email"
            required
            value={formData.email}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            fullWidth
            label="Email"
            type="text"
          />
          <br /> <br />
          <TextField
            name="contact"
            required
            value={formData.contact}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            fullWidth
            label="Contact number"
            type="number"
          />
          <Grid container>
            {Object.keys(orders).length > 0 &&
              orders.map((order, i) => {
                return (
                  <Grid key={i} item xs={12}>
                    <Grid
                      container
                      columnSpacing={2}
                      alignItems="center"
                      my={(theme) => theme.spacing(2)}
                    >
                      <Grid item width="100%">
                        <OrderCard order={order} key={i} />
                      </Grid>
                    </Grid>
                  </Grid>
                );
              })}
          </Grid>
          <br />
          <Typography variant="h5" fontWeight="bold">
            Net Payable amount:{" "}
            <Typography
              variant="h5"
              component="span"
              fontWeight="bolder"
              color="green"
            >
              {" "}
              ₹ {totalAmt}{" "}
            </Typography>
          </Typography>
          <br />
          <TextField
            name="transactionID"
            required
            value={formData.transactionID}
            onChange={(e) => {
              setFormData({ ...formData, [e.target.name]: e.target.value });
            }}
            fullWidth
            label="Transaction ID"
            type="text"
          />
          <br /> <br />
          <Button variant="contained" onClick={placeOrder}>
            {processing ? (
              <CircularProgress sx={{ color: "white" }} />
            ) : (
              "Place Order"
            )}
          </Button>
        </Grid>
        <Grid item xs={12} md={6} textAlign="center">
          <img
            src={qr}
            alt="qr"
            style={{ height: "100%", maxHeight: "50vh" }}
          />
          <br />
          <Typography variant="caption" textAlign="left">
            Scan the qr to pay for your order and submit the transaction id
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export function OrderCard({ order, counter, removeBtn }) {
  const lessThan400 = useMediaQuery(`(max-width: 400px)`);
  let price = order.price;
  if (order.variant === VARIANTS.POLO && order.price !== 450) {
    price += polo_inflation;
  }
  return (
    <Card>
      <Grid container flexDirection={lessThan400 ? "column" : "row"}>
        <Grid
          item
          textAlign="left"
          height="100%"
          sx={{ p: (theme) => theme.spacing(2) }}
          xs="auto"
        >
          <CardMedia
            component="img"
            image={order.imgs[2]}
            sx={{
              height: "100%",
              width: "100px",
            }}
          />
        </Grid>
        <Grid
          item
          textAlign="left"
          height="100%"
          sx={{ p: (theme) => theme.spacing(2) }}
          xs="10"
        >
          <Stack
            justifyContent="space-between"
            alignContent="space-between"
            height="100%"
          >
            <Typography variant="h5" fontWeight="bold" mb={1}>
              {order.name}{" "}
              <span>
                <ColorTag color={order.color} label={order.color} />
              </span>{" "}
              <span>
                <ColorTag label={`x${order.quantity}`} color="white" />
              </span>
            </Typography>
            <Grid container justifyContent="space-between" alignItems="center">
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  ₹ {price}
                </Typography>
                <Stack direction="row" alignItems="center" columnGap={2}>
                  <Typography variant="body2" color="text.secondary">
                    {order.size}
                  </Typography>
                </Stack>
                <Typography variant="body2" color="text.secondary">
                  {order.variant}
                </Typography>
              </Grid>
              <Grid item xs="auto">
                <Typography
                  variant="h5"
                  component="span"
                  fontWeight="bolder"
                  color="green"
                >
                  ₹ {price * order.quantity}
                </Typography>
              </Grid>
            </Grid>
            {removeBtn}
          </Stack>
        </Grid>
      </Grid>
    </Card>
  );
}

export function ColorTag({ color, label }) {
  return (
    <Chip
      label={label}
      sx={{
        fontFamily: "Poppins",
        bgcolor: color,
        border: color === "white" && "1px solid black",
        ml: 1,
        color: color !== "white" && "white",
      }}
    />
  );
}
