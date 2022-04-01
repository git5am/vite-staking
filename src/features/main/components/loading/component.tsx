
import { Typography, Grid, CircularProgress } from '@mui/material';
//import { Footer } from '../../../layout/components/footer';
import { HeaderLoading } from '../../../layout/components/header-loading';
import { MainScroll } from '../../../layout/components/main-scroll';
import { MainWrapper } from '../../../layout/components/main-wrapper';

export const MainLoading = () => {
  return (
    <MainWrapper>
      <HeaderLoading />
      <MainScroll>
        <Grid container justifyContent="center" alignItems="center" flex={1}>
        <Typography sx={{mb: 2}}>
          Loading... 
        </Typography>
        </Grid>
        <Grid container justifyContent="center" alignItems="center" flex={1}>
          <CircularProgress />
        </Grid>
      </MainScroll>
    </MainWrapper>
  )
}
