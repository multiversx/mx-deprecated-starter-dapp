import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { ContractOverview } from 'helpers/types';
import { QueryResponse } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { Address, NetworkStake } from '@elrondnetwork/erdjs/out';
import { useState } from 'react';

import SetPercentageFeeAction from './SetPercentageFeeAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';

const Views = () => {
  const { address, dapp, erdLabel, delegationContract } = useContext();
  const { getTotalActiveStake, getNumNodes, getContractConfig } = contractViews;
  const [totalActiveStake, setTotalActiveStake] = React.useState('0');
  const [percentageForNodes, setPercentageForNodes] = React.useState('0');
  const [percentageForStake, setPercentageForStake] = React.useState('0');
  const [percentageForDelegationCap, setPercentageForDelegationCap] = React.useState('0');
  const [noNodes, setNoNodes] = React.useState('0');
  const [isAdminFlag, setIsAdminFlag] = useState(false);
  const [contractOverview, setContractOverview] = useState(new ContractOverview());
  const [, setNetworkStake] = useState(new NetworkStake());

  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress.localeCompare(ownerAddress) < 0 ? false : true;
  };

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

  const getPercentage = (firstValue: number, secondValue: number) => {
    return ((firstValue / secondValue) * 100).toFixed(2);
  };

  const getContractConfiguration = (totalStake: number) => {
    getContractConfig(dapp, delegationContract)
      .then(value => {
        let contractOverview = getContractOverviewType(value);
        if (isAdmin(value.returnData[0].asHex)) {
          setIsAdminFlag(true);
        }
        setContractOverview(contractOverview);
        setPercentageForDelegationCap(
          getPercentage(totalStake, parseInt(contractOverview.maxDelegationCap.replace(/,/g, '')))
        );
      })
      .catch(e => console.error('getContractConfig error ', e));
  };

  const getNumberOfNodes = (networkNodes: number) => {
    getNumNodes(dapp, delegationContract)
      .then(value => {
        setNoNodes(value.returnData[0].asNumber.toString() || '0');
        setPercentageForNodes(getPercentage(value.returnData[0]?.asNumber, networkNodes));
      })
      .catch(e => {
        console.error('getNumberOfNodes error ', e);
      });
  };

  const getTotalAndPercentageForStake = (networkStake: number) => {
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

        getContractConfiguration(parseInt(totalStake.toString().replace(/,/g, '')));
        setPercentageForStake(getPercentage(parseInt(totalStake.replace(/,/g, '')), networkStake));
      })
      .catch(e => console.error('getTotalStake error ', e));
  };
  const getNetworkStake = () => {
    dapp.apiProvider
      .getNetworkStake()
      .then(value => {
        setNetworkStake(value);
        let input = value.TotalStaked.toString().replace(/,/g, '');
        let networkStake = denominate({
          input,
          denomination,
          decimals,
          showLastNonZeroDecimal: true,
        });
        getTotalAndPercentageForStake(parseInt(networkStake.toString().replace(/,/g, '')));
        getNumberOfNodes(value.TotalValidators);
      })
      .catch(e => console.error('getTotalStake error ', e));
  };

  React.useEffect(getNetworkStake, []);

  return (
    <div className="mt-n5">
      <div className="row m-0">
        <div className="col-6 col-lg-3">
          <StatCard
            title="Contract Stake"
            value={totalActiveStake}
            valueUnit={erdLabel}
            color="orange"
            svg="contract.svg"
            percentage={`${percentageForStake}% of total stake`}
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard
            title="Number of Nodes"
            value={noNodes}
            valueUnit=""
            color="purple"
            svg="nodes.svg"
            percentage={`${percentageForNodes}% of total nodes`}
          />
        </div>
        <div className="col-6 col-lg-3">
          <StatCard
            title="Service Fee"
            value={contractOverview.serviceFee || ''}
            valueUnit="%"
            color="pink"
            svg="service.svg"
          >
            {isAdminFlag && <SetPercentageFeeAction />}
          </StatCard>
        </div>
        <div className="col-6 col-lg-3">
          <StatCard
            title="Delegation cap"
            value={contractOverview.maxDelegationCap || ''}
            valueUnit={erdLabel}
            color="green"
            svg="delegation.svg"
            percentage={`${percentageForDelegationCap}% filled`}
          >
            {isAdminFlag && <UpdateDelegationCapAction />}
          </StatCard>
        </div>
      </div>
    </div>
  );
};

export default Views;
