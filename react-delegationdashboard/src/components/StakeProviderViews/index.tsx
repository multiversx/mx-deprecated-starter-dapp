import { Address, ContractFunction } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { decimals, denomination } from '../../config';
import { useContext } from '../../context';
import { addresses } from '../../contracts';
import denominate from '../Denominate/formatters';
import StatCard from '../StatCard';
interface StakeProviderType {
    serviceFee: string;
    maxDelegationCap: string;
}

const StakeProviderViews = ({serviceFee="0", maxDelegationCap="0"}: StakeProviderType) => {
    const { dapp, erdLabel } = useContext();

    const [totalActiveStake, setTotalActiveStake] = React.useState("0");
    const [noNodes, setNoNodes] = React.useState("0");
    React.useEffect(() => {
        getNumberOfNodes();
        getTotalStake();
    }, 
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [])

    const getNumberOfNodes = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getNumNodes')
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getNumNodes ", value)
                setNoNodes(value.returnData[0].asNumber.toString() || "0")
            })
            .catch(e => {
                console.log("error ", e)
            })
    }

    const getTotalStake = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getTotalActiveStake')
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getTotalActiveStake ", value)
                let input = value.returnData[0].asBigInt.toString()
                setTotalActiveStake(denominate({input, denomination, decimals, showLastNonZeroDecimal: true}).toString() || "0")
            })
            .catch(e => {
                console.log("error ", e)
            })
    }
    return (
        <div className="stats full-width">
            <div className="mb-spacer">
                <div className="card card-small">
                    {"Network overview" && (
                        <div className="card-header border-bottom">
                            <h6 className="m-0">Network overview</h6>
                        </div>
                    )}<div className="card-body d-flex flex-wrap p-3">
                        <StatCard title="Number of nodes" value={noNodes} valueUnit="nodes"></StatCard>
                        <StatCard title="Total Stake" value={totalActiveStake} valueUnit={erdLabel}></StatCard>
                        <StatCard title="Service Fee" value={serviceFee} valueUnit="%"></StatCard>
                        <StatCard title="Max delegation cap" value={maxDelegationCap} valueUnit=""></StatCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StakeProviderViews;
