const Bank = require("./bank");
const BDO = require("./bank-BDO");
const BPI = require("./bank-BPI");
const Metrobank = require("./bank-metrobank");

class LoanCalculator {
    constructor(bankName, loanAmount, loanTerm) {
        this.bankName = bankName;
        this.loanAmount = loanAmount;
        this.loanTerm = loanTerm;
    }

    getMonthlyInstallment(){
        var bank = new Bank();
        var monthlyInstallment = 0;
        
        if(this.bankName.toUpperCase() === Metrobank.name.toUpperCase()) {
            bank = new Metrobank(this.loanAmount);
            monthlyInstallment = bank.getMonthlyInstallment(this.loanTerm);
        } else if (this.bankName.toUpperCase() === BPI.name.toUpperCase()) {
            bank = new BPI(this.loanAmount);
            monthlyInstallment = bank.getMonthlyInstallment(this.loanTerm);
        } else if (this.bankName.toUpperCase() === BDO.name.toUpperCase()) {
            bank = new BDO(this.loanAmount);
            monthlyInstallment = bank.getMonthlyInstallment(this.loanTerm);
        } else {
            console.log('Bank not included');
        }

        return monthlyInstallment;
    }
}

module.exports = LoanCalculator;