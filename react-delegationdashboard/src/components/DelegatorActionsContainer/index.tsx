import React from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import ViewStatAction from '../ViewStatAction';
import DelegateAction from '../DelegateAction';
import UndelegateAction from '../UndelegateAction/Index';
import { contractViews } from '../../contracts/ContractViews';

const DelegatorActionsContainer = () => {
  const { dapp, delegationContract, address } = useContext();
  const [displayRewards, setDisplayRewards] = React.useState(false);
  const [displayUndelegate, setDisplayUndelegate] = React.useState(false);
  const { getClaimableRewards, getUserActiveStake } = contractViews;

  React.useEffect(() => {
    getClaimableRewards(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData[0].asNumber !== 0) {
          setDisplayRewards(true);
        }
      })
      .catch(e => console.error('getClaimableRewards error', e));
    getUserActiveStake(dapp, address, delegationContract)
      .then(result => {
        if (result.returnData[0].asNumber !== 0) {
          setDisplayUndelegate(true);
        }
      })
      .catch(e => console.error('getClaimableRewards error', e));
  }, []);

  const handleClaimRewards = () => {
    const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
    delegation
      .sendTransaction('0', 'claimRewards')
      .then()
      .catch(e => console.error('handleClaimRewards error', e));
  };

  const handleRedelegateRewards = () => {
    const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
    delegation
      .sendTransaction('0', 'reDelegateRewards')
      .then()
      .catch(e => console.error('handleRedelegateRewards error', e));
  };

  return (
    <div className="stats mb-spacer w-100">
      <div className="card card-small">
        <div className="card-header border-bottom">
          <h6 className="m-0">My actions</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3 sp-action-btn">
          <DelegateAction />
          {displayUndelegate ? <UndelegateAction /> : <></>}
          {displayRewards ? (
            <ViewStatAction
              actionTitle="Claim Rewards"
              handleContinue={() => handleClaimRewards()}
            />
          ) : (
            <></>
          )}
          {displayRewards ? (
            <ViewStatAction
              actionTitle="Redelegate Rewards"
              handleContinue={() => handleRedelegateRewards()}
            />
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default DelegatorActionsContainer;
