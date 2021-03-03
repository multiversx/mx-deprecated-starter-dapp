export const nodeActions = {
  unJail: { label: 'Unjail', transaction: 'unJail' },
  unStake: { label: 'Unstake', transaction: 'unStake' },
  reStake: { label: 'ReStake', transaction: 'reSreStakeUnStakedNodestake' },
  unBond: { label: 'Unbond', transaction: 'unBond' },
  stake: { label: 'Stake', transaction: 'stake' },
  remove: { label: 'Remove', transaction: 'remove' },
};

export const NodeStatus: { [key: string]: string } = {
  notStaked: 'Inactive',
  unStaked: 'UnStaked',
  staked: 'Staked',
  jailed: 'Jail',
  queued: 'Queued',
};
