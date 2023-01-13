import {
  Typography,
  Box,
  Divider,
  Grid,
  Card,
  CardContent,
  CardActionArea,
  CircularProgress,
  useMediaQuery,
} from "@mui/material";
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {Fragment} from "react";
import {Carousel} from "react-bootstrap";

export const ItemCard = (item) => {
  const navigate_to = useNavigate();
  return (
    <Card>
      <CardActionArea
        onClick={() => {
          navigate_to("/buynow/" + item._id);
          window.scrollTo(0, 0);
        }}
      >
        <Carousel interval={1000}>
          {item.imgs.map((img, i) => (
            <Carousel.Item key={i}>
              <img
                src={img}
                width="100%"
                alt="img"
                style={{objectFit: "cover"}}
              />
            </Carousel.Item>
          ))}
        </Carousel>

        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {item.name}
          </Typography>
          <Typography variant="body2" color="text.secondary" textOverflow={"ellipsis"} overflow="hidden"
                      maxHeight="40px">
            {item.desc}
          </Typography>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default function NewArrivals() {
  const {new_arrivals, loading} = useSelector((state) => state.products.new_arrivals);
  const lessThan1250 = useMediaQuery(`(max-width: 1250px)`);
  const lessThan600 = useMediaQuery(`(max-width: 600px)`);
  const lessThan462 = useMediaQuery(`(max-width: 462px)`);
  return (
    <Box
      sx={{
        p: (theme) => theme.spacing(lessThan1250 ? (lessThan600 ? 2 : 4) : 4), 
      }}
    >
      <Divider>
        <Typography variant="h3" color="black" fontWeight="bold" sx={{pt:5, mt:5}}>
          New Arrivals
        </Typography>
        {
          !lessThan462 && <Typography variant="body1" color="black">
            Discover the latest, on-trend and affordable arrivals here.
          </Typography>
        }
      </Divider>
      {
        lessThan462 && <Typography variant="body1" color="black">
          Discover the latest, on-trend and affordable arrivals here.
        </Typography>
      }
      <Grid container spacing={4} mt="10px" justifyContent="space-between">
        {loading ? (
          <CircularProgress/>
        ) : (
          new_arrivals.map((item, i) => (
            <Fragment key={i}>
              {(
                <Grid item sm={12} md={6} lg={4}>
                  <ItemCard {...item} />
                </Grid>
              )}
            </Fragment>
          ))
        )}
        {}
      </Grid>
    </Box>
  );
}