import * as React from 'react';
import { useContext } from '../../context';
import denominate from '../Denominate/formatters';
import StatCard from '../StatCard';
import { contractViews } from '../../contracts/ContractViews';

const DelegatorViews = () => {
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
            input: value.returnData[0].asBigInt.toString(),
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
    <div className="row stats full-width">
      <div className="col-12 mb-spacer">
        <div className="card card-small">
          <div className="card-header border-bottom">
            <h6 className="m-0">My delegation</h6>
          </div>
          <div className="card-body d-flex flex-wrap p-3">
            <StatCard title="Claimable rewards" value={claimableRewards} valueUnit={erdLabel} />
            <StatCard title="Active stake" value={userActiveStake} valueUnit={erdLabel} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DelegatorViews;
