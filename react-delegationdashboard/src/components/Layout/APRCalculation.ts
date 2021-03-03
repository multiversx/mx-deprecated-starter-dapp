import { ContractReturnData } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import denominate from 'components/Denominate/formatters';
import { yearSettings, genesisTokenSuply, denomination, decimals } from 'config';
import { NetworkConfig, NetworkStake, Stats } from 'helpers/contractDataDefinitions';

const denominateValue = (value: string) => {
  const denominatedValueString = denominate({
    input: value,
    denomination,
    decimals,
    showLastNonZeroDecimal: true,
  });
  const valueWithoutComma = denominatedValueString.replace(/,/g, '');
  return valueWithoutComma;
};

const calculateAPR = ({
  stats: stats,
  networkConfig: networkConfig,
  networkStake: networkStake,
  blsKeys: blsKeys,
  totalActiveStake: totalActiveStake,
}: {
  stats: Stats;
  networkConfig: NetworkConfig;
  networkStake: NetworkStake;
  blsKeys: ContractReturnData[];
  totalActiveStake: string;
}) => {
  const feesInEpoch = 0;
  const stakePerNode = 2500;
  const protocolSustainabilityRewards = 0.1;
  const inflationRate =
    yearSettings.find(x => x.year === Math.floor(stats.epoch / 365) + 1)?.maximumInflation || 0;
  const rewardsPerEpoch = Math.max((inflationRate * genesisTokenSuply) / 365, feesInEpoch);
  const rewardsPerEpochWithoutProtocolSustainability =
    (1 - protocolSustainabilityRewards) * rewardsPerEpoch;
  const topUpRewardsLimit =
    networkConfig.topUpFactor * rewardsPerEpochWithoutProtocolSustainability;

  const networkBaseStake = networkStake.activeValidators * stakePerNode;
  const networkTotalStake = parseInt(denominateValue(networkStake.totalStaked.toString()));
  const networkTopUpStake = networkTotalStake - networkBaseStake;
  const topUpReward =
    ((2 * topUpRewardsLimit) / Math.PI) *
    Math.atan(
      networkTopUpStake /
        parseInt(denominateValue(networkConfig.topUpRewardsGradientPoint.toString()))
    );
  const baseReward = rewardsPerEpochWithoutProtocolSustainability - topUpReward;

  const allNodes = blsKeys.filter(key => key.asString === 'staked' || key.asString === 'jailed')
    .length;
  const allActiveNodes = blsKeys.filter(key => key.asString === 'staked').length;
  const validatorBaseStake = allActiveNodes * stakePerNode;
  const validatorTotalStake = parseInt(denominateValue(totalActiveStake));
  const validatorTopUpStake = validatorTotalStake - allNodes * stakePerNode;
  const validatorTopUpReward =
    networkTopUpStake > 0 ? (validatorTopUpStake / networkTopUpStake) * topUpReward : 0;
  const validatorBaseReward = (validatorBaseStake / networkBaseStake) * baseReward;
  const anualPercentageRate =
    (365 * (validatorTopUpReward + validatorBaseReward)) / validatorTotalStake;
  return (anualPercentageRate * 100).toFixed(2);
};

export { calculateAPR };
