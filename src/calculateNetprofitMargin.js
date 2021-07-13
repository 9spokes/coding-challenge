import getRevenue from './calculateRevenue.js';
import getExpenses from './calculateExpenses.js';

/**
 * Returns calculated Net Profit Margin.
 *
 * @param {number} getRevenue caculated total revenue.
 * @param {number} getExpenses caculated total expense.
 * @return {number}  net profit margin.
 */
const getNetProfitMargin =(getRevenue,getExpenses)=> {
    return (getRevenue - getExpenses) / getRevenue;
}
export default getNetProfitMargin;