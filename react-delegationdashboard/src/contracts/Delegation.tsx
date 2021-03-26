import {
  ProxyProvider,
  ContractFunction,
  Transaction,
  TransactionPayload,
  Balance,
  GasLimit,
  IDappProvider,
  WalletProvider,
  HWProvider,
  Address,
  SmartContract,
} from '@elrondnetwork/erdjs';
import { setItem } from '../storage/session';
import { delegationContractData } from '../config';
import { AccountType, DelegationTransactionType } from 'helpers/contractDataDefinitions';

export default class Delegation {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;
  account?: AccountType;

  constructor(
    provider: ProxyProvider,
    delegationContract?: string,
    signer?: IDappProvider,
    account?: AccountType
  ) {
    const address = new Address(delegationContract);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
    this.account = account;
  }

  async sendTransaction(
    delegationTransactionType: DelegationTransactionType
  ): Promise<Transaction> {
    if (!this.signerProvider) {
      throw new Error(
        'You need a singer to send a transaction, use either WalletProvider or LedgerProvider'
      );
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem('transaction_identifier', true, 120);
        return this.sendTransactionBasedOnType(delegationTransactionType);
      case HWProvider:
        return this.sendTransactionBasedOnType(delegationTransactionType);
      default:
        console.warn('invalid signerProvider');
    }

    return new Transaction();
  }

  private async sendTransactionBasedOnType(
    delegationTransactionType: DelegationTransactionType
  ): Promise<Transaction> {
    let delegationContract = delegationContractData.find(
      d => d.name === delegationTransactionType.type
    );
    if (!delegationContract) {
      throw new Error('The contract for this action in not defined');
    } else {
      let funcName = delegationContract.data;
      if (delegationTransactionType.args !== '') {
        funcName = `${delegationContract.data}${delegationTransactionType.args}`;
      }
      const func = new ContractFunction(funcName);
      let payload = TransactionPayload.contractCall()
        .setFunction(func)
        .build();
      let transaction = new Transaction({
        chainID: delegationTransactionType.chainId,
        receiver: this.contract.getAddress(),
        value: Balance.eGLD(delegationTransactionType.value),
        gasLimit: new GasLimit(delegationContract.gasLimit),
        data: payload,
        nonce: this.account?.nonce,
      });

      // @ts-ignore

      return await this.signerProvider.sendTransaction(transaction);
    }
  }
}
