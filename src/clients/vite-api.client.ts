import axios from 'axios';

type BaseResult<T> = {
  code: number,
  data: T
}

export type TokenDetailResult = {
  name: string
  symbol: string
  originalSymbol: string
  tokenDecimals: number
  urlIcon: string
}

export class ViteAPIClient {
  private readonly _baseUrl: string;

  constructor() {
    this._baseUrl = "https://vite-api.thomiz.dev"
  }

  async getTokenDetailAsync(tokenId: string): Promise<Maybe<TokenDetailResult>> {
    const result = await axios.get<BaseResult<TokenDetailResult>>(`${this._baseUrl}/crypto-info/tokens/${tokenId}/details`);
    return result.data.data;
  }
}

const client = new ViteAPIClient();

export const getViteAPIClient = () => {
  return client;
}
