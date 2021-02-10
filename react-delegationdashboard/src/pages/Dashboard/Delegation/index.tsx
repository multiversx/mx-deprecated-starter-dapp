import * as React from 'react';
import { useContext } from 'context';
import denominate from 'components/Denominate/formatters';
import DelegateAction from '../Actions/DelegateAction';
import UndelegateAction from '../Actions/UndelegateAction';
import { contractViews } from 'contracts/ContractViews';
import ClaimRewardsAction from '../Actions/ClaimRewardsAction';
import State from 'components/State';

const MyDelegation = () => {
  const { dapp, address, egldLabel, delegationContract, denomination, decimals } = useContext();
  const { getClaimableRewards, getUserActiveStake } = contractViews;
  const [userActiveStake, setUserActiveState] = React.useState('0');
  const [claimableRewards, setClaimableRewards] = React.useState('0');
  const [displayRewards, setDisplayRewards] = React.useState(false);
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);

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
    console.log('dasa', userActiveStake.localeCompare('0'));
  };

  React.useEffect(getAllData, []);

  React.useEffect(() => {
    getUserActiveStake(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData.length > 0 && result.returnData[0]?.asNumber !== 0) {
          setDisplayUndelegate(true);
        }
      })
      .catch(e => console.error('getUserActiveStake error', e));
  }, []);

  return (
    <div className="card mt-spacer">
      <div className="card-body px-spacer">
        <div className="d-flex align-items-center justify-content-between">
          <p className="h6">My Stake</p>
          {userActiveStake !== String(0) && (
            <div className="d-flex">
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
          <div className="m-auto text-center py-3 py-sm-5">
            <div>
              <p className="m-0 text-dark">Active Stake</p>
              <h4 className="">
                {userActiveStake}
                {egldLabel}
              </h4>
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
  );
};

export default MyDelegation;