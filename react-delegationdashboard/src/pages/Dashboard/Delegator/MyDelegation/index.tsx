import * as React from 'react';
import { useContext } from 'context';
import denominate from 'components/Denominate/formatters';
import StatCard from 'components/StatCard';
import { contractViews } from 'contracts/ContractViews';

const MyDelegation = () => {
  const { dapp, address, erdLabel, delegationContract, denomination, decimals } = useContext();
  const { getClaimableRewards, getUserActiveStake } = contractViews;
  const [userActiveStake, setUserActiveState] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');

  const getAllData = () => {
    getClaimableRewards(dapp, address, delegationContract)
      .then(value => {
        setClaimableRewards(
          denominate({
            denomination,
            decimals,
            input: value.returnData[0]?.asBigInt.toString(),
            showLastNonZeroDecimal: false,
          }) || ''
        );
      })
      .catch(e => console.error('getClaimableRewards error', e));
    getUserActiveStake(dapp, address, delegationContract)
      .then(value => {
        setUserActiveState(
          denominate({
            denomination,
            decimals,
            input: value.returnData[0].asBigInt.toString(),
            showLastNonZeroDecimal: false,
          }) || ''
        );
      })
      .catch(e => console.error('getUserActiveStake error', e));
  };

  React.useEffect(getAllData, []);

  return (
    <div className="stats w-100 mb-spacer">
      <div className="card card-small">
        <div className="card-header border-bottom">
          <h6 className="m-0">My delegation</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3">
          <StatCard
            title="Claimable rewards"
            value={claimableRewards}
            valueUnit={erdLabel}
            color=""
            svg=""
          />
          <StatCard
            title="Active stake"
            value={userActiveStake}
            valueUnit={erdLabel}
            color=""
            svg=""
          />
        </div>
      </div>
    </div>
  );
};

export default MyDelegation;
