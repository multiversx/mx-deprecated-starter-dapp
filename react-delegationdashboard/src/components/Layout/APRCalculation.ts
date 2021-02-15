import { NetworkConfig, NetworkStake } from '@elrondnetwork/erdjs/out';
import { ContractReturnData } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { Stats } from '@elrondnetwork/erdjs/out/stats';
import denominate from 'components/Denominate/formatters';
import { yearSettings, genesisTokenSuply, denomination, decimals } from 'config';

const denominateValue = (value: string) => {
  return denominate({
    input: value,
    denomination,
    decimals,
    showLastNonZeroDecimal: true,
  }).replace(/,/g, '');
};

const calculateAPR = (
  stats: Stats,
  networkConfig: NetworkConfig,
  networkStake: NetworkStake,
  blsKeys: ContractReturnData[],
  totalActiveStake: string
) => {
  let inflationRate =
    yearSettings.find(x => x.Year === Math.floor(stats.Epoch / 365) + 1)?.MaximumInflation || 0;
  let rewardsPerEpoch = Math.max((inflationRate * genesisTokenSuply) / 365, 0);
  let protocolSustainabilityRewards = 0.1;
  let rewordsPerEpochWithoutProtocolSustainability =
    (1 - protocolSustainabilityRewards) * rewardsPerEpoch;
  let topUpRewardsLimit = networkConfig.TopUpFactor * rewordsPerEpochWithoutProtocolSustainability;

  let networkBaseStake = networkStake.ActiveValidators * 2500;
  let networkTotalStake = parseInt(denominateValue(networkStake.TotalStaked.toString()));
  let networkTopUpStake = networkTotalStake - networkBaseStake;
  let topUpReward =
    ((2 * topUpRewardsLimit) / Math.PI) *
    Math.atan(networkTopUpStake / Number(networkConfig.TopUpRewardsGradientPoint));
  let baseReward = rewardsPerEpoch - topUpReward;

  let allNodes = blsKeys.filter(key => key.asString === 'staked' || key.asString === 'jailed')
    .length;
  let allActiveNodes = blsKeys.filter(key => key.asString === 'staked').length;
  let validatorBaseStake = allActiveNodes * 2500;
  let validatorTotalStake = parseInt(denominateValue(totalActiveStake));
  let validatorTopUpStake = validatorTotalStake - allNodes * 2500;

  let anualPercentageRate =
    (365 *
      ((validatorTopUpStake / networkTopUpStake) * topUpReward +
        (validatorBaseStake / networkBaseStake) * baseReward)) /
    validatorTotalStake;
  return (anualPercentageRate * 100).toFixed(2);
};

export { calculateAPR };
