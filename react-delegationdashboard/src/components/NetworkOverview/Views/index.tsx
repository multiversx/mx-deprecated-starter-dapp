import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { ContractOverview } from 'helpers/types';
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { useState } from 'react';

const Views = () => {
  const { dapp, erdLabel, delegationContract } = useContext();
  const { getTotalActiveStake, getNumNodes, getContractConfig } = contractViews;
  const [totalActiveStake, setTotalActiveStake] = React.useState('0');
  const [noNodes, setNoNodes] = React.useState('0');
  const [contractOverview, setContractOverview] = useState(new ContractOverview());

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
        setTotalActiveStake(
          denominate({ input, denomination, decimals, showLastNonZeroDecimal: true }) || '0'
        );
      })
      .catch(e => console.error('getTotalStake error ', e));
  };

  React.useEffect(() => {
    getNumberOfNodes();
    getTotalStake();
    getContractConfiguration();
  }, []);
  return (
    <div className="card-spacer mt-n25">
      <div className="row m-0">
        <StatCard
          title="Number of nodes"
          value={noNodes}
          valueUnit="nodes"
          color="warning"
          svg="Equalizer.svg"
        />
        <StatCard
          title="Total Stake"
          value={totalActiveStake}
          valueUnit={erdLabel}
          color="primary"
          svg="Add-user.svg"
        />
        <StatCard
          title="Service Fee"
          value={contractOverview.serviceFee || ''}
          valueUnit="%"
          color="danger"
          svg="./assets/images/Layers.svg"
        />
        <StatCard
          title="Max delegation cap"
          value={contractOverview.maxDelegationCap || ''}
          valueUnit={erdLabel}
          color="success"
          svg="Urgent-mail.svg"
        />
      </div>
    </div>
  );
};

export default Views;
