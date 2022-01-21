import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string
  public readonly projectLink?: string

  public constructor(
    chainId: ChainId,
    address: string,
    decimals: number,
    symbol?: string,
    name?: string,
    projectLink?: string
  ) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
    this.projectLink = projectLink
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET, // ASTAR
    '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
    18,
    'WBNB',
    'Wrapped BNB',
    'https://www.binance.org'
  ),
  // [ChainId.BSC]: new Token(
  //   ChainId.BSC,
  //   '0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c',
  //   18,
  //   'WBNB',
  //   'Wrapped BNB',
  //   'https://www.binance.org'
  // ),
  // [ChainId.TESTNET]: new Token(
  //   ChainId.TESTNET,
  //   '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e',
  //   18,
  //   'WBNB',
  //   'Wrapped BNB',
  //   'https://www.binance.org'
  // ),
  // [ChainId.ASTAR]: new Token(
  //   ChainId.ASTAR, // 
  //   '0xAeaaf0e2c81Af264101B9129C00F4440cCF0F720',
  //   18,
  //   'wASTR',
  //   'Wrapped ASTR',
  //   'https://www.binance.org'
  // ),
  // [ChainId.FANTOM]: new Token(
  //   ChainId.FANTOM,
  //   '0x21be370d5312f44cb42ce377bc9b8a0cef1a4c83',
  //   18,
  //   'WFTM',
  //   'Wrapped FTM',
  //   'https://fantom.foundation'
  // ),
  // [ChainId.ONE]: new Token(
  //   ChainId.ONE,
  //   '0xcf664087a5bb0237a0bad6742852ec6c8d69a27a',
  //   18,
  //   'WONE',
  //   'Wrapped ONE',
  //   'https://harmony.one/'
  // ),
  // [ChainId.SHIDEN]: new Token(
  //   ChainId.SHIDEN,
  //   '0xaE8E19eFB41e7b96815649A6a60785e1fbA84C1e',
  //   18,
  //   'WSDN',
  //   'Wrapped SDN',
  //   ''
  // ),
  // [ChainId.XDAI]: new Token(
  //   ChainId.XDAI,
  //   '0xe91D153E0b41518A2Ce8Dd3D7944Fa863463a97d',
  //   18,
  //   'WXDAI',
  //   'Wrapped XDAI',
  //   ''
  // )
}
