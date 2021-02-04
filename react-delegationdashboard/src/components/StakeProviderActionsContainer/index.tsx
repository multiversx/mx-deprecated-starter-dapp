import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import RequestTransactionModal from '../RequestTransactionModal';
import { DropzoneFileType } from '../DropzonePem';
import RequestVariablesModal from '../DropzonePem/RequestVariablesModal';
import DelegationCapModal from '../DelegationCapModal';
import BigNumber from 'bignumber.js';
import nominate from '../../helpers/nominate';
import AutomaticActivationModal from '../AutomaticActivationModal';

const StakeProviderActionsContainer = () => {
    const { dapp, delegationContract } = useContext();
    const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);
    const [showAddNodes, setAddNodesModal] = useState(false);
    const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);
    const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);

    const handleUpdateFee = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'changeServiceFee', (parseFloat(value) * 100).toString()).then();
    };

    const handleUpdateDelegationCap = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        const hexCap = nominateValToHex(value);
        delegation.sendTransaction('0', 'modifyTotalDelegationCap', hexCap).then();
    };

    const handleAddNodes = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'addNodes', value).then();
    };

    const handleAutomaticActivation = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        let activation = Buffer.from(value).toString('hex');
        delegation.sendTransaction('0', 'setAutomaticActivation', activation).then();
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

    const nominateValToHex = (value: string) => {
        let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

        if (val.length % 2 !== 0) {
            val = '0' + val;
        }

        return val;
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
                        <div>
                            <button onClick={() => setShowDelegationCapModal(true)} className="btn btn-primary mt-3">
                                Update Delegation Cap
                       </button>
                            <DelegationCapModal
                                show={showDelegationCapModal} title='Delegation cap'
                                description="Update Delegation Cap"
                                handleClose={() => {
                                    setShowDelegationCapModal(false);
                                }} handleContinue={(value) => handleUpdateDelegationCap(value)}
                            />
                        </div>

                        <div>
                            <button onClick={() => setShowAutomaticActivationModal(true)} className="btn btn-primary mt-3">
                                Set Automatic Activation
                            </button>
                            <AutomaticActivationModal show={showAutomaticActivationModal} title='Automatic activation'
                                description="Set automatic activation 'yes' or 'no'"
                                handleClose={() => {
                                    setShowAutomaticActivationModal(false);
                                }} handleContinue={(value) => handleAutomaticActivation(value)} />
                        </div>
                    </div>
                </div>
            </div >
        </>
    );
};

export default StakeProviderActionsContainer;