import { object, string, boolean, array, InferType } from 'yup';

export const decimals: number = 2;
export const denomination: number = 18;

export const networks: NetworkType[] = [
    {
        default: false,
        id: 'mainnet',
        name: 'Mainnet',
        theme: 'light',
        erdLabel: 'EGLD',
        walletAddress: 'https://wallet.elrond.com/',
        explorerAddress: 'https://explorer.elrond.com/',
        delegationContract: 'erd1qqqqqqqqqqqqqpgqxwakt2g7u9atsnr03gqcgmhcv38pt7mkd94q6shuwt',
    },
    {
        default: true,
        id: 'testnet',
        name: 'Testnet',
        theme: 'testnet',
        erdLabel: 'xEGLD',
        walletAddress: 'https://testnet-wallet.elrond.com/',
        explorerAddress: 'https://testnet-explorer.elrond.com/',
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
    explorerAddress: string(),
}).required();


const schema = networkBaseSchema;
export type NetworkType = InferType<typeof schema>;

networks.forEach((network) => {
    schema.validate(network, { strict: true }).catch(({ errors }) => {
        console.error(`Config invalid format for ${network.id}`, errors);
    });
});

export const delegationContractData = {
    createNewDelegationContract: {
        gasLimit: 6000000,
        data: 'createNewDelegationContract@',
    },
    setAutomaticActivation: {
        gasLimit: 6000000,
        data: 'setAutomaticActivation@',
    },
    changeServiceFee: {
        gasLimit: 6000000,
        data: 'changeServiceFee@',
    },
    modifyTotalDelegationCap: {
        gasLimit: 6000000,
        data: 'modifyTotalDelegationCap@',
    },
    addNodes: {
        gasLimit: 12000000,
        data: 'addNodes@',
    },
    removeNodes: {
        gasLimit: 12000000,
        data: 'removeNodes@',
    },
    stakeNodes: {
        gasLimit: 12000000,
        data: 'stakeNodes@',
    },
    reStakeUnStaked: {
        gasLimit: 12000000,
        data: 'reStakeUnStakedNodes@',
    },
    unStake: {
        gasLimit: 12000000,
        data: 'unStakeNodes@',
    },
    unBond: {
        gasLimit: 12000000,
        data: 'unBondNodes@',
    },
    unJail: {
        gasLimit: 12000000,
        data: 'unJailNodes@',
    },
    delegate: {
        gasLimit: 12000000,
        data: 'delegate',
    },
    undelegate: {
        gasLimit: 12000000,
        data: 'undelegate@',
    },
    withdraw: {
        gasLimit: 12000000,
        data: 'withdraw',
    },
    claim: {
        gasLimit: 6000000,
        data: 'claimRewards',
    },
    reDelegateRewards: {
        gasLimit: 12000000,
        data: 'reDelegateRewards',
    },
};