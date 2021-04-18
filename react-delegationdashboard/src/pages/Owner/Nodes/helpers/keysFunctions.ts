import { Address, Argument, ContractFunction } from '@elrondnetwork/erdjs/out';
import { ContractReturnData, Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import { auctionContract, stakingContract } from 'config';
import { DappState } from 'context/state';
import { NodeType } from './nodeType';
import { NodeStatus } from './nodeTypes';

export const getAllNodesStatus = (dapp: DappState, delegationContract?: string) => {
  const query = new Query({
    address: new Address(delegationContract),
    func: new ContractFunction('getAllNodeStates'),
  });
  return new Promise<Array<NodeType>>(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
        let nodes = new Array<NodeType>();
        let responseValues = value.returnData;
        mapNodes(responseValues, nodes, []);
        return resolve(nodes);
      })
      .catch(e => console.error('GetAllNodesStatus error ', e));
  });
};

export const getBlsKeysStatus = (dapp: DappState, queued: any[], delegationContract?: string) => {
  const query = new Query({
    address: new Address(auctionContract),
    func: new ContractFunction('getBlsKeysStatus'),
    args: [Argument.fromPubkey(new Address(delegationContract))],
  });
  return new Promise<Array<NodeType>>(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
        let nodes = new Array<NodeType>();
        let responseValues = value.returnData;
        mapNodes(responseValues.reverse(), nodes, queued);
        return resolve(nodes);
      })
      .catch(e => console.error('GetBlsKeysStatus error', e));
  });
};
export const getQueueSize = (dapp: DappState) => {
  const query = new Query({
    address: new Address(stakingContract),
    func: new ContractFunction('getQueueSize'),
  });
  return new Promise(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
        return resolve(value.returnData[0].asString);
      })
      .catch(e => console.error('getQueueSize error', e));
  });
};

export const getQueueIndex = (blsKey: any, dapp: DappState) => {
  const query = new Query({
    address: new Address(stakingContract),
    func: new ContractFunction('getQueueIndex'),
    caller: new Address(auctionContract),
    args: [Argument.fromHex(blsKey)],
  });
  return new Promise(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
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

const mapNodes = (responseValues: ContractReturnData[], nodes: NodeType[], queued: any[]) => {
  let status: { [key: string]: string };
  responseValues.forEach(value => {
    if (isStatus(value.asString)) {
      status = { key: value.asString, value: NodeStatus[value.asString] };
    } else {
      if (status.key === 'queued') {
        queued.push(value.asHex);
      }
      nodes.push(new NodeType(value.asHex, status));
    }
  });
};
