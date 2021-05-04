import React, { useState } from 'react';
import { DropzoneFileType } from 'components/DropzonePem';
import RequestVariablesModal from 'components/DropzonePem/RequestVariablesModal';
import { BLS } from '@elrondnetwork/erdjs';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import { useContext } from 'context';
import ConfirmTransactionModal from 'components/ConfirmTransactionModal';

const AddNodeAction = () => {
  const { ledgerAccount, walletConnectAccount } = useContext();
  const [showAddNodes, setAddNodesModal] = useState(false);
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );
  const { sendTransactionWallet } = useDelegationWallet();

  const handleAddNodes = (value: string) => {
    let txArguments = new DelegationTransactionType('0', 'addNodes', value);
    if (ledgerAccount || walletConnectAccount) {
      setAddNodesModal(false);
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
  };

  const getPemPubKeysWithSignature = (pemFiles: DropzoneFileType[]) => {
    let keysData = '';
    pemFiles.forEach(({ pubKey, signature }) => {
      keysData += `@${pubKey}@${signature}`;
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
    ],
  };
  return (
    <div>
      <button
        onClick={async () => {
          await BLS.initIfNecessary();
          setAddNodesModal(true);
        }}
        className="btn btn-primary ml-3 mb-3"
      >
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
      <ConfirmTransactionModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </div>
  );
};

export default AddNodeAction;
