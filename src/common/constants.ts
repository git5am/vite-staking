import { GenericType, Network, PoolFilterValues, PoolSortType, Token } from "../util/types"

export const CommonConstants = {
  APP_NAME: 'VITCStake',
  WEB_WALLET_STORAGE_SPACE: 'VSP_WEB_WALLET',
  SESSION_WALLET_STORAGE_SPACE: 'VSP_SESSION_WALLET',
  VITE_TOKEN_ID: 'tti_5649544520544f4b454e6e40',
  REWARD_FACTOR: 1e36, // 10^36 = new BigNumber(10).pow(36)
  VITECONNECT_URL: "wss://viteconnect.thomiz.dev",
  nodes: {
    testnet: "wss://buidl.vite.net/gvite/ws",
    mainnet: "wss://node-vite.thomiz.dev/ws",
    debug: "ws://localhost:23457"
  }
}

export const Networks: Network[] = [
  {
    id: 1,
    networkId: 1,
    name: 'DEBUG',
    rpcUrl: CommonConstants.nodes.debug,
    connectorUrl: CommonConstants.VITECONNECT_URL,
    contractAddress: "vite_8fad5a10ff04c23e07aa738a8c48e382c8c51eeed8a28c082c",
    contractType: "0.2"
  },
  {
    id: 2,
    networkId: 2,
    name: 'TESTNET',
    rpcUrl: CommonConstants.nodes.testnet,
    connectorUrl: CommonConstants.VITECONNECT_URL,
    contractAddress: "vite_dcd10d6c5e72d616d5352c891040b49f5b333cfc039e40d5b6",
    contractType: "0.1"
  },
  {
    id: 3,
    networkId: 3,
    name: 'VITCStake v0.1',
    rpcUrl: CommonConstants.nodes.mainnet,
    connectorUrl: CommonConstants.VITECONNECT_URL,
    contractAddress: "vite_cc2d0c2c34ae6af8bd58e111ca8c958d002c2b3199f449c8d7",
    contractType: "0.1"
  },
  {
    id: 4,
    networkId: 3,
    name: 'VITCStake v0.2',
    rpcUrl: CommonConstants.nodes.mainnet,
    connectorUrl: CommonConstants.VITECONNECT_URL,
    contractAddress: "vite_c85b335e221fc99631785f3d579edd1b7a2691131b7f3998a3",
    contractType: "0.2"
  },
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