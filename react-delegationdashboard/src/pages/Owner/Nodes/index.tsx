import React, { useEffect, useState } from 'react';
import { useContext } from 'context';
import { NodeType } from 'helpers/types';
import NodeRow from './NodeRow';
import {
  getAllNodesStatus,
  getBlsKeysStatus,
  getQueueSize,
  getQueueIndex,
} from './helpers/keysFunctions';
import SetAutomaticActivationAction from './SetAutomaticActivationAction';
import AddNodeAction from './AddNodeAction';

const Nodes = ({ automaticActivationFlag }: { automaticActivationFlag: string }) => {
  const { dapp, delegationContract, auctionContract, stakingContract } = useContext();
  const [keys, setKeys] = useState(new Array<NodeType>());
  const queued: any = [];

  const setQueuedKeys = async (queued: any, adaptedNodesStatus: NodeType[]) => {
    if (queued.length) {
      const results = await Promise.all([
        getQueueSize(dapp, stakingContract),
        ...queued.map((blsKey: any) =>
          getQueueIndex(blsKey, dapp, stakingContract, auctionContract)
        ),
      ]);

      let queueSize: any;
      results.forEach(([result], index) => {
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
      getBlsKeysStatus(dapp, queued, delegationContract, auctionContract),
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

  useEffect(getDiplayNodes, []);

  return (
    <>
      <div className="stats w-100 mb-spacer">
        <div className="card">
          <div className="card-header border-bottom-0 d-flex flex-wrap align-items-center">
            <h6 className="mt-2 mr-2 mb-0">My Nodes</h6>
            <div className="d-flex flex-wrap align-items-center ml-sm-auto">
              <AddNodeAction />
              <SetAutomaticActivationAction automaticFlag={automaticActivationFlag} />
            </div>
          </div>
          <div className="card-body d-flex flex-wrap">
            {keys.length > 0 ? (
              <div className="table-responsive table-overflow">
                <table className="table table-borderless mb-0">
                  <thead className="py-2 text-uppercase font-weight-normal">
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
      </div>
    </>
  );
};
export default Nodes;
