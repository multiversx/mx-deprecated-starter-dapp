import {
  ProxyProvider, ContractFunction,
  Transaction, TransactionPayload, Balance, GasLimit, IDappProvider,
  WalletProvider, HWProvider, Address, SmartContract
} from "@elrondnetwork/erdjs";
import { nominateValToHex } from "../helpers/nominate";
import { setItem } from '../storage/session';
import { delegationContractData } from "../config";
import addresses from "./addresses";

export default class Delegation {
  contract: SmartContract;
  proxyProvider: ProxyProvider;
  signerProvider?: IDappProvider;

  constructor(provider: ProxyProvider, signer?: IDappProvider) {
    const address = new Address(addresses["delegation_smart_contract"]);
    this.contract = new SmartContract({ address });
    this.proxyProvider = provider;
    this.signerProvider = signer;
  }

  async sendDelegate(value: string): Promise<boolean> {
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem("transaction_identifier", true, 120);
        return this.sendDelegateTransaction(value);
      case HWProvider:
        return this.sendDelegateTransaction(value);
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }

  private async sendDelegateTransaction(value: string): Promise<boolean> {
    const func = new ContractFunction(delegationContractData.delegate.data);
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(value)),
      gasLimit: new GasLimit(delegationContractData.delegate.gasLimit),
      data: payload
    });

    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }

  async sendUndelegate(value: string): Promise<boolean> {
    console.log("Send undelegate")
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        return this.sendUndelegateWalletProvider(value);
      case HWProvider:
        return this.sendUndelegateWalletProvider(value);
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }
  private async sendUndelegateWalletProvider(value: string): Promise<boolean> {
    const func = new ContractFunction(`${delegationContractData.undelegate.data}${nominateValToHex(value)}`);
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(0)),
      gasLimit: new GasLimit(delegationContractData.undelegate.gasLimit),
      data: payload
    });

    // Can use something like this to handle callback redirect
    setItem("transaction_identifier", true, 120);
    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }

  async sendWithdraw(): Promise<boolean> {
    console.log("Send withdraw")
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem("transaction_identifier", true, 120);
        return this.sendWithdrawTransaction();
      case HWProvider:
        return this.sendWithdrawTransaction();
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }
  private async sendWithdrawTransaction(): Promise<boolean> {
    const func = new ContractFunction(delegationContractData.withdraw.data);
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(0)),
      gasLimit: new GasLimit(delegationContractData.withdraw.gasLimit),
      data: payload
    });
    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }

  async sendClaimRewards(): Promise<boolean> {
    console.log("Send withdraw")
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem("transaction_identifier", true, 120);
        return this.sendClaimRewardsTransaction();
      case HWProvider:
        return this.sendClaimRewardsTransaction();
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }

  private async sendClaimRewardsTransaction(): Promise<boolean> {
    const func = new ContractFunction(delegationContractData.claim.data);
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(0)),
      gasLimit: new GasLimit(delegationContractData.claim.gasLimit),
      data: payload
    });

    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }

  async sendReDelegateRewards(): Promise<boolean> {
    console.log("Send redelegate rewards")
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem("transaction_identifier", true, 120);
        return this.sendRedelegateRewardsTransaction();
      case HWProvider:
        return this.sendRedelegateRewardsTransaction();
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }
  private async sendRedelegateRewardsTransaction(): Promise<boolean> {
    const func = new ContractFunction(delegationContractData.reDelegateRewards.data);
    let payload = TransactionPayload.contractCall()
      .setFunction(func)
      .build();

    let transaction = new Transaction({
      receiver: this.contract.getAddress(),
      value: new Balance(BigInt(0)),
      gasLimit: new GasLimit(delegationContractData.reDelegateRewards.gasLimit),
      data: payload
    });

    // @ts-ignore
    await this.signerProvider.sendTransaction(transaction);

    return true;
  }
}
