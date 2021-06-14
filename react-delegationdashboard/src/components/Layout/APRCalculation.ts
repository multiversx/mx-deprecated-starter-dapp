import { decodeString } from '@elrondnetwork/erdjs';
import denominate from 'components/Denominate/formatters';
import {
  yearSettings,
  genesisTokenSuply,
  denomination,
  decimals,
  feesInEpoch,
  protocolSustainabilityRewards,
  stakePerNode,
} from 'config';
import { NetworkConfig, NetworkStake, Stats } from 'helpers/contractDataDefinitions';

const denominateValue = (value: string) => {
  const denominatedValueString = denominate({
    input: value,
    denomination,
    decimals,
  });
  const valueWithoutComma = denominatedValueString.replace(/,/g, '');
  return valueWithoutComma;
};

const calculateAPR = ({
  stats,
  networkConfig,
  networkStake,
  blsKeys,
  totalActiveStake,
}: {
  stats: Stats;
  networkConfig: NetworkConfig;
  networkStake: NetworkStake;
  blsKeys: Buffer[];
  totalActiveStake: string;
}) => {
  const allNodes = blsKeys.filter(
    key =>
      decodeString(key) === 'staked' ||
      decodeString(key) === 'jailed' ||
      decodeString(key) === 'queued'
  ).length;
  const allActiveNodes = blsKeys.filter(key => decodeString(key) === 'staked').length;
  if (allActiveNodes <= 0) {
    return '0.00';
  }

  const epochDurationInSeconds =
    (networkConfig.roundDuration / 1000) * networkConfig.roundsPerEpoch;
  const secondsInYear = 365 * 24 * 3600;
  const epochsInYear = secondsInYear / epochDurationInSeconds;
  const inflationRate =
    yearSettings.find(x => x.year === Math.floor(stats.epoch / epochsInYear) + 1)
      ?.maximumInflation || 0;
  const rewardsPerEpoch = Math.max((inflationRate * genesisTokenSuply) / epochsInYear, feesInEpoch);
  const rewardsPerEpochWithoutProtocolSustainability =
    (1 - protocolSustainabilityRewards) * rewardsPerEpoch;
  const topUpRewardsLimit =
    networkConfig.topUpFactor * rewardsPerEpochWithoutProtocolSustainability;

  const networkBaseStake = networkStake.activeValidators * stakePerNode;
  const networkTotalStake = parseInt(denominateValue(networkStake.totalStaked.toFixed()));
  const networkTopUpStake =
    networkTotalStake -
    networkStake.totalValidators * stakePerNode -
    networkStake.queueSize * stakePerNode;
  const topUpReward =
    ((2 * topUpRewardsLimit) / Math.PI) *
    Math.atan(
      networkTopUpStake /
        (2 * parseInt(denominateValue(networkConfig.topUpRewardsGradientPoint.toFixed())))
    );
  const baseReward = rewardsPerEpochWithoutProtocolSustainability - topUpReward;
  const validatorTotalStake = parseInt(denominateValue(totalActiveStake));
  const actualNumberOfNodes = Math.min(
    Math.floor(validatorTotalStake / stakePerNode),
    allActiveNodes
  );
  const validatorBaseStake = actualNumberOfNodes * stakePerNode;
  const validatorTopUpStake = validatorTotalStake - allNodes * stakePerNode;
  const validatorTopUpReward =
    networkTopUpStake > 0 ? (validatorTopUpStake / networkTopUpStake) * topUpReward : 0;
  const validatorBaseReward = (validatorBaseStake / networkBaseStake) * baseReward;
  const anualPercentageRate =
    (epochsInYear * (validatorTopUpReward + validatorBaseReward)) / validatorTotalStake;
  return (anualPercentageRate * 100).toFixed(2);
};

export { calculateAPR };
