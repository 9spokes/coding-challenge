import getRevenue from './src/calculateRevenue.js'
import fs from 'fs'
import getExpenses from './src/calculateExpenses.js';
import getNetProfitMargin from './src/calculateNetprofitMargin.js';

//extract data from the input data file
const extracted_data = JSON.parse(fs.readFileSync('data.json'));

//calculate and get totalRevenue
const calculatedRevenue = getRevenue(extracted_data.data);
//calculate and get totalExpenses
const calculatedExpenses = getExpenses(extracted_data.data);

//Using austrslain currency becuase of the account_currency is set to "AUD" in thr given data set
const ausCurrencyFormat = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 0,
});


const percentageFormat = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 1,
});

 console.log('Revenue: $%s', ausCurrencyFormat.format(calculatedRevenue));
 console.log('Expenses: $%s', ausCurrencyFormat.format(calculatedExpenses));
 console.log('Net Profit Margin: %s%%', percentageFormat.format(100 * getNetProfitMargin(calculatedRevenue, calculatedExpenses)));
