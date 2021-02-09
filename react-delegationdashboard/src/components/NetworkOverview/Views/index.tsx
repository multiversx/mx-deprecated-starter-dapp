import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { ContractOverview } from 'helpers/types';
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { Address } from '@elrondnetwork/erdjs/out';
import { useState } from 'react';

const Views = () => {
  const { address, dapp, erdLabel, delegationContract } = useContext();
  const { getTotalActiveStake, getNumNodes, getContractConfig } = contractViews;
  const [balance, setBalance] = useState('');
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
  const getBalance = () => {
    dapp.proxy.getAccount(new Address(address)).then(value => {
      let balance = denominate({
        decimals,
        denomination,
        input: value.balance.toString(),
        showLastNonZeroDecimal: false,
      });
      setBalance(balance.toString());
    });
  };

  React.useEffect(() => {
    getNumberOfNodes();
    getTotalStake();
    getContractConfiguration();
    getBalance();
  }, []);
  return (
    <div className="network-stats">
      <div className="row m-0">
        <div className="col-6 col-lg-3 mb-3 text-left">
          <StatCard
            title="Contract Stake"
            value={balance}
            valueUnit={erdLabel}
            color="orange"
            svg="contract.svg"
          />
        </div>
        <div className="col-6 col-lg-3 mb-3 text-left">
          <StatCard
            title="Number of Nodes"
            value={noNodes}
            valueUnit=""
            color="purple"
            svg="nodes.svg"
          />
        </div>
        <div className="col-6 col-lg-3 mb-3 text-left">
          <StatCard
            title="Service Fee"
            value={contractOverview.serviceFee || ''}
            valueUnit="%"
            color="pink"
            svg="service.svg"
          />
        </div>
        <div className="col-6 col-lg-3 mb-3 text-left">
          <StatCard
            title="Delegation cap"
            value={contractOverview.maxDelegationCap || ''}
            valueUnit={erdLabel}
            color="green"
            svg="delegation.svg"
          />
        </div>
      </div>
    </div>
  );
};

export default Views;
