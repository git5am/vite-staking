import BigNumber from "bignumber.js";
import React, { useEffect, useMemo, useState } from "react";
import { getNetworkManager } from "../../../../common/network";
import { getMomentFactory } from "../../../../factories";
import { MomentUtil } from "../../../../util/moment.util";
import { Pool } from "../../../../util/types";

interface Props {
  pool: Pool
}

export const formatDuration = (timelock: BigNumber, moment: MomentUtil) => {
    if(timelock.isEqualTo(0))return "0 seconds";
    
    const duration = moment.getDuration(timelock.toNumber());
    const format = []
    if (duration.months() > 0) {
      format.push(duration.months() + " month"+(duration.months() > 1 ? "s" : ""))
    }
    if (
      duration.days() > 0 || 
      (
        format.length && 
        (duration.hours() > 0 || duration.minutes() > 0 || duration.seconds() > 0)
      )) {
      format.push(duration.days() + " day"+(duration.days()>1?"s":""))
    }
    if (
      duration.hours() > 0 || 
      (
        format.length && 
        (duration.minutes() > 0 || duration.seconds() > 0)
      )) {
      format.push(duration.hours() + " hour"+(duration.hours()>1?"s":""))
    }
    if (duration.minutes() > 0 ||
      (
        format.length &&
        (duration.seconds() > 0)
      )
    ) {
      format.push(duration.minutes() + " minute"+(duration.minutes()>1?"s":""))
    } 
    if(duration.seconds() > 0) {
      format.push(duration.seconds() + " second"+(duration.seconds()>1?"s":""))
    }
    return format.join(" ")
}

export const TimeLock: React.FC<Props> = (props: Props) => {
  const [pool, setPool] = useState<Maybe<Pool>>(props.pool);
  const userInfo = pool?.userInfo
  const moment = useMemo(() => getMomentFactory().create(), []);
  const timelockReadable = useMemo(() => {
      return formatDuration(pool?.timelock || new BigNumber(0), moment);
  }, [pool?.timelock, moment])
  const [userTimelock, setUserTimelock] = useState(new BigNumber(0));
  const networkManager = getNetworkManager();

  useEffect(() => {
    setPool(props.pool);
  }, [props.pool]);

  useEffect(() => {
    let height = new BigNumber(0);
    const refresh = () => {
      if(height.isEqualTo(networkManager.networkHeight))return;
      height = networkManager.networkHeight;
      if (pool) {
          // if pool ended/did not start, don't put any timelock
        if(pool.timelock.isEqualTo(0) || !userInfo || pool.endBlock.isLessThan(height) || pool.startBlock.isGreaterThan(height)){
            return setUserTimelock(new BigNumber(0));
        }
        
        const elapsed = height.minus(userInfo?.depositBlock || 0).minus(1);
        let remaining = pool.timelock.minus(elapsed);
        if(remaining.isLessThan(0)){
            remaining = new BigNumber(0);
        }
        setUserTimelock(remaining);
      } else {
        setUserTimelock(new BigNumber(0));
      }
    }
    const interval = setInterval(refresh, 500);
    refresh();
    return () => {
      clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pool, props]);

  const showPoolTimelock = (): string => {
    if (!pool || pool.timelock.isEqualTo(0)) {
      return "None";
    }
    return timelockReadable;
  }
  const showUserTimelock = (): string => {
    if (!pool || !userInfo) {
      return "";
    }
    return formatDuration(userTimelock, moment)+"/";
  }

  return (
    <>
      {showUserTimelock()}{showPoolTimelock()}
    </>
  );
}