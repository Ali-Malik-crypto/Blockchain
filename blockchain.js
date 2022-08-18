const sha256 = require('sha256');

function Blockchain(){
    this.chain = [];
    this.pendingTransaction = [];

    this.createNewBlock(18, "TENUPP", "HACKER");
}

Blockchain.prototype.createNewBlock = function(nonce, prevBlockHash, hash){
    const newBlock = {
        index: this.chain.length + 1,
        timestamp: Date.now(),
        transaction: this.pendingTransaction,
        nonce: nonce,
        prevBlockHash: prevBlockHash,
        hash: hash,

    };

    this.pendingTransaction = [];
    this.chain.push(newBlock);

    return newBlock;
}

Blockchain.prototype.getLastBlock = function(){
    return this.chain[this.chain.length - 1];
}

Blockchain.prototype.createNewTransaction = function(amount, senderAddress, recipientAddress){
    const newTransaction = {
        amount: amount,
        senderAddress: senderAddress,
        recipientAddress: recipientAddress,
    };
    this.pendingTransaction.push(newTransaction);
    return this.getLastBlock()['index'] + 1;
}

Blockchain.prototype.BlockHash = function(prevBlockHash, currentBlockData, nonce){
    const dataAsString = prevBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;

}

Blockchain.prototype.ProofOfWork = function(prevBlockHash, currentBlockData){
    let nonce = 0;
    let hash = this.BlockHash(prevBlockHash, currentBlockData, nonce);

    while(hash.substring(0,4) !== '1111'){
        nonce++;
        hash = this.BlockHash(prevBlockHash, currentBlockData, nonce);
        
    }
    return nonce;
}


module.exports = Blockchain; 
