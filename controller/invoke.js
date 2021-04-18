exports.getDetails =(req, res, next) => {
const transferAmount = req.params.value;
const Web3 = require('web3');
const Tx = require('ethereumjs-tx').Transaction;
let nodeurl = "https://ropsten.infura.io/v3/53126161880947688ea043e552d0d240";
let provider = new Web3.providers.HttpProvider(nodeurl);
let web3 = new Web3(provider);
const fromAddress = "0xE963febF426FEbf98eac8Bc7d8452EE9CEc96C57"
const toAddress = "0x9e62e2D7E0c5FbdD0f49e6535fc0129962321EF2"
var contractAddress = "0x9dCE2018C1351112391Bb81E7477eB68B9f236b1"
const private_key = Buffer.from(
    '9dcb804be20233389f7557a164f87b803b27470e2fbd2d033765907311244e72',
    'hex',
  )
// const private_key = "9dcb804be20233389f7557a164f87b803b27470e2fbd2d033765907311244e72";
// var transferAmount = 1;
const  zebPayContract = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_initialSupply",
				"type": "uint256"
			}
		],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "_from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "standard",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "_to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "_value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "success",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	}
];
const invoke = async () => {
	try{
const contract = new web3.eth.Contract(zebPayContract, contractAddress, {from: fromAddress})
const txCount = await web3.eth.getTransactionCount(fromAddress)
const newNonce = web3.utils.toHex(txCount)
console.log(newNonce)

var rawTx = {
    from:fromAddress,
    nonce: newNonce,
    gasPrice: web3.utils.toHex(3 * 1e9),
    gasLimit: web3.utils.toHex(3000000),
    to: contractAddress,
    value: '0x00',
    data: contract.methods.transfer(toAddress,transferAmount).encodeABI(),
  }
  var tx = new Tx(rawTx,{chain:'ropsten'});
  tx.sign(private_key);
  var serializedTx = tx.serialize();
  const receipt = await web3.eth.sendSignedTransaction('0x' + serializedTx.toString('hex'))
  console.log(JSON.stringify(receipt, null, '\t'));
  return res.send(receipt);
} catch (error) {
	console.error(`Failed to get details: ${error}`);
	return (`Failed to get details: ${error}`)
	}
}
invoke()
}

