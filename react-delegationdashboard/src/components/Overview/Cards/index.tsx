import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { Address, NetworkStake } from '@elrondnetwork/erdjs/out';
import { useState } from 'react';

import SetPercentageFeeAction from './SetPercentageFeeAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';
import AutomaticActivationAction from './AutomaticActivationAction';

const Views = () => {
  const {
    dapp,
    egldLabel,
    totalActiveStake,
    numberOfActiveNodes,
    address,
    contractOverview,
  } = useContext();
  const [networkStake, setNetworkStake] = useState(new NetworkStake());

  const getPercentage = (amountOutOfTotal: string, total: string) => {
    let percentage =
      (parseInt(amountOutOfTotal.replace(/,/g, '')) / parseInt(total.replace(/,/g, ''))) * 100;
    if (percentage < 1) {
      return '<1';
    }
    return percentage ? percentage.toFixed(2) : '...';
  };

  const isAdmin = (ownerAddress: string) => {
    let loginAddress = new Address(address).hex();
    return loginAddress === ownerAddress;
  };

  const getNetworkStake = () => {
    dapp.apiProvider
      .getNetworkStake()
      .then(value => {
        setNetworkStake(value);
      })
      .catch(e => {
        console.error('getTotalStake error ', e);
      });
  };

  React.useEffect(() => {
    getNetworkStake();
  }, []);

  return (
    <div className="cards d-flex flex-wrap mr-spacer">
      <StatCard
        title="Contract Stake"
        value={denominate({
          input: totalActiveStake,
          denomination,
          decimals,
          showLastNonZeroDecimal: false,
        })}
        valueUnit={egldLabel}
        color="orange"
        svg="contract.svg"
        percentage={`${getPercentage(
          denominate({
            input: totalActiveStake,
            denomination,
            decimals,
            showLastNonZeroDecimal: false,
          }),
          denominate({
            input: networkStake.TotalStaked.toString(),
            denomination,
            decimals,
            showLastNonZeroDecimal: false,
          })
        )}% of total stake`}
      />
      <StatCard
        title="Number of Nodes"
        value={numberOfActiveNodes}
        valueUnit=""
        color="purple"
        svg="nodes.svg"
        percentage={`${getPercentage(
          numberOfActiveNodes,
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
        title="Delegation Cap"
        value={contractOverview.maxDelegationCap || ''}
        valueUnit={egldLabel}
        color="green"
        svg="delegation.svg"
        percentage={`${getPercentage(
          denominate({
            input: totalActiveStake,
            denomination,
            decimals,
            showLastNonZeroDecimal: false,
          }),
          contractOverview.maxDelegationCap
        )}% filled`}
      >
        {location.pathname === '/owner' && <UpdateDelegationCapAction />}
      </StatCard>
      {isAdmin(contractOverview.ownerAddress) && location.pathname === '/owner' && (
        <StatCard
          title="Automatic activation"
          value={contractOverview.automaticActivation === 'true' ? 'ON' : 'OFF'}
          color="purple"
          svg="activation.svg"
        >
          <AutomaticActivationAction automaticFlag={contractOverview.automaticActivation} />
        </StatCard>
      )}
    </div>
  );
};

export default Views;
