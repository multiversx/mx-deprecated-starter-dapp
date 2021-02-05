import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import RequestTransactionModal from '../RequestTransactionModal';

const SetPercentageFeeAction = () => {
    const { dapp, delegationContract } = useContext();
    const [showUpdateFeeModal, setShowUpdateFeeModal] = useState(false);

    const handleUpdateFee = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        delegation.sendTransaction('0', 'changeServiceFee', (parseFloat(value) * 100).toString()).then();
    };
    
    return (
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

    );
};

export default SetPercentageFeeAction;