const { MerkleTree } = require('merkletreejs')
const keccak256 = require('keccak256')
const eth= require('ethers');

const leaves = [
    ["0x15412D1f9C63e9123Fa62a3E385a130f5C959De5",100],
    ["0xC6Ab7b0e042F735e59140a59A23900021e3A3dAC",2],
    ["0x4B20993Bc481177ec7E8f571ceCaE8A9e22C02db",3],
    ["0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cb2",4],
    ["0x3586C9B2f5EcEadD75397b8D2dABb106595D26db",5]
  ].map(x => keccak256(x))

const tree = new MerkleTree(leaves, keccak256, { sort: true })
const root = tree.getHexRoot()
console.log("Root:");
console.log(root)

const leaf = keccak256(["0x15412D1f9C63e9123Fa62a3E385a130f5C959De5",100])
console.log("Leaf:");
console.log(leaf.toString('hex'))

console.log("Hash:");
console.log(eth.utils.solidityKeccak256(["address", "int"], ["0x15412D1f9C63e9123Fa62a3E385a130f5C959De5", 100]));

const proof = tree.getProof(leaf)
const hexproof = tree.getHexProof(leaf)
console.log("Proof:");
console.log(hexproof)

console.log(tree.verify(proof, leaf, root)) // true


