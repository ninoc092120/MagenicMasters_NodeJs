const bank = require('./bank.js');

class Metrobank extends bank {
    constructor(loanAmount) {
        super(loanAmount, 0.015);
    }

    getBankName(){
        console.log(this.constructor.name);
    }
}

module.exports = Metrobank;