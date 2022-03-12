import BigNumber from "bignumber.js";
import CoinGecko from "coingecko-api";
import ActionQueue from "../common/queue";
import { CoinUtil, getCoinUtil } from "../util/coin.util";
import { getLogger } from "../util/logger";

const logger = getLogger();

export class CoingeckoClient {
  private readonly _client: any;
  private readonly _coinUtil: CoinUtil;
  private readonly _cache: Map<string, BigNumber>;
  private readonly _queue: ActionQueue<string>;
  private _coinsToFetch: Set<string>;

  constructor() {
    process.emitWarning = console.warn
    this._client = new CoinGecko();
    this._coinUtil = getCoinUtil();
    this._cache = new Map<string, BigNumber>();
    this._queue = new ActionQueue<string>();
    this._coinsToFetch = new Set<string>();
  }

  async getTokenPriceUSDAsync(name: string): Promise<BigNumber> {
    try {
      const mappedName = this._coinUtil.mapCoingeckoName(name);
      if(this._cache.has(mappedName))return this._cache.get(mappedName) as BigNumber;
      return await this._queue.queueAction(mappedName, async () => {
        if(this._cache.has(mappedName))return this._cache.get(mappedName) as BigNumber;
        this._coinsToFetch.add(mappedName);
        return await this._queue.queueAction("global", async () => {
          if(this._cache.has(mappedName))return this._cache.get(mappedName) as BigNumber;
          // let other requests to batch them
          await new Promise(r=>setImmediate(r));
          const params = { ids: Array.from(this._coinsToFetch) };
          this._coinsToFetch = new Set<string>();
          const result = await this._client.simple.price(params);
  
          for(const mappedName in result.data){
            const price = new BigNumber(result.data[mappedName].usd);
    
            this._cache.set(mappedName, price);
            setTimeout(() => {
              this._cache.delete(mappedName)
            }, 2*60*1000);
          }
  
          return this._cache.get(mappedName) || new BigNumber(0);
        });
      })
    } catch (error) {
      logger.error(error)();
      return new BigNumber(0);
    }
  }
}

const client = new CoingeckoClient();

export const getCoingeckoClient = () => {
  return client;
}