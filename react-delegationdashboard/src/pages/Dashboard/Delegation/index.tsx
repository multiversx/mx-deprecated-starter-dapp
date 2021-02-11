import * as React from 'react';
import { useContext, useDispatch } from 'context';
import denominate from 'components/Denominate/formatters';
import DelegateAction from '../Actions/DelegateAction';
import UndelegateAction from '../Actions/UndelegateAction';
import { contractViews } from 'contracts/ContractViews';
import ClaimRewardsAction from '../Actions/ClaimRewardsAction';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import State from 'components/State';
import { denomination, decimals } from 'config';

const MyDelegation = () => {
  const { dapp, address, egldLabel, delegationContract, loading } = useContext();
  const dispatch = useDispatch();
  const { getClaimableRewards, getUserActiveStake } = contractViews;
  const [userActiveStake, setUserActiveState] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');
  const [displayRewards, setDisplayRewards] = React.useState(false);
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);

  const getAllData = () => {
    dispatch({ type: 'loading', loading: true });
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
        if (value.returnData.length > 0 && value.returnData[0]?.asNumber !== 0) {
          setDisplayUndelegate(true);
        }

        dispatch({ type: 'loading', loading: false });
      })
      .catch(e => {
        console.error('getUserActiveStake error', e);
        dispatch({
          type: 'loading',
          loading: false,
        });
      });
  };

  React.useEffect(getAllData, []);

  return (
    <>
      {loading ? (
        <State icon={faCircleNotch} iconClass="fa-spin text-primary" />
      ) : (
        <div className="card mt-spacer">
          <div className="card-body p-spacer">
            <div className="d-flex flex-wrap align-items-center justify-content-between">
              <p className="h6 mb-3">My Stake</p>
              {userActiveStake !== String(0) && (
                <div className="d-flex flex-wrap">
                  <DelegateAction />
                  {displayUndelegate && <UndelegateAction />}
                </div>
              )}
            </div>
            {userActiveStake === String(0) ? (
              <State
                title="No Stake Yet"
                description="Aliquam semper aliquet dui sit amet laoreet. Pellentesque lacinia posuere ipsum. Donec tortor mauris, rhoncus vel finibus nec, consectetur vitae velit."
                action={<DelegateAction />}
              />
            ) : (
              <div className="m-auto text-center py-spacer">
                <div>
                  <p className="m-0 text-dark">Active Stake</p>
                  <p className="h4">
                    {userActiveStake}
                    {egldLabel}
                  </p>
                </div>
                <div>
                  <p className="text-muted">
                    {claimableRewards}
                    {egldLabel} Claimable rewards
                  </p>
                </div>
                {displayRewards ? <ClaimRewardsAction /> : null}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MyDelegation;
