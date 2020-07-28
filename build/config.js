const CONFIG = {
  nodeUrl: 'https://api.elrond.com',
  elasticUrl: 'https://elastic-aws.elrond.com',
  contractAddress: 'erd1x2mj2v7qwgx066gjfujzylkunfzpyq2vgutrv4rduwrrjehhnzdspaz7py',
};

window.CONFIG = CONFIG;

if (typeof module !== 'undefined' && typeof module.exports !== 'undefined') {
  module.exports = CONFIG;
}
