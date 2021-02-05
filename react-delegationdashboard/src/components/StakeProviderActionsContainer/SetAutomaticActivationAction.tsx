import React, { useState } from 'react';
import { useContext } from '../../context';
import { Delegation } from '../../contracts';
import AutomaticActivationModal from '../AutomaticActivationModal';

const SetAutomaticActivationAction = () => {
    const { dapp, delegationContract } = useContext();
    const [showAutomaticActivationModal, setShowAutomaticActivationModal] = useState(false);

    const handleAutomaticActivation = (value: string) => {
        const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider);
        let activation = Buffer.from(value).toString('hex');
        delegation.sendTransaction('0', 'setAutomaticActivation', activation).then();
    };

    return (
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
    );
};

export default SetAutomaticActivationAction;
