import moment from 'moment';
import React from 'react';
import Web3 from 'web3';
import BigNumber from 'bignumber.js';
import { Denominate } from 'sharedComponents';
import { truncate } from 'helpers';
import { TransactionType } from 'context/state';
import { Accordion, useAccordionToggle } from 'react-bootstrap';
import { CopyButton } from 'sharedComponents';
import StatusIcon from './StatusIcon';
import txStatus from './helpers/txStatus';
import { useContext } from 'context';

const getFee = (tx: TransactionType) => {
  const web3 = new Web3();
  const bNgasPrice = new BigNumber(tx.gasPrice);
  const multiplier =
    tx.status !== 'Success' ? new BigNumber(tx.gasLimit) : new BigNumber(tx.gasUsed);
  const output = web3.utils.toBN(bNgasPrice.times(multiplier) as any).toString(10);
  return output;
};

function sortByDate(a: TransactionType, b: TransactionType) {
  if (a.timestamp < b.timestamp) {
    return 1;
  }
  if (a.timestamp > b.timestamp) {
    return -1;
  }
  return 0;
}

function CustomToggle({ children, eventKey }: any) {
  // @ts-ignore
  const accordionToggle = useAccordionToggle(eventKey, (e) => null);

  return <div onClick={accordionToggle}>{children}</div>;
}

const firstSeparator = '~';
const separator = '_';
const fakeSender = 'erd000000000000000000000000000000000000000000000000000000000a';

const TransactionList = ({ transactions }: { transactions: TransactionType[] }) => {
  const { accountAddress } = useContext();
  const ref = React.useRef(null);
  const incoming = (sender: string) => sender === accountAddress && sender !== fakeSender;
  const [openHash, setOpenHash] = React.useState<string>(separator);

  let explorerAddr = 'https://explorer.elrond.com/';

  const toggle = (indexHash: string) => () => {
    if (openHash === indexHash) {
      setOpenHash(separator);
    } else {
      setOpenHash(indexHash);
    }
  };

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

  const accordionProps = {
    ...(openHash !== ''
      ? {
          defaultActiveKey:
            sortedTransactions.find((t) => t.hash === openHash.split(separator)[1])?.sender +
            firstSeparator +
            sortedTransactions
              .findIndex((t) => t.hash === openHash.split(separator)[1])
              .toString() +
            separator +
            openHash.split(separator)[1],
        }
      : {}),
  };

  return (
    <div className="row transactions-list mb-4">
      <div className="col">
        <div className="row mt-2">
          <div className="col-12">
            <div className="pb-4 pl-3">
              <span className="h6 text-muted">RECENT TRANSACTIONS</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <Accordion {...accordionProps}>
              <div data-testid="transactionsList" ref={ref}>
                {sortedTransactions.map((tx: TransactionType, i) => {
                  const incomingTransaction = incoming(tx.sender);
                  const valueClass = incomingTransaction ? 'text-primary' : 'text-primary';
                  const senderOrReceiver =
                    incomingTransaction || tx.sender === fakeSender ? tx.receiver : tx.sender;
                  const index = sortedTransactions.findIndex((t) => t.hash === tx.hash).toString();

                  const id = `${tx.sender}${firstSeparator}${index}${separator}${tx.hash}`;
                  return (
                    <div
                      className={`transaction m-2 mb-3 ${
                        openHash.split(separator)[1] === tx.hash &&
                        openHash.split(firstSeparator)[0] === tx.sender
                          ? 'open'
                          : ''
                      }`}
                      id={tx.hash}
                      key={tx.hash + i}
                    >
                      <CustomToggle eventKey={id}>
                        <div
                          className="transaction-header d-flex justify-content-between align-items-center"
                          onClick={toggle(id)}
                        >
                          <div className="media pr-3">
                            <StatusIcon tx={tx} incomingTransaction={incomingTransaction} />
                            <div className="media-body my-3">
                              <div className="mt-0 mb-1 d-flex align-items-center">
                                {incomingTransaction ? (
                                  <span className="font-weight-bold mr-2">
                                    {tx.status === txStatus.pending && (
                                      <span className="pending mr-2">PENDING</span>
                                    )}
                                    {tx.status === txStatus.failed && (
                                      <span className="pending mr-2">FAILED</span>
                                    )}
                                    {tx.status === txStatus.notExecuted && (
                                      <span className="pending mr-2">NOT EXECUTED</span>
                                    )}
                                    SENT TO:
                                  </span>
                                ) : (
                                  <span className="font-weight-bold mr-2">RECEIVED FROM:</span>
                                )}{' '}
                                <span>{senderOrReceiver}</span>
                                <CopyButton text={senderOrReceiver} extraClasses={'muted'} />
                              </div>
                              <span className="transaction-date">
                                {moment.unix(tx.timestamp).format('MMMM Do YYYY, h:mm A')}
                              </span>
                            </div>
                          </div>
                          <div className={`${valueClass} amount pr-3 text-right`}>
                            {tx.value === '0' ? (
                              ''
                            ) : (
                              <>{tx.sender === accountAddress ? '-' : '+'}</>
                            )}
                            <Denominate value={tx.value} />
                          </div>
                        </div>
                      </CustomToggle>
                      <Accordion.Collapse eventKey={id}>
                        <div className="transaction-details media">
                          <i className="spacer m-3">&nbsp;</i>

                          <div className="media-body">
                            {/* Fee */}
                            <div className="row mt-3">
                              <div className="col-12 col-md-2 d-flex">
                                Fee {tx.status !== 'Success' && <>Limit</>}
                              </div>
                              <div className="col-12 col-md-10 mt-2 mt-md-0 fee">
                                {/* {fee} */}
                                <Denominate value={getFee(tx)} showLastNonZeroDecimal={true} />
                              </div>
                            </div>

                            <div className="tx-details-ml mr-4">
                              <hr className="w-100" />
                            </div>

                            {/* Transaction */}
                            <div className="row">
                              <div className="col-12 col-md-2 d-flex">Transaction Hash</div>
                              <div className="col-12 col-md-10 mt-2 mt-md-0 d-flex align-items-center">
                                <a
                                  href={`${explorerAddr}transactions/${tx.hash}`}
                                  {...{
                                    target: '_blank',
                                  }}
                                  className="tx-link"
                                  title="View in Explorer"
                                >
                                  <span data-testid="txHash" className="address mr-2">
                                    {tx.hash}
                                  </span>
                                </a>
                              </div>
                            </div>

                            <div className="tx-details-ml mr-4">
                              <hr className="w-100" />
                            </div>

                            {/* Data */}
                            <div className="row mb-3">
                              <div className="col-12 col-md-2 d-flex">Data</div>
                              <div className="col-12 col-md-10 mt-2 mt-md-0">
                                <div className="mr-2 mr-md-4">
                                  <textarea
                                    readOnly
                                    className="form-control col-lg-12 cursor-text p-2"
                                    rows={2}
                                    defaultValue={tx.data ? truncate(tx.data, 200) : 'N/A'}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Accordion.Collapse>
                    </div>
                  );
                })}
              </div>
            </Accordion>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TransactionList;
