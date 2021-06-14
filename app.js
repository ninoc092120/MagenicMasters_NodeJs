const yargs = require("yargs");
const LoanCalculator = require("./loan-calculator");
const argv = yargs.argv;

const bankName = argv['bankName'];
const loanAmount = argv['loanAmount'];
const loanTerm = argv['loanTerm'];

const loanCalculator = new LoanCalculator(bankName, loanAmount, loanTerm);
console.log(`Monthly Installment: ${loanCalculator.getMonthlyInstallment()}`);