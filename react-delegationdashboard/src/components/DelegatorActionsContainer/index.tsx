import React from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import ViewStatAction from '../ViewStatAction';
import DelegateAction from '../DelegateAction';
import UndelegateAction from '../UndelegateAction/Index';

const DelegatorActionsContainer = () => {
    const { dapp, delegationContract } = useContext();
    const handleClaimRewards = () => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'claimRewards').then()
            .catch(e => console.error('handleClaimRewards error', e));
    };

    const handleRedelegateRewards = () => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'reDelegateRewards').then()
            .catch(e => console.error('handleRedelegateRewards error', e));
    };

    const handleWithdraw = () => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'withdraw').then()
            .catch(e => console.error('handleWithdraw error', e));
    };

    return (
        <div className="row full-width">
            <div className="col-12 mb-spacer">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <h6 className="m-0">My actions</h6>
                    </div>
                    <div className="card-body d-flex flex-wrap p-3 sp-action-btn">
                        <DelegateAction />
                        <UndelegateAction />
                        <ViewStatAction actionTitle="Withdraw" handleContinue={() => handleWithdraw()} />
                        <ViewStatAction actionTitle="Claim Rewards" handleContinue={() => handleClaimRewards()} />
                        <ViewStatAction actionTitle="Redelegate Rewards" handleContinue={() => handleRedelegateRewards()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelegatorActionsContainer;