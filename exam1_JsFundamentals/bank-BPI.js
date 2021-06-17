const bank = require('./bank.js');

class BPI extends bank {
    constructor(loanAmount) {
        super(loanAmount, 0.012);
    }

    getBankName(){
        console.log(this.constructor.name);
    }
}

module.exports = BPI;