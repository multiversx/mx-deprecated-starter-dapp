import React from "react";
import { useContext } from "../../context";
import { Delegation } from "../../contracts";
import BaseAction from "../BaseAction";
import DelegateAction from "../DelegateAction";
import UndelegateAction from "../UndelegateAction/Index";

const DelegatorActionsContainer = () => {
    const { dapp } = useContext();
    const handleClaimRewards = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendClaimRewards().then();
    }

    const handleRedelegateRewards = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendReDelegateRewards().then();
    }

    const handleWithdraw = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendWithdraw().then();
    }

    const handleViewRewards = () => {
    }
    const handleCalculateRewards = () => {
    }

    return (
        <div className="card rounded border-3 ">
            <div className="card-body text-center p-4">
                <div className="d-flex mt-4 justify-content-center sp-action-btn">
                    <DelegateAction />
                    <UndelegateAction />
                    <BaseAction actionTitle="Withdraw" handleContinue={() => handleWithdraw()} />
                    <BaseAction actionTitle="Claim Rewards" handleContinue={() => handleClaimRewards()} />
                    <BaseAction actionTitle="Redelegate Rewards" handleContinue={() => handleRedelegateRewards()} />
                    <div>
                        <button onClick={() => handleViewRewards()} className="btn btn-primary mt-3">
                            View Rewards
                        </button>
                    </div>
                    <div>
                        <button onClick={() => handleCalculateRewards()} className="btn btn-primary mt-3">
                            Calculate Rewards
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default DelegatorActionsContainer;