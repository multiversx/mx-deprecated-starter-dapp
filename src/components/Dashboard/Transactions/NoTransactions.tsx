import React from 'react';
import { PageState } from 'sharedComponents';

const NoTransactionsFound = () => (
  <PageState
    svgComponent={null}
    title="No Transactions"
    description="No transactions found for this wallet."
  />
);

export default NoTransactionsFound;
