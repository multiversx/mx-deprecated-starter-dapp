import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import { DropzoneFileType } from '../DropzonePem';
import RequestVariablesModal from '../DropzonePem/RequestVariablesModal';

const AddNodeAction = () => {
    const { dapp, delegationContract } = useContext();
    const [showAddNodes, setAddNodesModal] = useState(false);

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

    );
};

export default AddNodeAction;