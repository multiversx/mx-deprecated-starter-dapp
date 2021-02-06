import * as React from 'react';
import { decimals, denomination } from 'config';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
interface ViewsType {
  serviceFee: string;
  maxDelegationCap: string;
}

const Views = ({ serviceFee = '0', maxDelegationCap = '0' }: ViewsType) => {
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
    <div className="stats w-100 mb-spacer">
      <div className="card card-small">
        <div className="card-header border-bottom">
          <h6 className="m-0">Network overview</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3">
          <StatCard title="Number of nodes" value={noNodes} valueUnit="nodes" />
          <StatCard title="Total Stake" value={totalActiveStake} valueUnit={erdLabel} />
          <StatCard title="Service Fee" value={serviceFee} valueUnit="%" />
          <StatCard title="Max delegation cap" value={maxDelegationCap} valueUnit={erdLabel} />
        </div>
      </div>
    </div>
  );
};

export default Views;
