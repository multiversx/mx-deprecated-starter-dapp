import { useContext } from 'context';
import { Delegation } from 'contracts';

export default function useDelegation() {
  const { dapp, delegationContract, account } = useContext();
  const delegation = new Delegation(dapp.proxy, delegationContract, dapp.provider, account);
  return { delegation };
}
