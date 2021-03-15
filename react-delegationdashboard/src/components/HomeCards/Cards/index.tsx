import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { NetworkStake } from '@elrondnetwork/erdjs/out';
import { useState } from 'react';

import SetPercentageFeeAction from './SetPercentageFeeAction';
import UpdateDelegationCapAction from './UpdateDelegationCapAction';
import AutomaticActivationAction from './AutomaticActivationAction';
import ReDelegateCapActivationAction from './ReDelegateCapActivationAction';

const Views = () => {
  const {
    dapp,
    egldLabel,
    totalActiveStake,
    numberOfActiveNodes,
    contractOverview,
    aprPercentage,
    numUsers,
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
    <div className="cards__login d-flex flex-wrap mr-spacer">
      <StatCard
        title="Contract Stake"
        value={denominate({
          input: totalActiveStake,
          denomination,
          decimals,
          showLastNonZeroDecimal: false,
        })}
        valueUnit={egldLabel}
        color="lightgreen"
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
      <StatCard title="Number of Users" value={numUsers.toString()} color="lightgreen" svg="user.svg" />
      <StatCard
        title="Number of Nodes"
        value={numberOfActiveNodes}
        valueUnit=""
        color="lightgreen"
        svg="nodes.svg"
        percentage={`${getPercentage(
          numberOfActiveNodes,
          networkStake.TotalValidators.toString()
        )}% of total nodes`}
      />
      <StatCard
        title="Computed APR"
        value={aprPercentage}
        valueUnit=""
        color="lightgreen"
        svg="leaf-solid.svg"
        percentage="Annual percentage rate"
        tooltipText="This is an aproximate APR calculation for this year based on the current epoch"
      />
      <StatCard
        title="Service Fee"
        value={contractOverview.serviceFee || ''}
        valueUnit="%"
        color="lightgreen"
        svg="service.svg"
      >
        {location.pathname === '/owner' && <SetPercentageFeeAction />}
      </StatCard>
      
    </div>
  );
};

export default Views;
