import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';
import { NodeType } from '../../helpers/types';
import ActiveNodeRow from './ActiveNodeRow';
import InactiveNodeRow from './InactiveNodeRow';
import { getAllNodesStatus, getBlsKeysStatus, getQueueSize, getQueueIndex } from './keysFunctions';

const NodesTable = () => {
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
      <div className="card card-small full-width">
        <div className="card-header border-bottom">
          <h6 className="m-0">My Nodes</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3">
          {keys.length > 0 && keys.find(key => key.status.key !== 'notStaked') !== undefined ? (
            <div className="table-responsive table-overflow">
              <table className="table mb-0">
                <thead className="py-2 text-semibold border-bottom">
                  <tr>
                    <th className="border-0">
                      <div className="ml-2">#</div>
                    </th>
                    <th className="border-0">Public key</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys
                    .filter(key => key.status.key !== 'notStaked')
                    .map((blsKey, i) => (
                      <ActiveNodeRow blsKey={blsKey} key={i} index={i} />
                    ))}
                </tbody>
              </table>
            </div>
          ) : (
            <span>No keys found for this contract.</span>
          )}
        </div>
      </div>
      <div className="card card-small full-width">
        <div className="card-header border-bottom">
          <h6 className="m-0">Inactive Nodes</h6>
        </div>
        <div className="card-body d-flex flex-wrap p-3">
          {keys.length > 0 && keys.find(key => key.status.key === 'notStaked') !== undefined ? (
            <div className="table-responsive">
              <table className="table mb-0">
                <thead className="py-2 text-semibold border-bottom">
                  <tr>
                    <th className="border-0">
                      <div className="ml-2">#</div>
                    </th>
                    <th className="border-0">Public key</th>
                    <th className="border-0">Status</th>
                    <th className="border-0">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {keys
                    .filter(key => key.status.key === 'notStaked')
                    .map((blsKey, i) => (
                      <InactiveNodeRow blsKey={blsKey} key={i} index={i} />
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
export default NodesTable;
