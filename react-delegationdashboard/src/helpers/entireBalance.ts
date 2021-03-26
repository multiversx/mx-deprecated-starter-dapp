import BigNumber from 'bignumber.js';
import denominate from '../components/Denominate/formatters';

interface EntireBalanceType {
  balance: string;
  gasPrice: string;
  gasLimit: string;
  denomination: number;
  decimals: number;
}

export default function entireBalance({
  balance,
  gasLimit,
  gasPrice,
  denomination,
  decimals,
}: EntireBalanceType) {
  const bnBalance = new BigNumber(balance);
  const bnGasPrice = new BigNumber(gasPrice);
  const bnGasLimit = new BigNumber(gasLimit);
  const entireBalance = bnBalance.minus(bnGasPrice.times(bnGasLimit));
  if (entireBalance.comparedTo(0) === 1) {
    const input = entireBalance.toString(10);
    return denominate({
      input,
      denomination,
      decimals,
      showLastNonZeroDecimal: true,
      addCommas: false,
    });
  }
  return '0';
}
