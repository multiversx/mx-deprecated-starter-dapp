import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import NodeRow from './NodeRow';
import {
  getAllNodesStatus,
  getBlsKeysStatus,
  getQueueSize,
  getQueueIndex,
} from './helpers/keysFunctions';
import AddNodeAction from './AddNodeAction';
import { NodeType } from './helpers/nodeType';

const Nodes = () => {
  const { dapp, delegationContract } = useContext();
  const [keys, setKeys] = useState(new Array<NodeType>());
  const queued: any = [];

  const setQueuedKeys = async (queued: any, adaptedNodesStatus: NodeType[]) => {
    if (queued.length) {
      const results = await Promise.all([
        getQueueSize(dapp),
        ...queued.map((blsKey: any) => getQueueIndex(blsKey, dapp)),
      ]);

      let queueSize: any;
      results.forEach((result, index) => {
        if (index === 0) {
          queueSize = result;
        } else {
          const [found] = adaptedNodesStatus.filter(({ blsKey }: any) => {
            return blsKey === queued[index - 1];
          });

          found.queueIndex = result;
          found.queueSize = queueSize;
        }
      });
    }
  };

  const getDiplayNodes = () => {
    Promise.all([
      getAllNodesStatus(dapp, delegationContract),
      getBlsKeysStatus(dapp, queued, delegationContract),
    ])
      .then(async ([nodesStatus, blsKeys]) => {
        const adaptedNodesStatus = nodesStatus.map(item => {
          let index = blsKeys.findIndex(i => i.blsKey === item.blsKey);
          return {
            ...item,
            status: index >= 0 ? blsKeys[index].status : item.status,
          };
        });
        await setQueuedKeys(queued, adaptedNodesStatus);
        setKeys(adaptedNodesStatus);
      })
      .catch(error => console.error('getDiplayNodes error', error));
  };

  useEffect(getDiplayNodes, /* eslint-disable react-hooks/exhaustive-deps */ []);

  return (
    <>
      <div className="card mt-spacer">
        <div className="card-body p-spacer">
          <div className="d-flex flex-wrap align-items-center justify-content-between mb-spacer">
            <p className="h6 mb-3">My Nodes</p>
            <div className="d-flex">
              <AddNodeAction />
            </div>
          </div>
          {keys.length > 0 ? (
            <div className="table-responsive">
              <table className="table table-borderless mb-0">
                <thead className="text-uppercase font-weight-normal">
                  <tr>
                    <th>Public key</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys.map((blsKey, i) => (
                    <NodeRow blsKey={blsKey} key={i} index={i} />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span>No keys found for this contract.</span>
          )}
        </div>
      </div>
    </>
  );
};
export default Nodes;
