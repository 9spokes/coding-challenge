import getRevenue from './calculateRevenue.js';
import getExpenses from './calculateExpenses.js';
import accumulatorOfTotalValue from './helper.js'

/**
 * Returns calculated Gross Profit Margin.
 *
 * @param {Array} dataItems  passed items.
 * @param {number} getRevenue caculated total revenue.
 * @return {number}  gross profit margin.
 */
const getGrossProfitMargin =(dataItems, getRevenue)=> {
  const salesAndDebits = dataItems.filter(
      item => item.account_type === 'sales' && item.value_type === 'debit'
  ).reduce(accumulatorOfTotalValue, 0);

    return salesAndDebits / getRevenue;
}

export default getGrossProfitMargin;

