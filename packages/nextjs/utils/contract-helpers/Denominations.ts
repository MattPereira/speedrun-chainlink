const toEthereumAddress = (iso4217Code: number): string => {
  return `0x${iso4217Code.toString(16).padStart(40, "0")}`;
};

// Ethereum address for fiat currency derived from ISO 4217 numeric code!!
const Denominations = {
  baseOptions: {
    LINK: "0x514910771AF9Ca656af840dff83E8264EcF986CA",
    ETH: "0xEeeeeEeeeEeEeeEeEeEeeEEEeeeeEeeeeeeeEEeE",
    BTC: "0xbBbBBBBbbBBBbbbBbbBbbbbBBbBbbbbBbBbbBBbB",
  },
  quoteOptions: {
    USD: toEthereumAddress(840),
    GBP: toEthereumAddress(826),
    EUR: toEthereumAddress(978),
    JPY: toEthereumAddress(392),
    KRW: toEthereumAddress(410),
    CNY: toEthereumAddress(156),
    AUD: toEthereumAddress(36),
    CAD: toEthereumAddress(124),
    CHF: toEthereumAddress(756),
    ARS: toEthereumAddress(32),
    PHP: toEthereumAddress(608),
    NZD: toEthereumAddress(554),
    SGD: toEthereumAddress(702),
    NGN: toEthereumAddress(566),
    ZAR: toEthereumAddress(710),
    RUB: toEthereumAddress(643),
    INR: toEthereumAddress(356),
    BRL: toEthereumAddress(986),
  },
};

export default Denominations;
