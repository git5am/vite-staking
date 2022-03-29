import {Grid, Typography, Box } from "@mui/material";
import React from 'react';

export const Desc: React.FC = () => {
  return (
    <Grid container justifyContent="center" alignItems="center">  
        <Grid item xs={12} md={6} lg={6}>
          <Box p={2}>
          <Box>
            <Typography color="text.secondary">
              <h1>Earn big staking rewards with BeefStake</h1>
            </Typography>
            <Typography color="text.secondary">
              <h2>Just connect your Vite wallet and start earning right away</h2>
            </Typography>
            </Box>
          </Box>
        </Grid>
        <Grid container xs={12} md={6} lg={6} alignItems="center" justifyContent="center" direction="column">
          <Box p={2}>
            <img alt="staking" src={"./cow1.png"} width="350" />
          </Box>
        </Grid>     
    </Grid>
  )
}
