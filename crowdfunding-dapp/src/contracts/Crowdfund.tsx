import {SmartContract, Address, ProxyProvider, ContractFunction} from "@elrondnetwork/erdjs";
import BigNumber from "bignumber.js";

export default class Crowdfund {
  contract: SmartContract;
  proxyProvider: ProxyProvider;

  constructor(contractAddress = '', provider: ProxyProvider) {
    const address = new Address(contractAddress);
    this.contract = new SmartContract({address});
    this.proxyProvider = provider;
  }

  async currentFunds(): Promise<BigNumber> {
    const func = new ContractFunction("currentFunds");
    const qResponse = await this.contract.runQuery(this.proxyProvider, {func});
    qResponse.assertSuccess();

    return new BigNumber(qResponse.firstResult().asBigInt.toString());
  }
}