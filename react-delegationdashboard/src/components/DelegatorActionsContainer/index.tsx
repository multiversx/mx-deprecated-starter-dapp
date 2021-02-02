import React from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import BaseAction from '../BaseAction';
import DelegateAction from '../DelegateAction';
import UndelegateAction from '../UndelegateAction/Index';

const DelegatorActionsContainer = () => {
    const { dapp } = useContext();
    const handleClaimRewards = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction('0', 'claimRewards').then();
    };

    const handleRedelegateRewards = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction('0', 'reDelegateRewards').then();
    };

    const handleWithdraw = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction('0', 'withdraw').then();
    };

    return (
        <div className="row full-width">
            <div className="col-12 mb-spacer">
                <div className="card card-small">
                    {'My actions' && (
                        <div className="card-header border-bottom">
                            <h6 className="m-0">{'My actions'}</h6>
                        </div>
                    )}<div className="card-body d-flex flex-wrap p-3 sp-action-btn">
                        <DelegateAction />
                        <UndelegateAction />
                        <BaseAction actionTitle="Withdraw" handleContinue={() => handleWithdraw()} />
                        <BaseAction actionTitle="Claim Rewards" handleContinue={() => handleClaimRewards()} />
                        <BaseAction actionTitle="Redelegate Rewards" handleContinue={() => handleRedelegateRewards()} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelegatorActionsContainer;