import {
  ProxyProvider, ContractFunction,
  Transaction, TransactionPayload, Balance, GasLimit, IDappProvider,
  WalletProvider, HWProvider, Address, SmartContract
} from "@elrondnetwork/erdjs";
import { setItem } from '../storage/session';
import { delegationContractData } from "../config";
import addresses from "./addresses";
import { Query, QueryResponse } from "@elrondnetwork/erdjs/out/smartcontracts/query";

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


  async sendTransaction(value: string, transcationType: string, args: string = ""): Promise<boolean> {
    if (!this.signerProvider) {
      throw new Error("You need a singer to send a transaction, use either WalletProvider or LedgerProvider");
    }

    switch (this.signerProvider.constructor) {
      case WalletProvider:
        // Can use something like this to handle callback redirect
        setItem("transaction_identifier", true, 120);
        return this.sendTransactionBasedOnType(value, transcationType, args);
      case HWProvider:
        return this.sendTransactionBasedOnType(value, transcationType, args);
      default:
        console.warn("invalid signerProvider");
    }

    return true;
  }

  private async sendTransactionBasedOnType(value: string, transcationType: string, args: string = ""): Promise<boolean> {
    let delegationContract = delegationContractData.find(d => d.name === transcationType)
    if (!delegationContract) {
      throw new Error("The contract for this action in not defined");
    }
    else {
      let funcName = delegationContract.data
      if (args!==""){
        funcName = `${delegationContract.data}${args}`
      }
      const func = new ContractFunction(funcName);
      let payload = TransactionPayload.contractCall()
        .setFunction(func)
        .build();
      let transaction = new Transaction({
        receiver: this.contract.getAddress(),
        value:  new Balance(BigInt(value)),
        gasLimit: new GasLimit(delegationContract.gasLimit),
        data: payload
      });

      // @ts-ignore
      await this.signerProvider.sendTransaction(transaction);

      return true;
    }
  }
}
