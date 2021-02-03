import { Address, Argument, ContractFunction } from '@elrondnetwork/erdjs/out';
import { ContractReturnData, Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';
import { NodeType } from '../../helpers/types';
import ActiveNodeRow from './ActiveNodeRow';
import InactiveNodeRow from './InactiveNodeRow';
import { NodeStatus } from './NodeTypes';

const NodesTable = () => {
    const { dapp, delegationContract, auctionContract, stakingContract } = useContext();
    const [keys, setKeys] = useState(new Array<NodeType>());
    const queued: any = [];

    const getAllNodesStatus = () => {
        const query = new Query({
            address: new Address(delegationContract),
            func: new ContractFunction('getAllNodeStates')
        });
        return new Promise<Array<NodeType>>((resolve, reject) => {
            dapp.proxy.queryContract(query)
                .then((value) => {
                    let nodes = new Array<NodeType>();
                    let responseValues = value.returnData;
                    mapNodes(responseValues, isStatus, nodes);
                    return resolve(nodes);
                }).catch(e => console.error('GetAllNodesStatus error ', e));
        });
    };

    const getBlsKeysStatus = () => {
        const query = new Query({
            address: new Address(auctionContract),
            func: new ContractFunction('getBlsKeysStatus'),
            args: [Argument.fromPubkey(new Address(delegationContract))]
        });
        return new Promise<Array<NodeType>>((resolve) => {
            dapp.proxy.queryContract(query)
                .then((value) => {
                    let nodes = new Array<NodeType>();
                    let responseValues = value.returnData;
                    mapNodes(responseValues.reverse(), isStatus, nodes);
                    return resolve(nodes);
                })
                .catch(e => console.error('GetBlsKeysStatus error', e));
        });
    };
    const getQueueSize = () => {
        const query = new Query({
            address: new Address(stakingContract),
            func: new ContractFunction('getQueueSize')
        });
        return new Promise((resolve) => {
            dapp.proxy.queryContract(query)
                .then((value) => {
                    return resolve(value.returnData[0].asString);
                })
                .catch(e => console.error('getQueueSize error', e));
        });
    };

    const getQueueIndex = (blsKey: any) => {
        const query = new Query({
            address: new Address(stakingContract),
            func: new ContractFunction('getQueueIndex'),
            caller: new Address(auctionContract),
            args: [Argument.fromHex(blsKey)]
        });
        return new Promise((resolve) => {
            dapp.proxy.queryContract(query)
                .then((value) => {
                    console.log('Queue Index ', value);
                    return resolve(value.returnData[0].asString);
                })
                .catch(e => console.error('getQueueIndex error', e));
        });
    };

    const isStatus = (value: string) => {
        if (NodeStatus[value]) {
            return true;
        }
        return false;
    };

    const mapNodes = (responseValues: ContractReturnData[], isStatus: (value: string) => boolean, nodes: NodeType[]) => {
        let status: { [key: string]: string };
        responseValues.forEach(value => {
            if (isStatus(value.asString)) {
                status = { key: value.asString, value: NodeStatus[value.asString] };
            }
            else {
                if (status.key === 'queued') {
                    queued.push(value.asHex);
                }
                nodes.push(new NodeType(value.asHex, status));
            }
        });
    };

    const getDiplayNodes = () => {
        Promise.all([getAllNodesStatus(), getBlsKeysStatus()]).then(
            async ([nodesStatus, blsKeys]) => {
                let temp = nodesStatus;
                temp.map(item => {
                    let index = blsKeys.findIndex(i => i.blsKey === item.blsKey);
                    if (index >= 0) {
                        item.status = blsKeys[index].status;
                    }
                });
                if (queued.length) {
                    const results = await Promise.all(
                        [getQueueSize(), ...queued.map((blsKey: any) => getQueueIndex(blsKey))]
                    );

                    let queueSize: any;
                    results.forEach(([result], index) => {
                        if (index === 0) {
                            queueSize = result;
                        } else {
                            const [found] = temp.filter(({ blsKey }: any) => {
                                return blsKey === queued[index - 1];
                            });

                            found.queueIndex = result;
                            found.queueSize = queueSize;
                        }
                    });
                }
                setKeys(temp);
            }).catch(error => console.error('getDiplayNodes error', error));
    };

    useEffect(getDiplayNodes, []);

    return (
        <>
            <div className="card card-small full-width">
                <div className="card-header border-bottom">
                    <h6 className="m-0">My Nodes</h6>
                </div>
                <div className="card-body d-flex flex-wrap p-3">
                    {keys.length > 0 ? (
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
                                    {keys.filter(key => key.status.key !== 'notStaked').map((blsKey, i) => (
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
                    {
                        keys.length > 0 && keys.find(key => key.status.key === 'notStaked') !== undefined ? (
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
                                        {keys.filter(key => key.status.key === 'notStaked').map((blsKey, i) => (
                                            <InactiveNodeRow blsKey={blsKey} key={i} index={i} />
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                                <span>No keys found for this contract.</span>
                            )
                    }
                </div>
            </div>
        </>
    );
};
export default NodesTable;