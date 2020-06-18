import React from 'react';
import { useContext } from 'context';

interface ShardSpanType {
  shardId: number | string;
}

const ShardSpan = ({ shardId }: ShardSpanType) => {
  const { metaChainShardId } = useContext();

  if (typeof shardId === 'string' && shardId.includes('Shard')) {
    shardId = shardId.replace('Shard', '');
  }

  const isMetachain = metaChainShardId.toString() === shardId.toString();

  return isMetachain ? <span>Metachain</span> : <span>Shard {shardId}</span>;
};

export default ShardSpan;
