const fs = require('fs');

module.exports.readDataFromFile = (FILE_PATH) => {
    return new Promise((resolve, reject) => {
        try {
            const rawdata = fs.readFileSync(FILE_PATH);
            const data = JSON.parse(rawdata);
            resolve(data);
        } catch (err) {
            reject(err);
        }
    })
};


/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to revenue
 * 
 * @param {*} data Obj
 * @returns totalRevenue Int
 */
module.exports.calcAccountRevenue = (data) => {
    return new Promise((resolve, reject) => {
        if (data === undefined || data.data === undefined || data.data.length < 0) return reject("Insufficient/Incorrect data.")

        let totalRevenue = 0;
        for (let i = 0; i < data.data.length; i += 1)
            if (data.data[i].account_category.toLowerCase() === `revenue`)
                totalRevenue += data.data[i].total_value;

        return resolve(totalRevenue);
    });
};


/**
 * This should be calculated by adding up all the values under total_value where the account_category field is set to expense
 * @param {*} data Obj
 * @returns expenses Int
 */
module.exports.calcAccountExpenses = (data) => {
    return new Promise((resolve, reject) => {
        if (data === undefined || data.data === undefined || data.data.length < 0) return reject("Insufficient/Incorrect data.")

        let expenses = 0;
        for (let i = 0; i < data.data.length; i += 1)
            if (data.data[i].account_category.toLowerCase() === `expense`)
                expenses += data.data[i].total_value;

        return resolve(expenses);
    });
};


/**
 * This is calculated in two steps: 
 * first by adding all the total_value fields where the account_type is set to sales and the value_type is set to debit; 
 * then dividing that by the revenue value calculated earlier to generate a percentage value.
 * 
 * @param {*} data Obj
 * @param {*} revenue Int
 * @returns grossProfitMargin Int
 */
module.exports.calcGrossProfitMargin = (data, revenue) => {
    return new Promise((resolve, reject) => {
        if (data === undefined || data.data === undefined || data.data.length < 0) return reject("Insufficient/Incorrect data.")

        let grossProfitToCalc = 0;
        for (let i = 0; i < data.data.length; i += 1)
            if (data.data[i].account_category.toLowerCase() === `sales` && data.data[i].value_type.toLowerCase() === `debit`)
                grossProfitToCalc += data.data[i].total_value;

        return resolve(grossProfitToCalc / revenue);
    });
};


/**
 * This metric is calculated by subtracting the expenses value from the revenue value and 
 * dividing the remainder by revenue to calculate a percentage.
 * 
 * @param {*} expenses Int
 * @param {*} revenue Int
 * @returns 
 */
module.exports.calcNetProfitMargin = (expenses, revenue) => {
    return ((expenses - revenue) / revenue);
};


/**
 * This is calculated dividing the assets by the liabilities creating a percentage value
 * 
 * @param {*} data Obj
 * @returns workingCapitalRatio Int
 */
module.exports.calcWorkingCapitalRatio = (data) => {
    return new Promise((resolve, reject) => {
        if (data === undefined || data.data === undefined || data.data.length < 0) return reject("Insufficient/Incorrect data.")
        const assets = calcAssets(data);
        const liabilities = calcLiabilities(data);

        return resolve(assets / liabilities);
    });
};


/**
 * adding the total_value from all records where the account_category is set to assets, the value_type is set to debit,
 *  and the account_type is one of current, bank, or current_accounts_receivable
 * 
 * subtracting the total_value from all records where the account_category is set to assets, the value_type is set to credit, 
 * and the account_type is one of current, bank, or current_accounts_receivable
 * 
 * @param {*} data Obj
 * @returns  assets Int
 */
function calcAssets(data) {
    let assets = 0;
    for (let i = 0; i < data.data.length; i += 1)
        if (
            data.data[i].account_category.toLowerCase() === `assets` &&
            data.data[i].value_type.toLowerCase() === `debit` &&
            data.data[i].account_type.toLowerCase() === `current` ||
            data.data[i].account_type.toLowerCase() === `bank` ||
            data.data[i].account_type.toLowerCase() === `current_accounts_receivable`
        )
            assets += data.data[i].total_value;

    let assetsToDeduct = 0;
    for (let i = 0; i < data.data.length; i += 1)
        if (
            data.data[i].account_category.toLowerCase() === `assets` &&
            data.data[i].value_type.toLowerCase() === `credit` &&
            data.data[i].account_type.toLowerCase() === `current` ||
            data.data[i].account_type.toLowerCase() === `bank` ||
            data.data[i].account_type.toLowerCase() === `current_accounts_receivable`
        ) {
            assetsToDeduct += data.data[i].total_value
        }

    return assets - assetsToDeduct;
};


/**
 * adding the total_value from all records where the account_category is set to liability, the value_type is set to credit,
 * and the account_type is one of current or current_accounts_payable
 * 
 * subtracting the total_value from all records where the account_category is set to liability, the value_type is set to debit, 
 * and the account_type is one current or current_accounts_payable
 * 
 * @param {*} data Obj
 * @returns liabilities Int
 */
function calcLiabilities(data) {
    let liabilities = 0;
    for (let i = 0; i < data.data.length; i += 1)
        if (
            data.data[i].account_category.toLowerCase() === `liability` &&
            data.data[i].value_type.toLowerCase() === `credit` &&
            data.data[i].account_type.toLowerCase() === `current` ||
            data.data[i].account_type.toLowerCase() === `current_accounts_payable`
        )
            liabilities += data.data[i].total_value;

    let liabilitiesToDeduct = 0
    for (let i = 0; i < data.data.length; i += 1)
        if (
            data.data[i].account_category.toLowerCase() === `liability` &&
            data.data[i].value_type.toLowerCase() === `debit` &&
            data.data[i].account_type.toLowerCase() === `current` ||
            data.data[i].account_type.toLowerCase() === `current_accounts_payable`
        )
            liabilitiesToDeduct += data.data[i].total_value

    return liabilities - liabilitiesToDeduct;
};

module.exports.formatCurrency = (x) => {
    const parts = x.toString().split(".");
    return parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

}