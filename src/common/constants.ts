import { GenericType, Network, PoolFilterValues, PoolSortType, Token } from "../util/types"

export const CommonConstants = {
  APP_NAME: 'BeefStake',
  WEB_WALLET_STORAGE_SPACE: 'VSP_WEB_WALLET',
  SESSION_WALLET_STORAGE_SPACE: 'VSP_SESSION_WALLET',
  VITE_TOKEN_ID: 'tti_5649544520544f4b454e6e40',
  REWARD_FACTOR: 1e36 // 10^36 = new BigNumber(10).pow(36)
}

export const Networks: Network[] = [
  {
    id: 1,
    networkId: 1,
    name: 'BeefStake v0.1',
    rpcUrl: 'wss://node-vite.thomiz.dev/ws',
    connectorUrl: 'wss://viteconnect.thomiz.dev',
    contract: "vite_cc2d0c2c34ae6af8bd58e111ca8c958d002c2b3199f449c8d7"
  }/*,
  {
    id: 2,
    networkId: 2,
    name: 'TESTNET',
    rpcUrl: 'wss://buidl.vite.net/gvite/ws', // https://buidl.vite.net/gvite
    connectorUrl: 'wss://viteconnect.thomiz.dev',
    contract: "vite_dcd10d6c5e72d616d5352c891040b49f5b333cfc039e40d5b6"
  },
  {
    id: 4,
    networkId: 5,
    name: 'DEBUG',
    rpcUrl: 'ws://localhost:23457',
    connectorUrl: 'wss://viteconnect.thomiz.dev',
    contract: null
  }*/
]

export const TypeNames = {
  Pool: "Pool",
  PoolUserInfo: "PoolUserInfo",
  Token: "Token"
}

export const UnknownToken: Token = {
  __typename: TypeNames.Token,
  id: "-1",
  name: "UNKNOWN",
  symbol: "UNKNOWN",
  originalSymbol: "UNKNOWN",
  decimals: 0,
  iconUrl: undefined,
  url: undefined
}

export const PoolSortTypes: GenericType[] = [
  {
    name: "",
    type: "DEFAULT"
  },
  {
    name: "APR",
    type: "APR"
  },
  {
    name: "Total staked",
    type: "TOTAL_STAKED"
  }
]

export const DefaultPoolFilterValues: PoolFilterValues = {
  stakedOnly: false,
  showLive: true,
  sortBy: PoolSortTypes[PoolSortType.DEFAULT].type,
  search: ""
}