
exports.getDetails =(req, res, next) => {
var HDWalletProvider = require("truffle-hdwallet-provider");
const Web3 = require("web3");
const Tx = require('ethereumjs-tx').Transaction
const mnemonic = "mimic dad grit small sure illness poverty cost hurt monitor lab vacuum";
var provider = new HDWalletProvider(mnemonic, "https://ropsten.infura.io/v3/53126161880947688ea043e552d0d240",address_index=0, num_addresses=3);
const web3 = new Web3(provider);

const privateKey = Buffer.from('9dcb804be20233389f7557a164f87b803b27470e2fbd2d033765907311244e72','hex')

// web3.eth.getAccounts()
// .then(accouts => console.log(accouts));

const useCase1 = async () => {
  try{
    const accounts = await web3.eth.getAccounts();
    console.log(accounts)
    addressFrom=accounts[0]
    addressTo=accounts[1]
    const txData = {
        gasLimit: web3.utils.toHex(25000),
        gasPrice: web3.utils.toHex(10e9), // 10 Gwei
        to: addressTo,
        from: addressFrom,
        value: web3.utils.toHex(web3.utils.toWei('123', 'wei'))
      }
    // console.log(txData)
    const txCount = await web3.eth.getTransactionCount(addressFrom)
    const newNonce = web3.utils.toHex(txCount)
    const transaction = new Tx({ ...txData, nonce: newNonce }, { chain: 'ropsten' }) 
    transaction.sign(privateKey)
    const serializedTx = transaction.serialize().toString('hex')
    const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
    console.log(JSON.stringify(receipt, null, '\t'));
    return res.send(receipt);
} catch (error) {
  console.error(`Failed to get details: ${error}`);
  return (`Failed to get details: ${error}`)
  }
}
useCase1()
provider.engine.stop();
}