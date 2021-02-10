import { Address, Argument, ContractFunction } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { faEllipsisV, faSearch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import moment from 'moment';
import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';
import { useContext } from 'context';
import { nodeActions } from './helpers/nodeTypes';
import { nodeTransactions } from './helpers/stakeHooks';
import { NodeType } from 'helpers/types';

type ActionType = 'unStake' | 'unJail' | 'unBond' | 'reStake' | 'stake';

const allowedActions: { [key: string]: ActionType[] } = {
  staked: ['unStake'],
  jailed: ['unJail'],
  unStaked: ['unBond', 'reStake'],
  queued: ['unStake'],
  notStaked: ['stake'],
};

const NodeRow = ({ blsKey: key, index }: { blsKey: NodeType; index: number }) => {
  const { explorerAddress, dapp, stakingContract, delegationContract } = useContext();
  const ref = React.useRef(null);

  const [remaining, setRemaining] = React.useState(0);
  const fetchUnBondPeriod = () => {
    const query = new Query({
      address: new Address(stakingContract),
      func: new ContractFunction('getRemainingUnBondPeriod'),
      args: [Argument.fromHex(key.blsKey)],
    });
    if (key.status.key === 'unStaked') {
      dapp.proxy
        .queryContract(query)
        .then(value => {
          const remainingUnBondPeriod = value.returnData[0].asNumber;
          const newRemaining = remainingUnBondPeriod !== undefined ? remainingUnBondPeriod : 0;

          if (ref.current !== null) {
            setRemaining(newRemaining * 6);
          }
        })
        .catch(e => console.error('fetchUnBondPeriod error ', e));
    }
  };

  React.useEffect(fetchUnBondPeriod, [key.blsKey, key.status]);

  const statusColor =
    key.status.key === 'staked' ? 'green' : key.status.key === 'jailed' ? 'pink' : 'orange';
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
            className="side-action ml-2"
          >
            <FontAwesomeIcon icon={faSearch} />
          </a>
        </div>
      </td>
      <td>
        {key.status.key === 'queued' && key.queueIndex && key.queueSize ? (
          <span className={`bg-light-${statusColor} text-${statusColor} px-3 py-2`}>
            {key.status.value} ({key.queueIndex}/{key.queueSize})
          </span>
        ) : (
          <span className={`bg-light-${statusColor} text-${statusColor} px-3 py-2`}>
            {key.status.value}
          </span>
        )}
      </td>

      <td>
        <Nav className="hide-caret">
          <NavDropdown
            title={
              <span className="link">
                <FontAwesomeIcon icon={faEllipsisV} className="side-action ml-2" />
              </span>
            }
            id="basic-nav-dropdown"
            className="ml-auto"
          >
            {Object.keys(nodeActions).map(entry => {
              const action: ActionType = entry as any;
              let actionAllowed = allowedActions[key.status.key].includes(action);
              if (actionAllowed && action === 'unBond' && remaining !== 0) {
                actionAllowed = false;
              }
              return (
                <a
                  className={`dropdown-item ${actionAllowed ? '' : 'disabled'}`}
                  key={action}
                  onClick={(e: React.MouseEvent) => {
                    e.preventDefault();
                    if (actionAllowed) {
                      nodeTransactions[action](key.blsKey, dapp, delegationContract)
                        .then()
                        .catch(e => console.error('error', e));
                    }
                  }}
                >
                  {nodeActions[action].label}{' '}
                  {action === 'unBond' && remaining !== 0 && (
                    <span className="text-muted">
                      (
                      {moment
                        .utc(moment.duration(remaining, 'seconds').asMilliseconds())
                        .format('HH:mm:ss')}{' '}
                      left)
                    </span>
                  )}
                </a>
              );
            })}
          </NavDropdown>
        </Nav>
      </td>
    </tr>
  );
};

export default NodeRow;
