import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import RequestTransactionModal from '../RequestTransactionModal';
import { DropzoneFileType } from '../DropzonePem';
import RequestVariablesModal from '../DropzonePem/RequestVariablesModal';

const StakeProviderActionsContainer = () => {
    const { dapp, delegationContract } = useContext();
    const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
    const [showAddNodes, setAddNodesModal] = useState(false);

    const handleUpdateFee = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'changeServiceFee', (parseFloat(value) * 100).toString()).then();
    };

    const handleAddNodes = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'addNodes', value).then();
    };

    const getPemPubKeysWithSignature = (pemFiles: DropzoneFileType[]) => {
        let keysData = '';
        pemFiles.forEach(({ pubKey, signature }) => {
            keysData += `${pubKey}@${signature}`;
        });
        return keysData;
    };

    const addNodesRequest = {
        data: (pemFiles: DropzoneFileType[]) => {
            return `${getPemPubKeysWithSignature(pemFiles)}`;
        },
        variables: [
            {
                name: 'pemFiles',
                type: 'pemUpload',
            },
        ]
    };

    return (
        <>
            <div className="mb-spacer">
                <div className="card card-small">
                    <div className="card-header border-bottom">
                        <h6 className="m-0">{'Actions'}</h6>
                    </div>
                    <div className="card-body d-flex flex-wrap p-3 sp-action-btn">

                        <div>
                            <button onClick={() => setShowUpdateFeeModal(true)} className="btn btn-primary mt-3">
                                Update fee
                       </button>
                            <RequestTransactionModal show={showUpdateFeeModal} title='Change service fee'
                                description="Add the percentage fee"
                                handleClose={() => {
                                    setShowUpdateFeeModal(false);
                                }} handleContinue={(value) => handleUpdateFee(value)} />
                        </div>
                        <div>
                            <button onClick={() => setAddNodesModal(true)} className="btn btn-primary mt-3">
                                Add nodes
                       </button>
                            <RequestVariablesModal
                                name="Add nodes"
                                show={showAddNodes}
                                handleClose={() => {
                                    setAddNodesModal(false);
                                }}
                                triggerDispatchEvent={(variablesData: string) => handleAddNodes(variablesData)}
                                variables={addNodesRequest.variables}
                                data={addNodesRequest.data}
                            />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default StakeProviderActionsContainer;