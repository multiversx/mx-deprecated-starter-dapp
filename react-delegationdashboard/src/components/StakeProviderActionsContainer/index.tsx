import React, { useState } from "react";
import { useContext } from "../../context";
import { Delegation } from "../../contracts";
import BaseActionModal from "../BaseActionModal";

const StakeProviderActionsContainer = () => {
    const { dapp } = useContext();
    const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
    const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
    const [showAddNodes, setAddNodesModal] = useState(false);

    const handleUpdateFee = (value: string) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "changeServiceFee", (parseFloat(value) * 100).toString()).then();
    }

    const handleUpdateDelegationCap = (value: string) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "modifyTotalDelegationCap", value).then();
    }

    const handleAddNodes = (value: string) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "addNodes", value).then();
    }

    return (
        <div className="card rounded border-3 ">
            <div className="card-body text-center p-4">
                <div className="d-flex mt-4 justify-content-center sp-action-btn">
                    <div>
                        <button onClick={() => setShowUpdateFeeModal(true)} className="btn btn-primary mt-3">
                            Update fee
                       </button>
                        <BaseActionModal show={showUpdateFeeModal} title="Change service fee"
                            description={`Add the percentage fee `}
                            handleClose={() => {
                                setShowUpdateFeeModal(false);
                            }} handleContinue={(value) => handleUpdateFee(value)} />
                    </div>
                    <div>
                        <button onClick={() => setShowDelegationCapModal(true)} className="btn btn-primary mt-3">
                            Update Delegation Cap
                       </button>
                        <BaseActionModal show={showDelegationCapModal} title="Delegation cap"
                            description={`Set Delegation Cap`}
                            handleClose={() => {
                                setShowDelegationCapModal(false);
                            }} handleContinue={(value) => handleUpdateDelegationCap(value)} />
                    </div>

                    <div>
                        <button onClick={() => setAddNodesModal(true)} className="btn btn-primary mt-3">
                            Add nodes
                       </button>
                        <BaseActionModal show={showAddNodes} title="Add nodes"
                            description="Enter the number of nodes you want to add"
                            handleClose={() => {
                                setAddNodesModal(false);
                            }} handleContinue={(value) => handleAddNodes(value)} />
                    </div>
                </div>
            </div>

        </div>
    )
};

export default StakeProviderActionsContainer;