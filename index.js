import getRevenue from './src/calculateRevenue.js'
import fs from 'fs'
import getExpenses from './src/calculateExpenses.js';

const extracted_data = JSON.parse(fs.readFileSync('data.json'));
const calculatedRevenue = getRevenue(extracted_data.data);
const calculatedExpenses = getExpenses(extracted_data.data);

const ausCurrencyFormat = new Intl.NumberFormat('en-AU', {
    maximumFractionDigits: 0,
});

 console.log('Revenue: $%s', ausCurrencyFormat.format(calculatedRevenue));
 console.log('Expenses: $%s', ausCurrencyFormat.format(calculatedExpenses));