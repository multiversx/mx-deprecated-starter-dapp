import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { ContractOverview } from 'helpers/types';
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { NetworkStake } from '@elrondnetwork/erdjs/out';
import { useState } from 'react';

import SetPercentageFeeAction from './SetPercentageFeeAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';

const Views = () => {
  const { dapp, egldLabel, delegationContract } = useContext();
  const { getTotalActiveStake, getNumNodes, getContractConfig } = contractViews;
  const [totalActiveStake, setTotalActiveStake] = React.useState('...');
  const [noNodes, setNoNodes] = React.useState('...');
  const [contractOverview, setContractOverview] = useState(new ContractOverview());
  const [networkStake, setNetworkStake] = useState(new NetworkStake());

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
      (parseFloat(value.returnData[1].asHex) / 100).toString(),
      delegationCap,
      initialOwnerFunds,
      value.returnData[4]?.asBool,
      value.returnData[5].asBool,
      value.returnData[6].asBool,
      value.returnData[7].asBool,
      value.returnData[8]?.asNumber * 6
    );
  };

  const getPercentage = (firstValue: string, secondValue: string) => {
    let percentage =
      (parseInt(firstValue.replace(/,/g, '')) / parseInt(secondValue.replace(/,/g, ''))) * 100;
    if (percentage < 1) {
      return '<1';
    }
    return percentage ? percentage.toFixed(2) : '...';
  };

  const getContractConfiguration = () => {
    getContractConfig(dapp, delegationContract)
      .then(value => {
        let contractOverview = getContractOverviewType(value);
        setContractOverview(contractOverview);
      })
      .catch(e => console.error('getContractConfig error ', e));
  };

  const getNumberOfNodes = () => {
    getNumNodes(dapp, delegationContract)
      .then(value => {
        setNoNodes(value.returnData[0].asNumber.toString() || '0');
      })
      .catch(e => {
        console.error('getNumberOfNodes error ', e);
      });
  };

  const getTotalStake = () => {
    getTotalActiveStake(dapp, delegationContract)
      .then(value => {
        let input = value.returnData[0].asBigInt.toString();
        let totalStake = denominate({
          input,
          denomination,
          decimals,
          showLastNonZeroDecimal: true,
        });
        setTotalActiveStake(totalStake || '0');
      })
      .catch(e => console.error('getTotalStake error ', e));
  };
  const getNetworkStake = () => {
    dapp.apiProvider
      .getNetworkStake()
      .then(value => {
        setNetworkStake(value);
      })
      .catch(e => console.error('getTotalStake error ', e));
  };

  React.useEffect(() => {
    getNetworkStake();
    getTotalStake();
    getNumberOfNodes();
    getContractConfiguration();
  }, []);

  return (
    <div className="cards d-flex flex-wrap">
      <StatCard
        title="Contract Stake"
        value={totalActiveStake}
        valueUnit={egldLabel}
        color="orange"
        svg="contract.svg"
        percentage={`${getPercentage(
          totalActiveStake,
          denominate({
            input: networkStake.TotalStaked.toString(),
            denomination,
            decimals,
            showLastNonZeroDecimal: true,
          })
        )}% of total stake`}
      />
      <StatCard
        title="Number of Nodes"
        value={noNodes}
        valueUnit=""
        color="purple"
        svg="nodes.svg"
        percentage={`${getPercentage(
          noNodes,
          networkStake.TotalValidators.toString()
        )}% of total nodes`}
      />
      <StatCard
        title="Service Fee"
        value={contractOverview.serviceFee || ''}
        valueUnit="%"
        color="red"
        svg="service.svg"
      >
        {location.pathname === '/owner' && <SetPercentageFeeAction />}
      </StatCard>
      <StatCard
        title="Delegation cap"
        value={contractOverview.maxDelegationCap || ''}
        valueUnit={egldLabel}
        color="green"
        svg="delegation.svg"
        percentage={`${getPercentage(totalActiveStake, contractOverview.maxDelegationCap)}% filled`}
      >
        {location.pathname === '/owner' && <UpdateDelegationCapAction />}
      </StatCard>
    </div>
  );
};

export default Views;
