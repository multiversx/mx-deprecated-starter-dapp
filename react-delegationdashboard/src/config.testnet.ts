import { object, string, boolean, InferType } from 'yup';
import { DelegationContractType } from './helpers/types';

export const decimals: number = 2;
export const denomination: number = 18;

export const networks: NetworkType[] = [
    {
        default: false,
        id: 'mainnet',
        name: 'Mainnet',
        theme: 'light',
        erdLabel: 'EGLD',
        walletAddress: 'https://wallet.elrond.com/dapp/init',
        apiAddress: 'https://api.elrond.com',
        delegationContract: 'erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt',
    },
    {
        default: true,
        id: 'testnet',
        name: 'Testnet',
        theme: 'testnet',
        erdLabel: 'xEGLD',
        walletAddress: 'https://testnet-wallet.elrond.com/dapp/init',
        apiAddress: 'https://testnet-api.elrond.com',
        delegationContract: 'erd1qqqqqqqqqqqqqpgqp699jngundfqw07d8jzkepucvpzush6k3wvqyc44rx',
    },
];

const networkBaseSchema = object({
    default: boolean(),
    id: string().defined().required(),
    erdLabel: string().defined().required(),
    name: string().defined().required(),
    theme: string(),
    delegationContract: string(),
    walletAddress: string(),
    apiAddress: string(),
}).required();


const schema = networkBaseSchema;
export type NetworkType = InferType<typeof schema>;


networks.forEach((network) => {
    schema.validate(network, { strict: true }).catch(({ errors }) => {
        console.error(`Config invalid format for ${network.id}`, errors);
    });
});


export const delegationContractData: DelegationContractType[] = [
    {
        name: "createNewDelegationContract",
        gasLimit: 6000000,
        data: 'createNewDelegationContract@',
    },
    {
        name: "setAutomaticActivation",
        gasLimit: 6000000,
        data: 'setAutomaticActivation@',
    },
    {
        name: "changeServiceFee",
        gasLimit: 6000000,
        data: 'changeServiceFee@',
    },
    {
        name: "modifyTotalDelegationCap",
        gasLimit: 6000000,
        data: 'modifyTotalDelegationCap@',
    },
    {
        name: "addNodes",
        gasLimit: 12000000,
        data: 'addNodes@',
    },
    {
        name: "removeNodes",
        gasLimit: 12000000,
        data: 'removeNodes@',
    },
    {
        name: "stakeNodes",
        gasLimit: 12000000,
        data: 'stakeNodes@',
    },
    {
        name: "reStakeUnStaked",
        gasLimit: 12000000,
        data: 'reStakeUnStaked@',
    },
    {
        name: "unStake",
        gasLimit: 12000000,
        data: 'reStakeUnStaked@',
    },
    {
        name: "unBond",
        gasLimit: 12000000,
        data: 'unBond@',
    },
    {
        name: "unJail",
        gasLimit: 12000000,
        data: 'unJail@',
    },
    {
        name: "delegate",
        gasLimit: 12000000,
        data: 'delegate',
    },
    {
        name: "undelegate",
        gasLimit: 12000000,
        data: 'undelegate@',
    },
    {
        name: "withdraw",
        gasLimit: 12000000,
        data: 'withdraw',
    },
    {
        name: "claim",
        gasLimit: 12000000,
        data: 'claim',
    },
    {
        name: "reDelegateRewards",
        gasLimit: 12000000,
        data: 'reDelegateRewards',
    }
]

export const vmQueries = [
    {
        func: "getNumNodes",
    }, {
        func: "getAllNodeStates",
    }, {
        func: "getUserUnBondable",
    }, {
        func: "getUserActiveStake",
    }, {
        func: "getUserUnDelegatedList",
    }, {
        func: "getUserUnStakedValue",
    }, {
        func: "getTotalActiveStake",
    }, {
        func: "getTotalUnStaked",
    }, {
        func: "getNumUsers",
    }, {
        func: "getTotalCumulatedRewards",
    }, {
        func: "getClaimableRewards",
    }, {
        func: "getTotalUnStakedFromNodes",
    }, {
        func: "getTotalUnBondedFromNodes",
    }, {
        func: "getContractConfig",
    }
];