import { useDelegation } from 'helpers';
import React, { useState } from 'react';
import { DropzoneFileType } from 'components/DropzonePem';
import RequestVariablesModal from 'components/DropzonePem/RequestVariablesModal';
import { BLS } from '@elrondnetwork/erdjs/out';

const AddNodeAction = () => {
  const { delegation } = useDelegation();
  const [showAddNodes, setAddNodesModal] = useState(false);

  const handleAddNodes = (value: string) => {
    delegation.sendTransaction('0', 'addNodes', value).then();
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
    </div>
  );
};

export default AddNodeAction;
