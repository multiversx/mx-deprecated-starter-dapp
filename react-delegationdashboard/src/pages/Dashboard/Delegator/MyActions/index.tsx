import React, { useState } from 'react';
import { useContext } from 'context';
import ViewStatAction from 'components/ViewStatAction';
import { contractViews } from 'contracts/ContractViews';
import { useDelegation } from 'helpers';
import DelegateAction from './DelegateAction';
import UndelegateAction from './UndelegateAction/Index';

const MyActions = () => {
  const { dapp, delegationContract, address } = useContext();
  const { delegation } = useDelegation();
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
        if (result.returnData[0]?.asNumber !== 0) {
          setDisplayUndelegate(true);
        }
      })
      .catch(e => console.error('getClaimableRewards error', e));
  }, []);

  const handleClaimRewards = () => {
    delegation
      .sendTransaction('0', 'claimRewards')
      .then()
      .catch(e => console.error('handleClaimRewards error', e));
  };

  const handleRedelegateRewards = () => {
    delegation
      .sendTransaction('0', 'reDelegateRewards')
      .then()
      .catch(e => console.error('handleRedelegateRewards error', e));
  };

  return (
    <div className="stats w-100 mb-spacer">
      <div className="d-flex flex-wrap justify-content-between align-items-center">
        <h4 className="mb-2">Delegation Manager</h4>
        <div className="d-flex flex-wrap">
          <DelegateAction />
          {displayUndelegate ? <UndelegateAction /> : <></>}
          {displayRewards ? (
            <ViewStatAction actionTitle="Claim Rewards" handleContinue={handleClaimRewards} />
          ) : (
            <></>
          )}
          {displayRewards ? (
            <ViewStatAction
              actionTitle="Redelegate Rewards"
              handleContinue={handleRedelegateRewards}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyActions;
