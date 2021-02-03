export const nodeActions = {
    unJail: { label: 'Unjail', transaction: 'unJail' },
    unStake: { label: 'Unstake', transaction: 'unStake' },
    reStake: { label: 'ReStake', transaction: 'reSreStakeUnStakedNodestake' },
    unBond: { label: 'Unbond', transaction: 'unBond' }
};

export const inactiveNodeActions = {
    stake: { label: 'Stake', transaction: 'stake' },
};

export const NodeStatus: { [key: string]: string } = {
    'notStaked': 'Inactive',
    'unStaked': 'UnStaked',
    'staked': 'Staked',
    'jailed': 'Jail',
    'queued': 'Queued'
};