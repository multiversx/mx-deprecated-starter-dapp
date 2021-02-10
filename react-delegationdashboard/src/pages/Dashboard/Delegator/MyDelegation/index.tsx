import * as React from 'react';
import { useContext } from 'context';
import denominate from 'components/Denominate/formatters';
import MyActions from '../MyActions';
import { contractViews } from 'contracts/ContractViews';
import ClaimRewardsAction from '../MyActions/ClaimRewardsAction';
import EmptyStake from './EmptyStake';

const MyDelegation = () => {
  const { dapp, address, erdLabel, delegationContract, denomination, decimals } = useContext();
  const { getClaimableRewards, getUserActiveStake } = contractViews;
  const [userActiveStake, setUserActiveState] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');
  const [displayRewards, setDisplayRewards] = React.useState(false);

  const getAllData = () => {
    getClaimableRewards(dapp, address, delegationContract)
      .then(value => {
        if (value.returnData.length > 0 && value.returnData[0]?.asNumber !== 0) {
          setDisplayRewards(true);
        }
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
            input: value.returnData[0]?.asBigInt.toString(),
            showLastNonZeroDecimal: false,
          }) || ''
        );
      })
      .catch(e => console.error('getUserActiveStake error', e));
  };

  React.useEffect(getAllData, []);

  return (
    <>
      {userActiveStake.localeCompare('0') === 0 ? (
        <EmptyStake />
      ) : (
        <div className="stats w-100 mb-spacer">
          <div className="card">
            <div className="card-header border-bottom-0 d-flex flex-wrap align-items-center">
              <h6 className="mt-2 mr-2 mb-0">My Stake</h6>
              <div className="d-flex flex-wrap align-items-center ml-sm-auto">
                <MyActions />
              </div>
            </div>
            <div className="card-body d-flex flex-wrap">
              <div className="m-auto text-center py-3 py-sm-5">
                <div>
                  <p className="m-0 text-dark">Active Stake</p>
                  <h4 className="">
                    {userActiveStake}
                    {erdLabel}
                  </h4>
                </div>
                <div>
                  <p className="text-muted">
                    {claimableRewards}
                    {erdLabel} Claimable rewards
                  </p>
                </div>
                {displayRewards ? <ClaimRewardsAction /> : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyDelegation;
