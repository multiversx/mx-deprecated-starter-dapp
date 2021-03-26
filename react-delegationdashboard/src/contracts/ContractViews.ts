import { Address, ContractFunction, Argument } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { auctionContract } from 'config';
import { DappState } from '../context/state';

export const contractViews = {
  getUserActiveStake: (dapp: DappState, address: string, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getUserActiveStake'),
      args: [Argument.fromPubkey(new Address(address))],
    });
    return dapp.proxy.queryContract(query);
  },
  getUserUnDelegatedList: (dapp: DappState, address: string, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getUserUnDelegatedList'),
      args: [Argument.fromPubkey(new Address(address))],
    });
    return dapp.proxy.queryContract(query);
  },
  getClaimableRewards: (dapp: DappState, address: string, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getClaimableRewards'),
      args: [Argument.fromPubkey(new Address(address))],
    });
    return dapp.proxy.queryContract(query);
  },
  getTotalActiveStake: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getTotalActiveStake'),
    });
    return dapp.proxy.queryContract(query);
  },
  getNumNodes: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getNumNodes'),
    });
    return dapp.proxy.queryContract(query);
  },
  getNumUsers: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getNumUsers'),
    });
    return dapp.proxy.queryContract(query);
  },
  getContractConfig: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getContractConfig'),
    });
    return dapp.proxy.queryContract(query);
  },
  getMetaData: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(delegationContract),
      func: new ContractFunction('getMetaData'),
    });
    return dapp.proxy.queryContract(query);
  },
  getBlsKeys: (dapp: DappState, delegationContract?: string) => {
    const query = new Query({
      address: new Address(auctionContract),
      func: new ContractFunction('getBlsKeysStatus'),
      args: [Argument.fromPubkey(new Address(delegationContract))],
    });
    return dapp.proxy.queryContract(query);
  },
};
