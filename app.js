const {
    readDataFromFile, calcAccountRevenue, calcAccountExpenses, calcGrossProfitMargin,
    calcNetProfitMargin, calcWorkingCapitalRatio, formatCurrency
} = require('./helpers/helpers');

async function calcResult() {
    // STEP:1 Read the data.
    let data;
    try {
        data = await readDataFromFile("seed/data.json");
    } catch (err) {
        console.log(`Invalid filename or inappropriate file content: Error:${err}`);
        return;
    }

    // STEP: 2 Calc account revenue
    let accountRevenue;
    try {
        accountRevenue = await calcAccountRevenue(data);
    } catch (err) {
        console.log(`Error on calculating account revenue:${err}`);
        return;
    }

    // STEP: 3 Calc account Expenses
    let accountExpenses;
    try {
        accountExpenses = await calcAccountExpenses(data);
    } catch (err) {
        console.log(`Error on calculating account Expenses:${err}`);
        return;
    }

    // STEP: 3 Calc Gross Profit Margin
    let grossProfitMargin;
    try {
        grossProfitMargin = await calcGrossProfitMargin(data, accountRevenue);
    } catch (err) {
        console.log(`Error on calculating Gross Profit Margin:${err}`);
        return;
    }

    // STEP: 4 Calc Net Profit Margin
    const netProfitMargin = calcNetProfitMargin(accountExpenses, accountRevenue);

    // Step: 5 Calc Working Capital Ratio
    let workingCapitalRatio;
    try {
        workingCapitalRatio = await calcWorkingCapitalRatio(data);
    } catch (err) {
        console.log(`Error on calculating Gross Profit Margin:${err}`);
        return;
    }

    console.log(`Revenue: $${formatCurrency(accountRevenue)}`);
    console.log(`Expenses: $${formatCurrency(accountExpenses)}`);
    console.log(`Gross Profit Margin: ${Math.round(grossProfitMargin)}%`);
    console.log(`Net Profit Margin: ${Math.round(netProfitMargin)}%`);
    console.log(`Working Capital Ratio: ${Math.round(workingCapitalRatio)}%`);
}

calcResult();