import {
  SmartContract,
  ProxyProvider,
  IDappProvider,
  Address,
  WalletProvider,
  HWProvider,
} from '@elrondnetwork/erdjs/out';
import { setItem } from 'storage/session';

export default class Nft {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;

  constructor(provider: ProxyProvider, contractAddress?: string, signer?: IDappProvider) {
    const address = new Address(contractAddress);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
  }

  async sendTransaction(
    value: string,
    transcationType: string,
    args: string = ''
  ): Promise<boolean> {
    if (!this.signerProvider) {
      throw new Error(
        'You need a singer to send a transaction, use either WalletProvider or LedgerProvider'
      );
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem('transaction_identifier', true, 120);
        return this.sendTransactionBasedOnType(value, transcationType, args);
      case HWProvider:
        return this.sendTransactionBasedOnType(value, transcationType, args);
      default:
        console.warn('invalid signerProvider');
    }

    return true;
  }
  private async sendTransactionBasedOnType(
    value: string,
    transcationType: string,
    args: string = ''
  ): Promise<boolean> {
    return true;
  }
}
