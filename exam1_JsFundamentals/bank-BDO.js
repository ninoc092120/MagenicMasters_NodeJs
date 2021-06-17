const bank = require('./bank.js');

class BDO extends bank {
    constructor(loanAmount) {
        super(loanAmount, 0.017);
    }

    getBankName(){
        console.log(this.constructor.name);
    }
}

module.exports = BDO;