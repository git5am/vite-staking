import BigNumber from "bignumber.js";
import React, { useEffect, useState } from "react";
import { getNetworkManager } from "../../../../common/network";
import { Pool } from "../../../../util/types";
import { ViteUtil } from "../../../../util/vite.util";

interface Props {
  pool: Maybe<Pool>
  decimals: number
}

export const TotalEarnedRewards: React.FC<Props> = (props: Props) => {
  const [pool, setPool] = useState<Maybe<Pool>>(props.pool);
  const [rewardTokens, setRewardTokens] = useState<BigNumber>(new BigNumber(0));
  const networkManager = getNetworkManager();

  useEffect(() => {
    setPool(props.pool);
  }, [props.pool]);

  useEffect(() => {
    let height = networkManager.networkHeight;
    const refresh = () => {
      if(height.isEqualTo(networkManager.networkHeight))return;
      height = networkManager.networkHeight;
      if (pool) {
        const duration = pool.endBlock.minus(pool.startBlock);
        const now = (
          networkManager.networkHeight.isLessThan(pool.startBlock) ? 
            pool.startBlock :
            networkManager.networkHeight.isGreaterThan(pool.endBlock) ?
              pool.endBlock :
              networkManager.networkHeight
        ).minus(pool.startBlock);

        const rewards = now.div(duration).times(pool.totalRewards);
        
        setRewardTokens(rewards);
      } else {
        setRewardTokens(new BigNumber(0));
      }
    }
    const interval = setInterval(refresh, 500);
    refresh();
    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, props]);

  const showRewardTokens = (decimals: number): string => {
    if (!pool) {
      return "0";
    }
    return ViteUtil.formatBigNumber(rewardTokens, pool.rewardToken.decimals, decimals);
  }
  const showTotalTokens = (decimals: number): string => {
    if (!pool) {
      return "0";
    }
    return ViteUtil.formatBigNumber(pool.totalRewards, pool.rewardToken.decimals, decimals);
  }

  return (
    <>
      {showRewardTokens(props.decimals)}/{showTotalTokens(props.decimals)}
    </>
  );
}