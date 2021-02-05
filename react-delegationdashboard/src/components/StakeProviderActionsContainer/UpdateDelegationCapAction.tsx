import BigNumber from 'bignumber.js';
import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import nominate from '../../helpers/nominate';
import DelegationCapModal from '../DelegationCapModal';

const UpdateDelegationCapAction = () => {
    const { dapp, delegationContract } = useContext();
    const [showDelegationCapModal, setShowDelegationCapModal] = useState(false);

    const handleUpdateDelegationCap = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        const hexCap = nominateValToHex(value);
        delegation.sendTransaction('0', 'modifyTotalDelegationCap', hexCap).then();
    };


    const nominateValToHex = (value: string) => {
        let val = value && value.length > 0 ? new BigNumber(nominate(value)).toString(16) : '0';

        if (val.length % 2 !== 0) {
            val = '0' + val;
        }

        return val;
    };

    return (
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


    );
};

export default UpdateDelegationCapAction;