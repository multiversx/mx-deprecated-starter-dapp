import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { ContractOverview } from 'helpers/types';
import moment from 'moment';

const Views = (contractOverview: { contractOverview: ContractOverview }) => {
  const { dapp, erdLabel, delegationContract } = useContext();
  const { getTotalActiveStake, getNumNodes } = contractViews;
  const [totalActiveStake, setTotalActiveStake] = React.useState('0');
  const [noNodes, setNoNodes] = React.useState('0');

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
  }, []);
  return (
    <div className="stats full-width">
      <div className="mb-spacer">
        <div className="card card-small">
          <div className="card-header border-bottom">
            <h6 className="m-0">Network overview</h6>
          </div>
          <div className="card-body d-flex flex-wrap p-3">
            <StatCard title="Number of nodes" value={noNodes} valueUnit="nodes" />
            <StatCard title="Total Stake" value={totalActiveStake} valueUnit={erdLabel} />
            <StatCard
              title="Service Fee"
              value={contractOverview.contractOverview.serviceFee || ''}
              valueUnit="%"
            />
            <StatCard
              title="Max delegation cap"
              value={contractOverview.contractOverview.maxDelegationCap || ''}
              valueUnit={erdLabel}
            />
            <StatCard
              title="Unbound period"
              value={moment
                .utc(
                  moment
                    .duration(contractOverview.contractOverview.unBondPeriod, 'seconds')
                    .asMilliseconds()
                )
                .format('HH:mm:ss')}
              valueUnit=""
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Views;
