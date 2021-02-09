import React from 'react';
import { useContext } from 'context';
import { contractViews } from 'contracts/ContractViews';
import DelegateAction from './DelegateAction';
import UndelegateAction from './UndelegateAction/Index';
import ClaimRewardsAction from './ClaimRewardsAction';

const MyActions = () => {
  const { dapp, delegationContract, address } = useContext();
  const [displayRewards, setDisplayRewards] = React.useState(false);
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);
  const { getClaimableRewards, getUserActiveStake } = contractViews;

  React.useEffect(() => {
    getClaimableRewards(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData[0]?.asNumber !== 0) {
          setDisplayRewards(true);
        }
      })
      .catch(e => console.error('getClaimableRewards error', e));
    getUserActiveStake(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData.length > 0 && result.returnData[0]?.asNumber !== 0) {
          setDisplayUndelegate(true);
        }
      })
      .catch(e => console.error('getUserActiveStake error', e));
  }, []);

  return (
    <>
      <DelegateAction />
      {displayUndelegate ? <UndelegateAction /> : <></>}
      {displayRewards ? <ClaimRewardsAction /> : null}
    </>
  );
};

export default MyActions;
