import {Box, Grid, Typography} from "@mui/material";
import logo from '../../images/logo1.png';

export default function Footer() {
  return (
    <Box sx={{
      bgcolor: 'rgba(0, 0, 0, 0.05)',
      p: theme => theme.spacing(4),
      pt: theme => theme.spacing(5),
      borderTop: '1px solid rgba(0,0,0,0.1)'
    }}>
      <Grid container justifyContent={"center"} textAlign={"center"}>
        <Grid item>
          <img src={logo} width="160"/>
          <Typography variant="body1" color="rgba(0, 0, 0, 0.5)" mt={theme => theme.spacing(2)}>
            Copyright © Appleute.
          </Typography>
        </Grid>
      </Grid>
    </Box>
  )
}