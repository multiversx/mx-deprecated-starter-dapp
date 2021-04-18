import BigNumber from 'bignumber.js';
import { minDust } from 'config';
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
  const bnMinDust = new BigNumber(minDust);
  const bnGasPrice = new BigNumber(gasPrice);
  const bnGasLimit = new BigNumber(gasLimit);
  const entireBn = bnBalance.minus(bnGasPrice.times(bnGasLimit));
  const entireBnMinusDust = entireBn.minus(bnMinDust);

  const entireBalance =
    // entireBalance >= 0
    entireBn.comparedTo(0) === 1
      ? denominate({
          input: entireBn.toString(10),
          denomination,
          decimals,
          showLastNonZeroDecimal: true,
          addCommas: false,
        })
      : '0';

  const entireBalanceMinusDust =
    entireBnMinusDust.comparedTo(0) === 1
      ? denominate({
          input: entireBnMinusDust.toString(10),
          denomination,
          decimals,
          showLastNonZeroDecimal: true,
          addCommas: false,
        })
      : entireBalance;

  return {
    entireBalance,
    entireBalanceMinusDust,
  };
}
