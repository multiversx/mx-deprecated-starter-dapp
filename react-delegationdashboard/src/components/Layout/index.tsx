import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import BigNumber from 'bignumber.js';
import denominate from 'components/Denominate/formatters';
import { denomination, decimals, auctionContract, network } from 'config';
import { useContext, useDispatch } from 'context';
import { emptyAgencyMetaData } from 'context/state';
import { contractViews } from 'contracts/ContractViews';
import {
  AgencyMetadata,
  ContractOverview,
  NetworkConfig,
  NetworkStake,
  Stats,
} from 'helpers/contractDataDefinitions';
import React from 'react';
import { calculateAPR } from './APRCalculation';
import Footer from './Footer';
import Navbar from './Navbar';
import axios from 'axios';

const getStakingSCBalance = async (): Promise<string> => {
  const result = await axios.get(`${network.apiAddress}/accounts/${auctionContract}`);
  if (result.status) {
    return result.data.balance;
  } else {
    return 'N/A';
  }
};

const Layout = ({ children, page }: { children: React.ReactNode; page: string }) => {
  const dispatch = useDispatch();
  const { dapp, delegationContract } = useContext();
  const {
    getContractConfig,
    getTotalActiveStake,
    getBlsKeys,
    getNumUsers,
    getMetaData,
    getDelegationManagerContractConfig,
  } = contractViews;

  const getContractOverviewType = (value: QueryResponse) => {
    let initialOwnerFunds = denominate({
      decimals,
      denomination,
      input: value.returnData[3].asBigInt.toFixed(),
    });
    return new ContractOverview(
      value.returnData[0].asHex.toString(),
      (value.returnData[1].asNumber / 100).toString(),
      value.returnData[2].asBigInt.toFixed(),
      initialOwnerFunds,
      value.returnData[4]?.asString,
      value.returnData[5]?.asBool,
      value.returnData[6].asBool,
      value.returnData[7]?.asString,
      value.returnData[8].asBool,
      value.returnData[9]?.asNumber * 6
    );
  };

  const getAgencyMetaDataType = (value: QueryResponse) => {
    if (value && value.returnData && value.returnData.length === 0) {
      return emptyAgencyMetaData;
    }
    return new AgencyMetadata(
      value.returnData[0]?.asString,
      value.returnData[1]?.asString,
      value.returnData[2]?.asString
    );
  };
  React.useEffect(() => {
    Promise.all([
      getMetaData(dapp, delegationContract),
      getNumUsers(dapp, delegationContract),
      getContractConfig(dapp, delegationContract),
      getTotalActiveStake(dapp, delegationContract),
      getBlsKeys(dapp, delegationContract),
      dapp.apiProvider.getNetworkStats(),
      dapp.apiProvider.getNetworkStake(),
      dapp.proxy.getNetworkConfig(),
      dapp.proxy.getNetworkStatus(),
      getDelegationManagerContractConfig(dapp),
    ])
      .then(
        async ([
          metaData,
          numUsers,
          contractOverview,
          {
            returnData: [activeStake],
          },
          { returnData: blsKeys },
          networkStats,
          networkStake,
          networkConfig,
          networkStatus,
          delegationManager,
        ]) => {
          dispatch({
            type: 'setNumUsers',
            numUsers: numUsers.returnData[0].asNumber,
          });
          dispatch({
            type: 'setMinDelegationAmount',
            minDelegationAmount: delegationManager.returnData[5].asNumber,
          });
          const contract = getContractOverviewType(contractOverview);
          dispatch({
            type: 'setContractOverview',
            contractOverview: contract,
          });
          dispatch({
            type: 'setAgencyMetaData',
            agencyMetaData: getAgencyMetaDataType(metaData),
          });
          dispatch({
            type: 'setTotalActiveStake',
            totalActiveStake: activeStake.asBigInt.toFixed(),
          });
          dispatch({
            type: 'setNumberOfActiveNodes',
            numberOfActiveNodes: blsKeys.filter(key => key.asString === 'staked').length.toString(),
          });
          dispatch({
            type: 'setNetworkConfig',
            networkConfig: new NetworkConfig(
              networkConfig.TopUpFactor,
              networkConfig.RoundDuration,
              networkConfig.RoundsPerEpoch,
              networkStatus.RoundsPassedInCurrentEpoch,
              new BigNumber(networkConfig.TopUpRewardsGradientPoint),
              networkConfig.ChainID
            ),
          });
          const stakingBalance = await getStakingSCBalance(); // Delete it after we migrate to erdjs 4.x
          const APR = parseFloat(
            calculateAPR({
              stats: new Stats(networkStats.Epoch),
              networkConfig: new NetworkConfig(
                networkConfig.TopUpFactor,
                networkConfig.RoundDuration,
                networkConfig.RoundsPerEpoch,
                networkStatus.RoundsPassedInCurrentEpoch,
                new BigNumber(networkConfig.TopUpRewardsGradientPoint),
                networkConfig.ChainID
              ),
              networkStake: new NetworkStake(
                networkStake.TotalValidators,
                networkStake.ActiveValidators,
                networkStake.QueueSize,
                new BigNumber(stakingBalance) // Replace with the economics value from erdjs 4.x
              ),
              blsKeys: blsKeys,
              totalActiveStake: activeStake.asBigInt.toFixed(),
            })
          );

          dispatch({
            type: 'setAprPercentage',
            aprPercentage: (
              APR -
              APR * ((contract?.serviceFee ? parseFloat(contract.serviceFee) : 15) / 100)
            )
              .toFixed(2)
              .toString(),
          });
        }
      )
      .catch(e => {
        console.error('To do ', e);
      });
  }, []);

  return (
    <div className={`layout d-flex flex-column min-vh-100 ${page}`}>
      {page !== 'home' && <Navbar />}
      <main className="container flex-grow-1 d-flex p-3 p-sm-spacer">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
