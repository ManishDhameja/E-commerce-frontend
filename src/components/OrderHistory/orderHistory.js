import {
    Grid,
    Typography,
    Box,
    Divider,
    Stack,
    CircularProgress, useMediaQuery,
  } from "@mui/material";
  import { useEffect } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { CartItem } from "../Cart/cart";
  import {OrderCard} from "../ConfirmOrder/confirmOrder";
  import {getOrders} from "../../store/orderHistory/actions";
  
  export default function OrderHistory() {
    const dispatch_action = useDispatch();
    const { userDetails, loading } = useSelector((state) => state.user);
    const {orderHistory, loading: historyLoading} = useSelector(state => state.orderHistory);
    const lessThan800 = useMediaQuery(`(max-width: 800px)`);
  
    useEffect(() => {
      if (!loading) dispatch_action(getOrders(userDetails.userId))
    }, [dispatch_action, loading, userDetails.userId]);
  
    return (
      <Box sx={{ p: (theme) => theme.spacing(4) }}>
        <Grid container justifyContent="space-between" alignItems="center">
          <Grid item>
            <Typography variant="h4" fontWeight="bold">
              Past orders
            </Typography>
          </Grid>
  
          {historyLoading ? (
            <CircularProgress />
          ) : (
            <Grid item>
              <Typography variant="h4">
                {orderHistory.length} items
              </Typography>
            </Grid>
          )}
        </Grid>
        <Divider sx={{ my: (theme) => theme.spacing(4) }} />
        {
          !lessThan800 && (
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mb={(theme) => theme.spacing(2)}
            >
              {["Product Details", "Quantity", "Price", "Total"].map((item, i) => (
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
          )
        }
        <Stack rowGap={4}>
          {historyLoading ? (
            <CircularProgress />
          ) : (
            orderHistory
              .slice()
              .reverse()
              .map((item, i) => {
                return lessThan800 ? (
                  <OrderCard order={item} key={i} />
                ) : (
                  <CartItem {...item}
                            img={item.imgs[2]}
                            key={i}
                            isOrder
                  />
                )
              })
          )}
        </Stack>
        <Divider
          sx={{
            my: (theme) => theme.spacing(4),
            mt: (theme) => theme.spacing(10),
          }}
        />
      </Box>
    );
  }