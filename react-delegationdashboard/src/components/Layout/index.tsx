import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import denominate from 'components/Denominate/formatters';
import { denomination, decimals } from 'config';
import { useContext, useDispatch } from 'context';
import { contractViews } from 'contracts/ContractViews';
import { ContractOverview } from 'helpers/types';
import React from 'react';
import { calculateAPR } from './APRCalculation';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, page }: { children: React.ReactNode; page: string }) => {
  const dispatch = useDispatch();
  const { dapp, delegationContract, auctionContract } = useContext();
  const { getContractConfig, getTotalActiveStake, getBlsKeys } = contractViews;

  const getContractOverviewType = (value: QueryResponse) => {
    let delegationCap = denominate({
      decimals,
      denomination,
      input: value.returnData[2].asBigInt.toString(),
      showLastNonZeroDecimal: false,
    });
    let initialOwnerFunds = denominate({
      decimals,
      denomination,
      input: value.returnData[3].asBigInt.toString(),
      showLastNonZeroDecimal: false,
    });
    return new ContractOverview(
      value.returnData[0].asHex.toString(),
      (value.returnData[1].asNumber / 100).toString(),
      delegationCap,
      initialOwnerFunds,
      value.returnData[4]?.asString,
      value.returnData[5].asBool,
      value.returnData[6].asBool,
      value.returnData[7].asBool,
      value.returnData[8]?.asNumber * 6
    );
  };

  React.useEffect(() => {
    Promise.all([
      getContractConfig(dapp, delegationContract),
      getTotalActiveStake(dapp, delegationContract),
      getBlsKeys(dapp, delegationContract, auctionContract),
      dapp.apiProvider.getNetworkStats(),
      dapp.apiProvider.getNetworkStake(),
      dapp.proxy.getNetworkConfig(),
    ])
      .then(
        ([
          contractOverview,
          {
            returnData: [activeStake],
          },
          { returnData: blsKeys },
          networkStats,
          networkStake,
          networkConfig,
        ]) => {
          dispatch({
            type: 'setContractOverview',
            contractOverview: getContractOverviewType(contractOverview),
          });
          dispatch({
            type: 'setTotalActiveStake',
            totalActiveStake: activeStake.asBigInt.toString(),
          });
          dispatch({
            type: 'setNumberOfActiveNodes',
            numberOfActiveNodes: (blsKeys.length / 2).toString(),
          });
          dispatch({
            type: 'setAprPercentage',
            aprPercentage: calculateAPR(
              networkStats,
              networkConfig,
              networkStake,
              blsKeys,
              activeStake.asBigInt.toString()
            ),
          });
        }
      )
      .catch(e => {
        console.log('To do ', e);
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
