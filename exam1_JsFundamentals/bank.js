class Bank {
    constructor (loanAmount, interestRate) {
        this.loanAmount = loanAmount;
        this.interestRate = interestRate;
    }

    getMonthlyInstallment (loanTerm) {
        return ((this.loanAmount*this.interestRate) + this.loanAmount/loanTerm);
    }
}

module.exports = Bank;