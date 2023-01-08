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
  Stack, ToggleButton, ToggleButtonGroup,
  Typography,
  useMediaQuery,
} from "@mui/material";
import {Box} from "@mui/system";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import {Fragment, useEffect, useState} from "react";
import img4 from "../../images/chart.png";
import {ItemCard} from "../NewArrivals/newArrivals";
import {useDispatch, useSelector} from "react-redux";
import {useParams, useNavigate} from "react-router";
import axios from "axios";
import {server} from "../../App";
import {Carousel} from "react-bootstrap";
import {updateCurrentProduct} from "../../store/products/actions";
import {addToCart as addProductToCart, hideFeedback} from "../../store/actions";

export const VARIANTS = {
  SELECT: "Choose a variant",
  POLO: "Polo",
  ROUND: "Round Neck",
};

const SIZES = {
  SELECT: "Pick a size",
  XS: "XS",
  S: "S",
  M: "M",
  L: "L",
  XL: "XL",
  XXL: "XXL",
};

const COLORS = {
  BLACK: "black",
  WHITE: "white",
};

export const polo_inflation = 175;

export default function ProductDescription() {
  const {pid} = useParams();
  console.log(pid);
  const dispatch_action = useDispatch();
  const {userDetails} = useSelector((state) => state.user);
  const navigate_to = useNavigate();
  const {new_arrivals, loading: newArrivalsLoading} = useSelector((state) => state.products.new_arrivals);
  const [showSummary, setShowSummary] = useState(false);
  const {current_product, loading: currentProductLoading} = useSelector((state) => state.products.current_product);
  const [shade, setShade] = useState(COLORS.BLACK);
  const [poloPrice, setPoloPrice] = useState(0);
  const [size, setSize] = useState(SIZES.SELECT);
  const [variant, setVariant] = useState(VARIANTS.SELECT);
  const [qty, setQty] = useState(1);
  const lessThan900 = useMediaQuery(`(max-width: 900px)`);
  const [showChart, setShowChart] = useState(false);
  console.log(current_product)

  const {adding, showFeedback} = useSelector(state => state.cart);

  useEffect(() => {
    dispatch_action(updateCurrentProduct(pid));
  }, [dispatch_action, pid]);

  useEffect(() => {
    if (variant === VARIANTS.POLO) {
      setPoloPrice(polo_inflation);
    } else {
      setPoloPrice(0);
    }
  }, [variant])

  function addToCart() {
    if (userDetails === null || Object.keys(userDetails).length === 0) {
      alert("Please sign in to place an order");
    } else {
      dispatch_action(addProductToCart({
        uid: userDetails.userId,
        pid: current_product._id,
        qty,
        color: shade,
        variant,
        size,
      }));
    }
  }

  return (
    <Box sx={{p: (theme) => theme.spacing(lessThan900 ? 2 : 4)}}>
      {/* <Container> */}
      {currentProductLoading ? (
        <CircularProgress/>
      ) : (
        <Grid container justifyContent="space-between" spacing={5}>
          <Grid item xs={12} md={4.8}>
            <Showcase imgs={current_product.imgs}/>
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
              Rs {current_product.price + poloPrice}
            </Typography>
            <Typography
              variant="body1"
              color="text.primary"
              mb={(theme) => theme.spacing(2)}
            >
              {current_product.desc}
            </Typography>
            {[
              {title: "Care Instructions", val: "Wash with similar colors"},
              {title: "Fit Type", val: "Regular Fit"},
              {title: "Fabric", val: "Cotton"},
              {title: "Style", val: "Regular"},
            ].map(({title, val}, i) => (
              <>
                <Typography variant="body1" fontWeight="bold" component="span">{title} : </Typography>
                <Typography variant="body1" component="span" color="text.secondary">{val}</Typography>
                <br/>
              </>
            ))}
            <Grid container alignItems="center" columnGap={4}>
              <Grid item>
                <Button sx={{my: 2}} variant="text" onClick={() => setShowChart(!showChart)}>View size chart</Button>
              </Grid>
              <Grid item>
                <Quantity count={qty} setCount={(newVal) => setQty(newVal)}/>
              </Grid>
            </Grid>
            <br/>
            <Grid
              container
              justifyContent="flex-start"
              alignItems="center"
              spacing={2}
            >
              <Grid item xs={12} sm={4}>
                <Dropdown
                  values={SIZES}
                  active={size}
                  setActive={(newVal) => setSize(newVal)}
                />
                <br/>
                <br/>
                <Dropdown
                  values={VARIANTS}
                  active={variant}
                  setActive={(newVal) => setVariant(newVal)}
                />
              </Grid>
            </Grid>
            <br/>
            <Grid container alignItems="center" columnGap={2}>
              <Typography fontWeight="bold">
                Color:
              </Typography>
              <Color active={shade} onChange={(e, newVal) => {
                if (newVal !== null) setShade(newVal);
              }}/>
            </Grid>
            <Button
              disabled={
                qty === 0 ||
                size === SIZES.SELECT ||
                variant === VARIANTS.SELECT
              }
              variant="contained"
              sx={{mt: (theme) => theme.spacing(2), fontSize: "18px"}}
              onClick={() => {
                (userDetails === null || Object.keys(userDetails).length === 0)
                  ? alert("Please sign in to place an order")
                  : setShowSummary(true);
              }}
            >
              {adding ? (
                <CircularProgress sx={{color: "white"}}/>
              ) : (
                "Buy now"
              )}
            </Button>
            <Button
              disabled={
                qty === 0 ||
                size === SIZES.SELECT ||
                variant === VARIANTS.SELECT
              }
              variant="outlined"
              sx={{
                mt: (theme) => theme.spacing(2),
                ml: (theme) => theme.spacing(2),
                fontSize: "18px",
              }}
              onClick={addToCart}
            >
              {adding ? <CircularProgress/> : "Add to cart"}
            </Button>
          </Grid>
        </Grid>
      )}
      <Box>
        <Typography
          variant="h4"
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
            <CircularProgress/>
          ) : (
            new_arrivals.map((item, i) => (
              <Fragment key={i}>
                {i <= 3 && (
                  <Grid item sm={12} md={6} lg={3}>
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
        anchorOrigin={{vertical: "top", horizontal: "right"}}
        autoHideDuration={1200}
        onClose={() => dispatch_action(hideFeedback())}
        sx={{mt: "7vh"}}
      >
        <Paper
          sx={{
            px: (theme) => theme.spacing(4),
            py: (theme) => theme.spacing(2),
            boxShadow: (theme) => theme.shadows[4],
            bgcolor: "red",
            color: "white",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography>
            Item added to cart{" "}
          </Typography>
          <Button
            variant="contained"
            color="info"
            sx={{ml: (theme) => theme.spacing(10)}}
            onClick={() => navigate_to("/cart")}
          >
            view cart
          </Button>
        </Paper>
      </Snackbar>
      <Dialog fullWidth maxWidth="xl" open={showChart} onClose={() => setShowChart(false)}>
        <img alt="size chart" src={img4}/>
      </Dialog>
      {userDetails !== null && (
        <OrderSummary
          visible={showSummary}
          cleanup={() => setShowSummary(false)}
          _id={current_product._id}
          name={current_product.name}
          price={current_product.price + poloPrice}
          qty={qty}
          color={shade}
          variant={variant}
          size={size}
          uid={userDetails.userId}
          description={current_product.desc}
        />
      )}
    </Box>
  );
}

export function Color({active, onChange}) {
  return (
    <ToggleButtonGroup
      value={active}
      exclusive
      onChange={onChange}
      color="primary"
    >
      <ToggleButton value={COLORS.BLACK}>
        Black
      </ToggleButton>
      <ToggleButton value={COLORS.WHITE}>
        White
      </ToggleButton>
    </ToggleButtonGroup>
  );
}

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
    <Grid container justifyContent={center && "center"}>
      <Grid item>
        <IconButton
          onClick={() => {
            if (count > 0) setCount(count - 1);
            if (updateCart) updateCart(count - 1);
          }}
        >
          <RemoveIcon fontSize="small"/>
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
          <AddIcon fontSize="small"/>
        </IconButton>
      </Grid>
    </Grid>
  );
}

function Showcase({imgs}) {
  return (
    <Stack rowGap={2}>
      <Card sx={{border: "none"}}>
        <Carousel interval={1000}>
          {imgs.map((img, i) => (
            <Carousel.Item key={i}>
              <img
                src={img}
                width="100%"
                alt={"img"}/>

            </Carousel.Item>
          ))}
        </Carousel>
      </Card>
    </Stack>
  );
}

function Dropdown({values, active, setActive}) {
  return (
    <Select
      value={active}
      onChange={(e) => setActive(e.target.value)}
      fullWidth
      displayEmpty
    >
      {Object.keys(values).map((key, i) => (
        <MenuItem value={values[key]} key={i}>
          {values[key]}
        </MenuItem>
      ))}
    </Select>
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
                               variant,
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
      PaperProps={{sx: {p: (theme) => theme.spacing(4)}}}
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
        <br/>
        <Typography
          variant="body1"
          color="text.primary"
          mb={(theme) => theme.spacing(2)}
        >
          {description}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="bold">
          MRP: <Typography variant="body1" component="span" fontWeight="bolder" color="green"> ₹ {price} </Typography>
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="bold">
          Quantity: {qty}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="bold">
          Color: {color}
        </Typography>
        <Typography variant="body1" color="text.primary" fontWeight="bold">
          Variant: {variant}
        </Typography>
        <Typography
          variant="h6"
          fontWeight="bold"
          color="text.primary"
          my={(theme) => theme.spacing(2)}
        >
          Net payable amount: <Typography variant="h5" component="span" fontWeight="bolder" color="green"> ₹ {qty * price} </Typography>
        </Typography>
        <Button
          variant="contained"
          onClick={() => {
            navigate_to("/confirmOrder");
            setProcessing(true);
            let cart = [];
            axios
              .get(server + "product/findById?pid=" + _id)
              .then(({data}) => {
                const [item] = data;
                delete item.colors;
                delete item.sizes;
                delete item._id;
                item.id = 0;
                item.quantity = qty;
                item.color = color;
                item.size = size;
                item.total = qty * price;
                item.variant = variant;
                cart.push(item);
                navigate_to(
                  "/confirmOrder/" + encodeURIComponent(JSON.stringify(cart)),
                );
              });
          }}
        >
          {processing ? <CircularProgress/> : "place order"}
        </Button>
      </Stack>
    </Dialog>
  );
}