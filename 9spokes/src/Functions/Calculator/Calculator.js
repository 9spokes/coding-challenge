export function filterByListOfCategories(data, categoryList){// Only returns records that are in the category list
    return data.filter(record => categoryList.includes(record.account_category));
}

export function filterByListOfAccountTypes(data, listOfAccountTypes){//Only return companies of given type/s in list.
    return data.filter(record => listOfAccountTypes.includes(record.account_type));
}

export function filterByListOfValueType(data, listOfValueTypes){
    return data.filter(record => listOfValueTypes.includes(record.value_type))
}

export function sumReduce(data){
    let reducer = (accumulator, record) => record.total_value + accumulator;
    return data.reduce(reducer, 0)
}

export function convertToCurrency(number){
    return number.toLocaleString("en-AU", { 
        style: "currency", 
        currency: "USD"//Task requested USD format rather than AUD format
      })
}

export function convertToPercentage(number){
    let option = {style: 'percent'};
    var formatter = new Intl.NumberFormat("en-US", option);
    return formatter.format(number);
}

export function getRevenue(data){
    return sumReduce(filterByListOfCategories(data, ['revenue']))
}

export function getExpenses(data){
    return sumReduce(filterByListOfCategories(data, ['expense']))
}

export function getGrossProfitMargin(data, revenue) {
    let allSales = filterByListOfAccountTypes(data, ['sales'])
    let debitSales = filterByListOfValueType(allSales, ['debit'])
    let grossProfit = sumReduce(debitSales);
    return grossProfit / revenue;
}

export function getNetProfitMargin(revenue, expenses) {
    return (revenue - expenses) / revenue;
}

export function getJsonReport(data){
    let revenue = getRevenue(data)
    let expenses = getExpenses(data)
    let grossProfitMargin = getGrossProfitMargin(data, revenue)
    let netProfitMargin = getNetProfitMargin(revenue, expenses)
    let workingCapitalRatio = 0
    return {
        "revenue": convertToCurrency(revenue),
        "expenses": convertToCurrency(expenses),
        "grossProfitMargin": convertToPercentage(grossProfitMargin),
        "netProfitMargin": convertToPercentage(netProfitMargin),
        "workingCapitalRatio": convertToPercentage(workingCapitalRatio)
    };
}