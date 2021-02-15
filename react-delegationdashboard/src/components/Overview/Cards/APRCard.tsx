import SVG from 'react-inlinesvg';
import { contractViews } from 'contracts/ContractViews';
import { useContext } from 'context';
import { NetworkConfig, NetworkStake } from '@elrondnetwork/erdjs/out';
import { ContractReturnData } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import denominate from 'components/Denominate/formatters';
import { yearSettings, genesisTokenSuply, denomination, decimals } from 'config';
import React, { useState } from 'react';
import { Stats } from '@elrondnetwork/erdjs/out/stats';

const AprCard = () => {
  const { dapp, totalActiveStake, delegationContract, auctionContract } = useContext();
  const { getBlsKeys } = contractViews;
  const [aprPercentage, setAprPercentage] = useState('...');
  const calculateAPR = (
    stats: Stats,
    networkConfig: NetworkConfig,
    networkStake: NetworkStake,
    blsKeys: ContractReturnData[]
  ) => {
    let inflationRate =
      yearSettings.find(x => x.Year === Math.floor(stats.Epoch / 365) + 1)?.MaximumInflation || 0;
    let networkTotalStake = parseInt(
      denominate({
        input: networkStake.TotalStaked.toString(),
        denomination,
        decimals,
        showLastNonZeroDecimal: true,
      }).replace(/,/g, '')
    );
    let validatorTotalStake = parseInt(
      denominate({
        input: totalActiveStake,
        denomination,
        decimals,
        showLastNonZeroDecimal: true,
      }).replace(/,/g, '')
    );
    let rewardsPerEpoch = Math.max((inflationRate * genesisTokenSuply) / 365, 0);
    let protocolSustainabilityRewards = 0.1;
    let rewordsPerEpochWithoutProtocolSustainability =
      (1 - protocolSustainabilityRewards) * rewardsPerEpoch;
    let topUpRewardsLimit =
      networkConfig.TopUpFactor * rewordsPerEpochWithoutProtocolSustainability;

    let networkBaseStake = networkStake.ActiveValidators * 2500;
    let networkTopUpStake = networkTotalStake - networkBaseStake;
    let topUpReward =
      ((2 * topUpRewardsLimit) / Math.PI) *
      Math.atan(networkTopUpStake / Number(networkConfig.TopUpRewardsGradientPoint));
    let baseReward = rewardsPerEpoch - topUpReward;
    let allNodes = blsKeys.filter(key => key.asString === 'staked' || key.asString === 'jailed')
      .length;
    let allActiveNodes = blsKeys.filter(key => key.asString === 'staked').length;
    let validatorBaseStake = allActiveNodes * 2500;
    let validatorTopUpStake = validatorTotalStake - allNodes * 2500;

    let apr =
      (365 *
        ((validatorTopUpStake / networkTopUpStake) * topUpReward +
          (validatorBaseStake / networkBaseStake) * baseReward)) /
      validatorTotalStake;
    setAprPercentage((apr * 100).toFixed(2));
  };

  React.useEffect(() => {
    Promise.all([
      dapp.apiProvider.getNetworkStats(),
      dapp.apiProvider.getNetworkStake(),
      dapp.proxy.getNetworkConfig(),
      getBlsKeys(dapp, delegationContract, auctionContract),
    ])
      .then(([networkStats, networkStake, networkConfig, { returnData: blsKeys }]) => {
        calculateAPR(networkStats, networkConfig, networkStake, blsKeys);
      })
      .catch(e => {
        console.log('error', e);
      });
  }, []);

  return (
    <div className="statcard card-bg-purple text-white py-3 px-4 mb-spacer ml-spacer rounded">
      <div className="d-flex align-items-center justify-content-between mt-1 mb-2">
        <div className="icon my-1 fill-white">
          <SVG src={process.env.PUBLIC_URL + '/' + 'activation.svg'} className="text-white"></SVG>
        </div>
      </div>
      <span className="opacity-6">Computed APR</span>
      <p className="h5 mb-0">{aprPercentage} %</p>
    </div>
  );
};

export default AprCard;
