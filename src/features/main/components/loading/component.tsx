
import { Typography, Grid, CircularProgress } from '@mui/material';
//import { Footer } from '../../../layout/components/footer';
import { HeaderLoading } from '../../../layout/components/header-loading';
//import { MainScroll } from '../../../layout/components/main-scroll';
import { MainWrapper } from '../../../layout/components/main-wrapper';

export const MainLoading = () => {
  return (
    <MainWrapper>
      <HeaderLoading />
      <Grid container position={'fixed'} height={'100%'} justifyContent="center" alignItems="center">
        <Typography>
          <CircularProgress />
        </Typography>
      </Grid>
    </MainWrapper>
  )
}
