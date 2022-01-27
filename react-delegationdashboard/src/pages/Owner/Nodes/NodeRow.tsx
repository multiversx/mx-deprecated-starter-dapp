import {
  Address,
  BytesValue,
  ContractFunction,
  decodeUnsignedNumber,
  Query,
} from '@elrondnetwork/erdjs';
import { faCaretDown, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React, { useState } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useContext } from 'context';
import { nodeActions } from './helpers/nodeTypes';
import { nodeTransactions } from './helpers/stakeHooks';
import { stakingContract } from 'config';
import { NodeType } from './helpers/nodeType';
import { DelegationTransactionType } from 'helpers/contractDataDefinitions';
import { useDelegationWallet } from 'helpers/useDelegation';
import ConfirmTransactionModal from 'components/ConfirmTransactionModal';

type ActionType = 'unStake' | 'unJail' | 'unBond' | 'reStake' | 'stake' | 'remove';

const allowedActions: { [key: string]: ActionType[] } = {
  staked: ['unStake'],
  jailed: ['unJail'],
  unStaked: ['unBond', 'reStake'],
  queued: ['unStake'],
  notStaked: ['stake', 'remove'],
};

const NodeRow = ({ blsKey: key }: { blsKey: NodeType; index: number }) => {
  const { explorerAddress, dapp, ledgerAccount, walletConnectAccount } = useContext();
  const [showCheckYourLedgerModal, setShowCheckYourLedgerModal] = useState(false);
  const [transactionArguments, setTransactionArguments] = useState(
    new DelegationTransactionType('', '')
  );

  const { sendTransactionWallet } = useDelegationWallet();

  const handleAction = (action: ActionType) => {
    const txArguments = nodeTransactions[action]({ blsKey: key.blsKey });
    if (ledgerAccount || walletConnectAccount) {
      setTransactionArguments(txArguments);
      setShowCheckYourLedgerModal(true);
    } else {
      sendTransactionWallet(txArguments);
    }
  };
  const ref = React.useRef(null);

  const [remaining, setRemaining] = React.useState(0);
  const fetchUnBondPeriod = () => {
    const query = new Query({
      address: new Address(stakingContract),
      func: new ContractFunction('getRemainingUnBondPeriod'),
      args: [BytesValue.fromHex(key.blsKey)],
    });
    if (key.status.key === 'unStaked') {
      dapp.proxy
        .queryContract(query)
        .then(value => {
          const untypedResponse = value.outputUntyped();
          const remainingUnBondPeriod = decodeUnsignedNumber(untypedResponse[0]);
          const newRemaining = remainingUnBondPeriod !== undefined ? remainingUnBondPeriod : 0;

          if (ref.current !== null) {
            setRemaining(newRemaining * 6);
          }
        })
        .catch(e => console.error('fetchUnBondPeriod error ', e));
    }
  };
  const formatDuration = (ms: number) => {
    const days = Math.floor(ms / 8.64e7);
    const msOnLastDay = ms - days * 8.64e7;
    return (days < 10 ? '0' + days : days) + ':' + moment.utc(msOnLastDay).format('HH:mm:ss');
  };

  React.useEffect(
    fetchUnBondPeriod,
    /* eslint-disable react-hooks/exhaustive-deps */ [key.blsKey, key.status]
  );

  const statusColor =
    key.status.key === 'staked' ? 'green' : key.status.key === 'jailed' ? 'red' : 'orange';
  return (
    <tr ref={ref}>
      <td>
        <div className="d-flex align-items-center text-nowrap trim">
          <span className="text-truncate">{key.blsKey}</span>
          <a
            href={`${explorerAddress}nodes/${key.blsKey}`}
            {...{
              target: '_blank',
            }}
            className="ml-2"
          >
            <FontAwesomeIcon icon={faSearch} className="text-muted" />
          </a>
        </div>
      </td>
      <td>
        {key.status.key === 'queued' && key.queueIndex && key.queueSize ? (
          <span className={`badge badge-sm badge-light-${statusColor} text-${statusColor}`}>
            {key.status.value} ({key.queueIndex}/{key.queueSize})
          </span>
        ) : (
          <span className={`badge badge-sm badge-light-${statusColor} text-${statusColor}`}>
            {key.status.value}
          </span>
        )}
      </td>

      <td>
        <Dropdown className="ml-auto">
          <Dropdown.Toggle variant="" className="btn btn-sm btn-primary action-dropdown">
            <FontAwesomeIcon icon={faCaretDown} className="fa-2x" />
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {Object.keys(nodeActions).map(entry => {
              const action: ActionType = entry as any;
              let actionAllowed = allowedActions[key.status.key].includes(action);
              if (actionAllowed && action === 'unBond' && remaining !== 0) {
                actionAllowed = false;
              }
              return (
                <Dropdown.Item
                  className={`dropdown-item ${actionAllowed ? '' : 'disabled'}`}
                  key={action}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (actionAllowed) {
                      handleAction(action);
                    }
                  }}
                >
                  {nodeActions[action].label}{' '}
                  {action === 'unBond' && remaining !== 0 && (
                    <span className="text-muted">
                      ({formatDuration(moment.duration(remaining, 'seconds').asMilliseconds())}{' '}
                      left)
                    </span>
                  )}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </td>
      <ConfirmTransactionModal
        show={showCheckYourLedgerModal}
        transactionArguments={transactionArguments}
        handleClose={() => {
          setShowCheckYourLedgerModal(false);
        }}
      />
    </tr>
  );
};

export default NodeRow;
