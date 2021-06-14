const yargs = require("yargs");
const LoanCalculator = require("./loan-calculator");
const argv = yargs.argv;

// console.log(argv);

// console.log(argv['bankName']);
// console.log(argv['loanAmount']);
// console.log(argv['loanTerm']);
const bankName = argv['bankName'];
const loanAmount = argv['loanAmount'];
const loanTerm = argv['loanTerm'];

const loanCalculator = new LoanCalculator(bankName, loanAmount, loanTerm);
console.log(`Monthly Installment: ${loanCalculator.getMonthlyInstallment()}`);