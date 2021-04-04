import React, { useEffect, useState } from 'react';
import { useContext, useDispatch } from 'context';
import fetchGraphQL from '../../../fetchGraphQL';
import { graphql } from 'babel-plugin-relay/macro';
import {
    Transaction,
    GasLimit,
    GasPrice,
    Address,
    TransactionPayload,
} from '@elrondnetwork/erdjs';
import {
    Grid,
    Button,
    Input,
    Box
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { request, gql, GraphQLClient } from 'graphql-request';


const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
}));

interface IPair {
    token_a: string,
    token_b: string,
    address: string
}


const RemoveLiquidityAction = () => {
    const classes = useStyles();
    const { account, dapp, loading } = useContext();
    const [tokenA, setTokenA] = useState('');
    const [tokenB, setTokenB] = useState('');
    const [lpToken, setLpToken] = useState('');
    const [liquidity, setLiquidity] = useState(0);

    const client = new GraphQLClient('http://localhost:3005/graphql', {
        headers: {
            'Content-Type': 'application/json',
        },
    });

    const handleRemoveLiquidity = () => {
        console.log('Send Transaction');
        // const txArguments = new DelegationTransactionType(value, 'delegate');
        // sendTransactionWallet(txArguments);
        const pairsQuery = gql`
        {
            pairs {
                token_a
                token_b
                address
                info {
                    reserves_a
                    reserves_b
                    total_supply
                }
                price {
                    tokena_price
                    tokenb_price
                }
            }
        }
        `;

        const removeLiquidityQuery = gql`
        query($address: String!, $lpToken: String!, $liquidity: Int!, $amount0Min: Int!, $amount1Min: Int!) {
                
            removeLiquidity(
                address: $address,
                tokenID: $lpToken,
                liquidity: $liquidity,
                amount0Min: $amount0Min,
                amount1Min: $amount1Min
            ) {
                nonce
                value
                receiver
                gasPrice
                gasLimit
                data
                chainID
                version
            }
        }
        `;

        client.request(pairsQuery)
            .then(response => {
                const data = response;
                console.log(data.pairs);
                let pair = data.pairs.find((value: { token_a: string; token_b: string; address: string; }) => value.token_a == tokenA && value.token_b == tokenB);
                console.log(pair.address);
                const variables = {
                    address: pair.address,
                    lpToken: lpToken,
                    liquidity: liquidity,
                    amount0Min: Math.floor(liquidity * pair.info.reserves_a / pair.info.total_supply),
                    amount1Min: Math.floor(liquidity * pair.info.reserves_b / pair.info.total_supply),
                };
                client.request(removeLiquidityQuery, variables)
                    .then(response => {
                        const rawTransaction = response.removeLiquidity;
                        console.log(rawTransaction);
                        rawTransaction.nonce = account?.nonce;
                        let transaction = new Transaction({
                            ...rawTransaction,
                            data: TransactionPayload.fromEncoded(rawTransaction.data),
                            receiver: new Address(rawTransaction.receiver),
                            gasLimit: new GasLimit(rawTransaction.gasLimit),
                            gasPrice: new GasPrice(rawTransaction.gasPrice),
                        });
                        console.log(transaction);

                        dapp.provider.sendTransaction(transaction);
                    }).catch(error => {
                        console.error(error);
                    });

            }).catch(error => {
                console.error(error);
            });
    };

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Box>
                    <h3>REMOVE LIQUIDITY</h3>
                </Box>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Input placeholder="Token A" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenA(ev.target.value)} />
                </Grid>
                <Grid item md={4}>
                    <Input placeholder="Token B" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setTokenB(ev.target.value)} />
                </Grid>
                <Grid item md={4}>
                    <Button onClick={handleRemoveLiquidity}>
                        Remove Liquidity
                    </Button>
                </Grid>
            </Grid>
            <Grid container spacing={2}>
                <Grid item md={4}>
                    <Input placeholder="Liquidity Token" type='text' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLpToken(ev.target.value)} />
                </Grid>
                <Grid item md={4}>
                    <Input placeholder="Liquidity" type='number' onChange={(ev: React.ChangeEvent<HTMLInputElement>): void => setLiquidity(parseInt(ev.target.value))} />
                </Grid>
                <Grid item md={4}>
                </Grid>
            </Grid>
        </div>
    );
};

export default RemoveLiquidityAction;
