const CONFIG = {
  nodeUrl: 'https://api.elrond.com',
  elasticUrl: 'https://elastic-aws.elrond.com',
  contractAddress: 'erd1cevsw7mq5uvqymjqzwqvpqtdrhckehwfz99n7praty3y7q2j7yps842mqh',
  decimals: 2,
  denomination: 18,
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
