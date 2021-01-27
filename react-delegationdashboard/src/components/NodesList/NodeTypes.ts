import { DappState } from "../../context/state";
import { Delegation } from "../../contracts";

export const nodeActions = {
    unJail: { label: 'Unjail', transaction: 'unJail' },
    unStake: {
        label: 'Unstake',
        transaction: 'unStake',
    },
    reStake: {
        label: 'ReStake',
        transaction: 'reSreStakeUnStakedNodestake',
    },
    unBond: { label: 'Unbond', transaction: 'unBond' }
};

export const inactiveNodeActions = {
    stake: { label: 'Stake', transaction: 'stake' },
};

export const nodeTransactions = {
    unStake: (blsKey: string, dapp: DappState) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "unStakeNodes", blsKey).then();
    },
    reStake: (blsKey: string, dapp: DappState) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "reStakeunStakeNodes", blsKey).then();
    },
    unJail: (blsKey: string, dapp: DappState) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "unJailNodes", blsKey).then();
    },
    unBond: (blsKey: string, dapp: DappState) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "unBondNodes", blsKey).then();
    },
    stake: (blsKey: string, dapp: DappState) => {
        const delegationContract = new Delegation(dapp.proxy, dapp.provider);
        delegationContract.sendTransaction("0", "stakeNodes", `${blsKey}`).then();
    },
};