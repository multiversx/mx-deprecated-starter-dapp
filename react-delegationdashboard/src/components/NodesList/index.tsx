import { Address, Argument, ContractFunction } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import React, { useEffect, useState } from 'react';
import { useContext } from '../../context';
import { addresses } from '../../contracts';
import { NodeType } from '../../helpers/types';
import ActiveNodeRow from './ActiveNodeRow';
import InactiveNodeRow from './InactiveNodeRow';


const NodeStatus: { [key: string]: string } = {
    "notStaked": "Inactive",
    "unStaked": "UnStaked",
    "staked": "Staked",
    "jailed": "Jail"
}

const NodesTable = () => {
    const { dapp, address } = useContext();
    const [keys, setKeys] = useState(new Array<NodeType>())

    useEffect(() => {
        getAllNodesStatus();
        getBlsKeysStatus()
    }, [])
    const getAllNodesStatus = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getAllNodeStates')
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getAllNodeStates ", value)
                let nodes = new Array<NodeType>()
                let responseValues = value.returnData
                let status: { [key: string]: string }
                responseValues.forEach(value => {
                    if (isStatus(value.asString)) {
                        status = { key: value.asString, value: NodeStatus[value.asString] }
                    }
                    else {
                        nodes.push(new NodeType(value.asHex, status))
                    }
                })
                setKeys(nodes)
            })
            .catch(e => console.log("error ", e))
    }

    const getBlsKeysStatus = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getBlsKeysStatus'),
            args: [Argument.fromPubkey(new Address(address))]
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getBlsKeysStatus ", value)
            })
            .catch(e => console.log("error ", e))
    }

    const isStatus = (value: string) => {
        if (NodeStatus[value]) {
            return true;
        }
        return false;
    }
    return (
        <>
            <div className="card card-small full-width">
                {"My nodes" && (
                    <div className="card-header border-bottom">
                        <h6 className="m-0">My Nodes</h6>
                    </div>
                )}<div className="card-body d-flex flex-wrap p-3">
                    {keys.length > 0 ? (
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
                                    {keys.filter(key => key.status.key !== "notStaked").map((blsKey, i) => (
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
                {"My nodes" && (
                    <div className="card-header border-bottom">
                        <h6 className="m-0">Inactive Nodes</h6>
                    </div>
                )}<div className="card-body d-flex flex-wrap p-3">
                    {
                        keys.length > 0 && keys.find(key => key.status.key === "notStaked") !== undefined ? (
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
                                        {keys.filter(key => key.status.key === "notStaked").map((blsKey, i) => (
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
