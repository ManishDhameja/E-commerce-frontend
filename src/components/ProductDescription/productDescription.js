import {
  Avatar,
  Button,
  Card,
  CircularProgress,
  Dialog,
  Grid,
  IconButton,
  MenuItem,
  Paper,
  Select,
  Snackbar,
  Stack,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Box } from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { Fragment, useEffect, useState } from "react";
import img4 from "../../images/chart.png";
import { ItemCard } from "../NewArrivals/newArrivals";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useNavigate } from "react-router";
import axios from "axios";
import { server } from "../../App";
import { Carousel } from "react-bootstrap";
import { updateCurrentProduct } from "../../store/products/actions";
import {
  addToCart as addProductToCart,
  hideFeedback,
} from "../../store/actions";

export function Quantity({
  center,
  initialCount,
  count,
  setCount,
  updateCart,
}) {
  useEffect(() => {
    if (initialCount) setCount(initialCount);
  }, []);

  return (
    <Grid container justifyContent={center && "center"} xs="auto">
      <Grid item>
        <IconButton
          onClick={() => {
            if (count > 0) setCount(count - 1);
            if (updateCart) updateCart(count - 1);
          }}
        >
          <RemoveIcon fontSize="small" />
        </IconButton>
      </Grid>
      <Grid
        item
        border="1px solid rgba(0, 0, 0, 0.2)"
        px={(theme) => theme.spacing(2)}
      >
        <Typography fontSize="24px">{count}</Typography>
      </Grid>
      <Grid item alignItems="center">
        <IconButton
          onClick={() => {
            setCount(count + 1);
            if (updateCart) updateCart(count + 1);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Grid>
    </Grid>
  );
}

function Showcase({ imgs }) {
  return (
    <Stack rowGap={2}>
      <Card>
        <Carousel interval={1000}>
          {imgs.map((img, i) => (
            <Carousel.Item key={i}>
              <img src={img} width="100%" alt={"img"} />
            </Carousel.Item>
          ))}
        </Carousel>
      </Card>
    </Stack>
  );
}

function SizeDropdown({ sizes, active, setActive }) {
  // const [active, setActive] = useState(0);
  return (
    <Select
      labelId="demo-simple-select-label"
      id="demo-simple-select"
      value={active}
      onChange={(e) => setActive(e.target.value)}
      fullWidth
    >
      <MenuItem value={"select"}>Size</MenuItem>
      {sizes.map((item, i) => (
        <MenuItem value={item} key={i}>
          {item}
        </MenuItem>
      ))}
    </Select>
  );
}

export default function ProductDescription() {
  const { pid } = useParams();
  const dispatch_action = useDispatch();
  const { userDetails } = useSelector((state) => state.user);
  const navigate_to = useNavigate();
  const { new_arrivals, loading: newArrivalsLoading } = useSelector(
    (state) => state.products.new_arrivals
  );
  const [showSummary, setShowSummary] = useState(false);
  const { current_product, loading: currentProductLoading } = useSelector(
    (state) => state.products.current_product
  );
  const [color, setColor] = useState(null);
  const [size, setSize] = useState("select");
  const [qty, setQty] = useState(1);
  const lessThan900 = useMediaQuery(`(max-width: 900px)`);
  const [showChart, setShowChart] = useState(false);

  const { adding, showFeedback } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch_action(updateCurrentProduct(pid));
  }, [dispatch_action, pid]);

  function addToCart() {
    if (userDetails === null || Object.keys(userDetails).length === 0) {
      alert("Please sign in to place an order");
    } else {
      dispatch_action(
        addProductToCart({
          uid: userDetails.userId,
          pid: current_product._id,
          qty,
          color,
          size,
        })
      );
    }
  }

  return (
    <Box sx={{ p: (theme) => theme.spacing(lessThan900 ? 2 : 4) }}>
      {/* <Container> */}
      {currentProductLoading ? (
        <CircularProgress />
      ) : (
        <Grid container justifyContent="space-between" spacing={5}>
          <Grid item xs={12} md={4.8}>
            <Showcase imgs={current_product.imgs} />
          </Grid>
          <Grid item xs={12} md={7}>
            <Typography
              variant="h3"
              fontWeight="bold"
              color="text.primary"
              mb={(theme) => theme.spacing(4)}
            >
              {current_product.name}
              <Typography
                variant="h6"
                component="span"
                fontWeight="bold"
                color="green"
                ml={(theme) => theme.spacing(4)}
              >
                In Stock
              </Typography>
            </Typography>
            <Typography
              variant="h4"
              fontWeight="bold"
              color="text.primary"
              mb={(theme) => theme.spacing(2)}
            >
              Rs {current_product.price}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              mb={(theme) => theme.spacing(2)}
            >
              {current_product.desc}
            </Typography>
            {[
              { title: "Care Instructions", val: "Wash with similar colors" },
              { title: "Fit Type", val: "Regular Fit" },
              { title: "Fabric", val: "Cotton" },
              { title: "Style", val: "Regular" },
            ].map(({ title, val }, i) => (
              <>
                <Typography variant="body1" fontWeight="bold" component="span">
                  {title} :{" "}
                </Typography>
                <Typography
                  variant="body1"
                  component="span"
                  color="text.secondary"
                >
                  {val}
                </Typography>
                <br />
              </>
            ))}
            <Button variant="text" onClick={() => setShowChart(!showChart)}>
              View size chart
            </Button>
            <br />
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} md={6}>
                <SizeDropdown
                  sizes={current_product.sizes}
                  active={size}
                  setActive={(newVal) => setSize(newVal)}
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <Quantity count={qty} setCount={(newVal) => setQty(newVal)} />
              </Grid>
            </Grid>
            <Grid
              container
              alignItems="center"
              mt={(theme) => theme.spacing(2)}
            >
              {current_product.colors.map((item, i) => (
                <Grid item key={i}>
                  <IconButton onClick={() => setColor(item)}>
                    <Avatar
                      sx={{
                        bgcolor: item,
                        color: item,
                        border: color === item ? "5px solid red" : "none",
                      }}
                    />
                  </IconButton>
                </Grid>
              ))}
            </Grid>
            <Button
              disabled={qty === 0 || size === "select"}
              variant="contained"
              sx={{ mt: (theme) => theme.spacing(2), fontSize: "18px" }}
              onClick={() => {
                userDetails === null || Object.keys(userDetails).length === 0
                  ? alert("Please sign in to place an order")
                  : setShowSummary(true);
              }}
            >
              {adding ? (
                <CircularProgress sx={{ color: "white" }} />
              ) : (
                "Buy now"
              )}
            </Button>
            <Button
              disabled={qty === 0 || size === "select"}
              variant="outlined"
              sx={{
                mt: (theme) => theme.spacing(2),
                ml: (theme) => theme.spacing(2),
                fontSize: "18px",
              }}
              onClick={addToCart}
            >
              {adding ? <CircularProgress /> : "Add to cart"}
            </Button>
          </Grid>
        </Grid>
      )}
      <Box>
        <Typography
          variant="h3"
          fontWeight="bold"
          my={(theme) => theme.spacing(4)}
          mt={(theme) => theme.spacing(15)}
        >
          People also bought
        </Typography>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
          spacing={4}
        >
          {newArrivalsLoading ? (
            <CircularProgress />
          ) : (
            new_arrivals.map((item, i) => (
              <Fragment key={i}>
                {i <= 3 && (
                  <Grid item sm={12} md={6} lg={4}>
                    <ItemCard {...item} />
                  </Grid>
                )}
              </Fragment>
            ))
          )}
        </Grid>
      </Box>
      {/* </Container> */}
      <Snackbar
        open={showFeedback}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        autoHideDuration={3000}
        onClose={() => dispatch_action(hideFeedback())}
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
          Item added to cart{" "}
          <Button
            variant="contained"
            color="info"
            sx={{ ml: (theme) => theme.spacing(10) }}
            onClick={() => navigate_to("/cart")}
          >
            view cart
          </Button>
        </Paper>
      </Snackbar>
      <Dialog open={showChart} onClose={() => setShowChart(false)}>
        <img src={img4} />
      </Dialog>
      {userDetails !== null && (
        <OrderSummary
          visible={showSummary}
          cleanup={() => setShowSummary(false)}
          _id={current_product._id}
          name={current_product.name}
          price={current_product.price}
          qty={qty}
          color={color}
          size={size}
          uid={userDetails.userId}
          description={current_product.desc}
        />
      )}
    </Box>
  );
}

export function OrderSummary({
  visible,
  cleanup,
  name,
  qty,
  price,
  _id,
  uid,
  color,
  size,
  description,
}) {
  const navigate_to = useNavigate();
  const [processing, setProcessing] = useState(false);

  function handleClose() {
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
        mb={(theme) => theme.spacing(1)}
      >
        Order Summary
      </Typography>
      <Typography
        variant="body1"
        mb={(theme) => theme.spacing(3)}
        color="text.secondary"
      >
        Confirm your order
      </Typography>
      <Stack>
        <Typography variant="h5" fontWeight="bold" color="text.primary">
          {name}
        </Typography>
        <br />
        <Typography
          variant="body1"
          color="text.primary"
          mb={(theme) => theme.spacing(2)}
        >
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Rs {price}
        </Typography>
        <Typography variant="body1" color="text.primary">
          Quantity: {qty}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          my={(theme) => theme.spacing(2)}
        >
          Net payable amount: {qty * price}
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate_to("/confirmOrder");
            setProcessing(true);
            let cart = [];
            axios
              .get(server + "product/findById?pid=" + _id)
              .then(({ data }) => {
                const [item] = data;
                delete item.colors;
                delete item.sizes;
                delete item._id;
                item.id = 0;
                item.quantity = qty;
                item.color = color;
                item.size = size;
                item.total = qty * item.price;
                cart.push(item);
                navigate_to(
                  "/confirmOrder/" + encodeURIComponent(JSON.stringify(cart))
                );
              });
          }}
        >
          {processing ? <CircularProgress /> : "place order"}
        </Button>
      </Stack>
    </Dialog>
  );
}
