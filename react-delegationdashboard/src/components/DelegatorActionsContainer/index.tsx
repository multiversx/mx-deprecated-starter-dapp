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
        delegationContract.sendTransaction("0","claimRewards").then();
    }

    const handleRedelegateRewards = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0","reDelegateRewards").then();
    }

    const handleWithdraw = () => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0","withdraw").then();
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
                </div>
            </div>

        </div>
    )
};

export default DelegatorActionsContainer;