import { Address, ContractFunction, Argument } from '@elrondnetwork/erdjs/out';
import { Query } from '@elrondnetwork/erdjs/out/smartcontracts/query';
import * as React from 'react';
import { useContext } from '../../context';
import { addresses } from '../../contracts';
import StatCard from '../StatCard';

interface StatCardType {
    title: string;
}

const DelegatorViews = ({ title = "" }: StatCardType) => {
    const { dapp, address, erdLabel } = useContext();

    const [totalRewards, setTotalRewards] = React.useState("0");
    const [claimableRewards, setClaimableRewards] = React.useState("0");
    React.useEffect(() => {
        getClaimableRewards();
        getTotalCumulatedRewards();
    }, [])
    const getClaimableRewards = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getClaimableRewards'),
            args: [Argument.fromPubkey(new Address(address))]
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                setClaimableRewards(value.returnData[0].asString || "0")
            })
            .catch(e => console.log("error getClaimableRewards", e))
    }

    const getTotalCumulatedRewards = () => {
        const query = new Query({
            address: new Address(addresses["delegation_smart_contract"]),
            func: new ContractFunction('getTotalCumulatedRewards'),
            caller: new Address(address)
        })
        dapp.proxy.queryContract(query)
            .then((value) => {
                console.log("getTotalCumulatedRewards, ", value)
                setTotalRewards(value.returnData[0].asString || "")
            })
            .catch(e => {
                console.log("error getTotalCumulatedRewards", e)
            })
    }
    return (
        <div className="row stats full-width">
            <div className="col-12 mb-spacer">
                <div className="card card-small">
                    {title && (
                        <div className="card-header border-bottom">
                            <h6 className="m-0">{title}</h6>
                        </div>
                    )}<div className="card-body d-flex flex-wrap p-3">
                        <StatCard title="Claimable rewards" value={claimableRewards} valueUnit={erdLabel}></StatCard>
                        <StatCard title="Total rewards" value={totalRewards} valueUnit={erdLabel}></StatCard>
                        <StatCard title="Future rewards" value={totalRewards} valueUnit={erdLabel}></StatCard>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DelegatorViews;
