import { getLogger } from "../util/logger";
import { Network } from "../util/types";
import { Networks } from "./constants";

const logger = getLogger();

export class NetworkManager {
  private _network?: Maybe<Network>;
  private _setNetworkCallback?: (network?: Maybe<Network>) => void;

  set onSetNetworkCallback(cb: (network?: Maybe<Network>) => void) {
    this._setNetworkCallback = cb;
  }

  getNetwork(): Maybe<Network> {
    return this._network;
  }

  setNetwork(network?: Maybe<Network>): void {
    this._network = network;
    if (this._setNetworkCallback) {
      this._setNetworkCallback(this._network);
    }
  }

  getNetworks(): Network[] {
    try {
      const ids = process.env.REACT_APP_NETWORKS?.split(",").map(e => Number(e));
      return Networks.filter(e => ids?.includes(e.id))
    } catch (error) {
      logger.error(error)
    }
    return Networks;
  }
}

const manager = new NetworkManager();

export const getNetworkManager = () => {
  return manager;
}