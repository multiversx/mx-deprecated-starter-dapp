import { Address, Argument, ContractFunction } from "@elrondnetwork/erdjs/out";
import { Query } from "@elrondnetwork/erdjs/out/smartcontracts/query";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { useContext } from "../../context";
import { addresses } from "../../contracts";
import { NodeType } from "../../helpers/types";
import Trim from "../Trim";
import { nodeActions, nodeTransactions } from "./NodeTypes";

type ActionType = 'unStake' | 'unJail' | 'unBond' | 'reStake';

const allowedActions: { [key: string]: ActionType[] } = {
    staked: ['unStake'],
    jailed: ['unJail'],
    unStaked: ['unBond'],
    reStake: ['reStake'],
};

const ActiveNodeRow = ({ blsKey: key, index }: { blsKey: NodeType; index: number }) => {
    const { explorerAddress, dapp } = useContext();
    const ref = React.useRef(null);

    const [remaining, setRemaining] = React.useState(0);
    const fetchUnBondPeriod = () => {
        const query = new Query({
            address: new Address(addresses["staking_smart_contract"]),
            func: new ContractFunction('getRemainingUnBondPeriod'),
            args: [Argument.fromHex(key.blsKey)]
        })
        if (key.status.key === 'unStaked') {
            dapp.proxy.queryContract(query)
                .then((value) => {
                    const remainingUnBondPeriod = value.returnData[0].asNumber;
                    const newRemaining = remainingUnBondPeriod !== undefined ? remainingUnBondPeriod : 0;
                    if (ref.current !== null) {
                        setRemaining(newRemaining * 6);
                    }
                })
                .catch(e => console.log("error ", e))
        }
    };

    React.useEffect(fetchUnBondPeriod, [key.blsKey, key.status]);

    const statusColor = key.status.key === 'staked' ? 'success' : key.status.key === 'jailed' ? 'danger' : 'warning';
    return (
        <tr>
            <td>
                <div className="ml-2">{index + 1}</div>
            </td>
            <td>
                <div className="d-flex align-items-center text-nowrap bls-trim trim-fs-sm">
                    <Trim text={key.blsKey} />
                    <a href={`${explorerAddress}nodes/${key.blsKey}`}
                        {...{
                            target: '_blank',
                        }} className="side-action">
                        <FontAwesomeIcon icon={faSearch} />
                    </a>
                </div>
            </td>
            <td>
                {key.status.key === 'queued' ? (
                    <div className={`status-badge ${statusColor}`}>
                        <div className="d-flex align-items-center">
                            <span className={`led mr-1 bg-${statusColor}`} />
                            {key.status.value}
                        </div>
                    </div>
                ) : (
                        <div className={`status-badge ${statusColor}`}>
                            <div className="d-flex align-items-center">

                                <span className={`led mr-1 bg-${statusColor}`} />
                                {key.status.value}
                            </div>
                        </div>
                    )}
            </td>

            <td>
                {Object.keys(nodeActions).map((entry) => {
                    const action: ActionType = entry as any;
                    let actionAllowed = allowedActions[key.status.key].includes(action);
                    if (actionAllowed && action === 'unBond' && remaining !== 0) {
                        actionAllowed = false;
                    }
                    return (
                        <button
                            className={`btn btn-primary node-action-btn ${actionAllowed ? '' : 'disabled'}`}
                            key={action}
                            onClick={(e: React.MouseEvent) => {
                                e.preventDefault();
                                if (actionAllowed) {
                                    nodeTransactions[action](key.blsKey, dapp);
                                }
                            }}
                        >
                            {nodeActions[action].label}{' '}
                            {action === 'unBond' && (
                                <span className="text-muted">
                                </span>
                            )}
                        </button>
                    );
                })}
            </td>
        </tr>
    )
}

export default ActiveNodeRow;