import BigNumber from 'bignumber.js';
import denominate from 'components/Denominate/formatters';
import { denomination, decimals } from 'config';
import { useContext, useDispatch } from 'context';
import { emptyAgencyMetaData } from 'context/state';
import {
  AgencyMetadata,
  ContractOverview,
  NetworkConfig,
  NetworkStake,
  Stats,
} from 'helpers/contractDataDefinitions';
import React from 'react';
import Footer from './Footer';
import Navbar from './Navbar';

const Layout = ({ children, page }: { children: React.ReactNode; page: string }) => {
  const dispatch = useDispatch();
  const { dapp, delegationContract } = useContext();

  return (
    <div className={`layout d-flex flex-column min-vh-100 ${page}`}>
      {page !== 'home' && <Navbar />}
      <main className="container flex-grow-1 d-flex p-3 p-sm-spacer">{children}</main>
      <Footer />
    </div>
  );
};

export default Layout;
