import {
  Avatar,
  Box,
  Button,
  Card,
  CardMedia,
  CircularProgress,
  Divider,
  Grid,
  Paper,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Quantity } from "../ProductDescription/productDescription";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { OrderCard } from "../ConfirmOrder/confirmOrder";

export default function Cart() {
  const { userDetails, loading } = useSelector((state) => state.user);
  const navigate_to = useNavigate();
  const [cartTotal, setCartTotal] = useState(0);
  const [cart, setCart] = useState([]);
  const [showFeedback, setShowFeedback] = useState(false);
  const [processing, setProcessing] = useState(false);
  const lessThan800 = useMediaQuery(`(max-width: 800px)`);

  function placeOrder() {
    setCart([]);
    localStorage.removeItem("cart_" + userDetails.userId);
    navigate_to("/confirmOrder/" + encodeURIComponent(JSON.stringify(cart)));
  }

  useEffect(() => {
    if (
      Object.keys(userDetails).length === 0 &&
      localStorage.getItem("user") === null
    ) {
      navigate_to("/");
    }
  }, [userDetails, navigate_to]);

  useEffect(() => {
    if (!loading) {
      if (localStorage.getItem("cart_" + userDetails.userId) !== null) {
        const cart = JSON.parse(
          localStorage.getItem("cart_" + userDetails.userId)
        );
        setCart(cart);

        let cartTotal = 0;
        cart.forEach((item, i) => {
          cartTotal += item.price * item.quantity;
        });
        setCartTotal(cartTotal);
      }
    }
  }, [loading, userDetails.userId]);

  return (
    <Box sx={{ p: (theme) => theme.spacing(4) }}>
      <Grid container justifyContent="space-between" alignItems="center">
        <Grid item>
          <Typography variant="h3" fontWeight="bold">
            Shopping Cart
          </Typography>
        </Grid>

        {loading ? (
          <CircularProgress />
        ) : (
          <Grid item>
            <Typography variant="h3">{cart.length} items</Typography>
          </Grid>
        )}
      </Grid>
      <Divider sx={{ my: (theme) => theme.spacing(4) }} />
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
        mb={(theme) => theme.spacing(2)}
      >
        {!lessThan800 &&
          ["Product Details", "Quantity", "Price", "Total"].map((item, i) => (
            <Grid
              item
              key={i}
              xs={i === 0 ? 5 : 2}
              textAlign={i === 0 ? "left" : "center"}
            >
              <Typography variant="h6">{item}</Typography>
            </Grid>
          ))}
      </Grid>
      <Stack rowGap={4}>
        {loading ? (
          <CircularProgress />
        ) : (
          cart.map((Item, i) => {
            return (
              <ResponsiveCartItem
                Item={Item}
                updateCartCost={(newVal) => setCartTotal(newVal)}
                showFeedback={() => setShowFeedback(true)}
                updateCart={(updatedCart) => setCart(updatedCart)}
                key={i}
              />
            );
          })
        )}
      </Stack>
      <Divider
        sx={{
          my: (theme) => theme.spacing(4),
          mt: (theme) => theme.spacing(10),
        }}
      />
      {loading ? (
        <CircularProgress />
      ) : (
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item mb={(theme) => theme.spacing(4)}>
            <Typography variant="h3" fontWeight="bold">
              Cart total: Rs. {cartTotal}
            </Typography>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              disabled={cart.length === 0}
              sx={{ fontSize: "24px", px: (theme) => theme.spacing(10) }}
              onClick={placeOrder}
            >
              {processing ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Place Order"
              )}
            </Button>
          </Grid>
        </Grid>
      )}
      <Snackbar
        open={showFeedback}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => setShowFeedback(false)}
        sx={{ mt: "7vh" }}
      >
        <Paper
          sx={{
            px: (theme) => theme.spacing(4),
            py: (theme) => theme.spacing(2),
            boxShadow: (theme) => theme.shadows[4],
            bgcolor: "red",
            color: "white",
          }}
        >
          Item removed{" "}
        </Paper>
      </Snackbar>
    </Box>
  );
}

function ResponsiveCartItem({
  Item,
  updateCartCost,
  updateCart,
  showFeedback,
}) {
  const [qty, setQty] = useState(1);
  const lessThan800 = useMediaQuery(`(max-width: 800px)`);
  const { userDetails } = useSelector((state) => state.user);
  const [removing, setRemoving] = useState(false);

  function removeItem() {
    setRemoving(true);
    const cart = JSON.parse(localStorage.getItem("cart_" + userDetails.userId));
    const updatedCart = cart.filter((item) => item.id !== Item.id);
    localStorage.setItem(
      "cart_" + userDetails.userId,
      JSON.stringify(updatedCart)
    );
    updateCart(updatedCart);
    let total = 0;
    updatedCart.forEach((item) => {
      total += item.quantity * item.price;
    });
    updateCartCost(total);
    setRemoving(false);
    showFeedback();
  }

  function onUpdateCart(newQty) {
    if (newQty > 0) {
      const cart = JSON.parse(
        localStorage.getItem("cart_" + userDetails.userId)
      );
      cart.forEach((item) => {
        if (item.id === Item.id) {
          item.quantity = newQty;
          item.total = newQty * item.price;
        }
      });
      localStorage.setItem("cart_" + userDetails.userId, JSON.stringify(cart));
      let total = 0;
      cart.forEach((item) => {
        total += item.quantity * item.price;
      });
      updateCartCost(total);
      updateCart(cart);
    }
  }

  return lessThan800 ? (
    <OrderCard
      order={Item}
      removeBtn={
        <Button
          variant="text"
          sx={{ color: "red", width: "30%" }}
          onClick={removeItem}
        >
          {removing ? <CircularProgress /> : "Remove"}
        </Button>
      }
      counter={
        <Quantity
          initialCount={Item.quantity}
          count={qty}
          setCount={(newVal) => newVal !== 0 && setQty(newVal)}
          updateCart={onUpdateCart}
        />
      }
    />
  ) : (
    <CartItem
      {...Item}
      img={Item.imgs[2]}
      updateCartCost={updateCartCost}
      updateCart={updateCart}
      showFeedback={showFeedback}
    />
  );
}

export function CartItem({
  id,
  name,
  img,
  quantity,
  price,
  total,
  size,
  color,
  updateCartCost,
  showFeedback,
  updateCart,
  isOrder,
}) {
  const [qty, setQty] = useState(1);
  const { userDetails } = useSelector((state) => state.user);
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    if (quantity) setQty(quantity);
  }, [quantity]);

  function removeItem() {
    setRemoving(true);
    const cart = JSON.parse(localStorage.getItem("cart_" + userDetails.userId));
    const updatedCart = cart.filter((item) => item.id !== id);
    localStorage.setItem(
      "cart_" + userDetails.userId,
      JSON.stringify(updatedCart)
    );
    updateCart(updatedCart);
    let total = 0;
    updatedCart.forEach((item) => {
      total += item.quantity * item.price;
    });
    updateCartCost(total);
    setRemoving(false);
    showFeedback();
  }

  function onUpdateCart(newQty) {
    if (newQty > 0) {
      const cart = JSON.parse(
        localStorage.getItem("cart_" + userDetails.userId)
      );
      cart.forEach((item) => {
        if (item.id === id) {
          item.quantity = newQty;
          item.total = newQty * item.price;
        }
      });
      localStorage.setItem("cart_" + userDetails.userId, JSON.stringify(cart));
      let total = 0;
      cart.forEach((item) => {
        total += item.quantity * item.price;
      });
      updateCartCost(total);
      updateCart(cart);
    }
  }

  return (
    <Grid container justifyContent="space-between">
      <Grid item xs={5.5} textAlign="center">
        <Grid container columnSpacing={2} alignItems="center" height="100%">
          <Grid item>
            <Card>
              <CardMedia
                component="img"
                image={img}
                sx={{
                  height: "100px",
                  width: "100px",
                }}
              />
            </Card>
          </Grid>
          <Grid item textAlign="left" height="100%">
            <Stack
              justifyContent="space-between"
              alignContent="space-between"
              height="100%"
            >
              <Typography variant="h5" fontWeight="bold">
                {name}
              </Typography>
              <Stack direction="row" alignItems="center" columnGap={2}>
                <Typography variant="body2" color="text.secondary">
                  {size}
                </Typography>
                <Avatar
                  component="span"
                  sx={{
                    color: color,
                    bgcolor: color,
                    width: "10px",
                    height: "10px",
                  }}
                />
              </Stack>
              {!isOrder && (
                <Button
                  variant="text"
                  sx={{ color: "red", width: "30%" }}
                  onClick={removeItem}
                >
                  {removing ? <CircularProgress /> : "Remove"}
                </Button>
              )}
            </Stack>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs="auto" textAlign="center" alignSelf="center">
        {!isOrder ? (
          <Quantity
            center
            initialCount={quantity}
            count={qty}
            setCount={(newVal) => setQty(newVal)}
            updateCart={onUpdateCart}
          />
        ) : (
          quantity
        )}
      </Grid>
      <Grid
        item
        xs={2}
        ml={(theme) => theme.spacing(2)}
        textAlign="center"
        alignSelf="center"
      >
        <Typography>{price}</Typography>
      </Grid>
      <Grid item xs={2} textAlign="center" alignSelf="center">
        <Typography>{total}</Typography>
      </Grid>
    </Grid>
  );
}
