import moment from 'moment';
import React from 'react';
import { Denominate } from 'sharedComponents';
import { TransactionType } from 'context/state';
import StatusIcon from './StatusIcon';
import { useContext } from 'context';
import txStatus from './helpers/txStatus';

function sortByDate(a: TransactionType, b: TransactionType) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

const status = (status: string) => {
  switch (status) {
    case txStatus.pending:
      return 'Pending';
    case txStatus.failed:
      return 'Failed';
    case txStatus.notExecuted:
      return 'Not executed';
    default:
      return '';
  }
};

const fakeSender = 'erd000000000000000000000000000000000000000000000000000000000a';

const TransactionList = ({ transactions }: { transactions: TransactionType[] }) => {
  const { accountAddress } = useContext();
  const incoming = (sender: string) => sender === accountAddress && sender !== fakeSender;

  let explorerAddr = 'https://explorer.elrond.com/';

  // eslint-disable-next-line
  const doubleOwnTransactions = transactions.map((tx) => {
    if (tx.sender === tx.receiver && tx.blockHash !== '') {
      return { ...tx, sender: fakeSender, timestamp: tx.timestamp + 1 };
    }
  });

  const sortedTransactions: TransactionType[] = ([
    ...transactions,
    ...(doubleOwnTransactions.length > 0 ? doubleOwnTransactions : []),
  ].filter((el: any) => el !== undefined) as any).sort(sortByDate);

  return (
    <div className="p-3 mt-3">
      <h4 className="mb-3 font-weight-normal">Transactions</h4>
      <div className="table-responsive">
        <table className="transactions table pb-3">
          <thead>
            <tr className="bg-light">
              <th className="border-0 font-weight-normal"></th>
              <th className="border-0 font-weight-normal">Tx hash</th>
              <th className="border-0 font-weight-normal">Date</th>
              <th className="border-0 font-weight-normal">Amount</th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((tx: TransactionType, i) => {
              const incomingTransaction = incoming(tx.sender);
              const senderOrReceiver =
                incomingTransaction || tx.sender === fakeSender ? tx.receiver : tx.sender;

              return (
                <tr key={tx.hash + i}>
                  <td>
                    <div
                      className="transaction-icon bg-light d-flex align-items-center justify-content-center"
                      title={status(tx.status)}
                    >
                      <StatusIcon tx={tx} incomingTransaction={incomingTransaction} />
                    </div>
                  </td>
                  <td>
                    <a
                      href={`${explorerAddr}transactions/${tx.hash}`}
                      {...{
                        target: '_blank',
                      }}
                      className="tx-link"
                      title="View in Explorer"
                    >
                      {senderOrReceiver}
                    </a>
                  </td>
                  <td>{moment.unix(tx.timestamp).format('MMMM Do YYYY, h:mm A')}</td>
                  <td>
                    {tx.value === '0' ? '' : <>{tx.sender === accountAddress ? '-' : '+'}</>}
                    <Denominate value={tx.value} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className="d-flex justify-content-center">
        <a
          href={`${explorerAddr}address/${accountAddress}`}
          {...{
            target: '_blank',
          }}
        >
          See more transactions
        </a>
      </div>
    </div>
  );
};

export default TransactionList;
