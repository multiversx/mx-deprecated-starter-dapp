import { Address, AddressValue, BytesValue, ContractFunction, Query } from '@elrondnetwork/erdjs';
import { decodeString } from '@elrondnetwork/erdjs/out/smartcontracts/codec/binaryCodecUtils';
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
        mapNodes(value.outputUntyped(), nodes, []);
        return resolve(nodes);
      })
      .catch(e => console.error('GetAllNodesStatus error ', e));
  });
};

export const getBlsKeysStatus = (dapp: DappState, queued: any[], delegationContract?: string) => {
  const query = new Query({
    address: new Address(auctionContract),
    func: new ContractFunction('getBlsKeysStatus'),
    args: [new AddressValue(new Address(delegationContract))],
  });
  return new Promise<Array<NodeType>>(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
        let nodes = new Array<NodeType>();
        let responseValues = value.outputUntyped();
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
        return resolve(value.outputTyped()[0].valueOf());
      })
      .catch(e => console.error('getQueueSize error', e));
  });
};

export const getQueueIndex = (blsKey: any, dapp: DappState) => {
  const query = new Query({
    address: new Address(stakingContract),
    func: new ContractFunction('getQueueIndex'),
    caller: new Address(auctionContract),
    args: [BytesValue.fromUTF8(blsKey)],
  });
  return new Promise(resolve => {
    dapp.proxy
      .queryContract(query)
      .then(value => {
        return resolve(decodeString(value.outputUntyped()[0]));
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

const mapNodes = (responseValues: Buffer[], nodes: NodeType[], queued: any[]) => {
  let status: { [key: string]: string };
  responseValues.forEach(value => {
    if (isStatus(decodeString(value))) {
      status = { key: decodeString(value), value: NodeStatus[decodeString(value)] };
    } else {
      if (status.key === 'queued') {
        queued.push(value.toString('hex'));
      }
      nodes.push(new NodeType(value.toString('hex'), status));
    }
  });
};
