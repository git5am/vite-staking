import { Avatar, Badge, Grid, Skeleton, styled, Typography } from "@mui/material";
import React from "react";
import { getCoinUtil } from "../../../../util/coin.util";
import { Pool } from "../../../../util/types";

interface Props {
  loading: boolean
  pool: Maybe<Pool>
}

export const Tokens: React.FC<Props> = (props: Props) => {
  const BigCoin = styled(Avatar)(({ theme }) => ({
    width: 70,
    height: 70,
    backgroundColor: "white",
    border: "3px solid black"
  }));
  const SmallCoin = styled(Avatar)(({ theme }) => ({
    width: 40,
    height: 40,
    backgroundColor: "white",
    border: `3px solid ${theme.palette.grey[600]}`
  }));
  const coinUtil = getCoinUtil();

  return (
    <Grid item container alignItems="center" spacing={2}>
      <Grid item xs={6} md={6} sx={{textAlign: "right"}} >
        <Badge
          overlap="circular"
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          badgeContent={
            <SmallCoin alt={props.pool?.rewardToken.originalSymbol} src={coinUtil.mapIconUrl(props.pool?.rewardToken.iconUrl)} />
          }
        >
          <BigCoin alt={props.pool?.stakingToken.originalSymbol} src={coinUtil.mapIconUrl(props.pool?.stakingToken.iconUrl)} />
        </Badge>
      </Grid>
      <Grid item xs={6} md={6}>
        {props.loading ? (
          <>
            <Skeleton animation="wave" height={25} width="70px" />
            <Skeleton animation="wave" height={25} width="90px" />
          </>
        ) : (
          <>
            <Typography variant="body2" color="text.secondary">
              Stake {props.pool?.stakingToken.originalSymbol}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Earn {props.pool?.rewardToken.originalSymbol}
            </Typography>
          </>
        )}
      </Grid>
    </Grid >
  );
}