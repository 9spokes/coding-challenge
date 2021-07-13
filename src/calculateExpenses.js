import accumulatorOfTotalValue from './helper.js'

/**
 * Returns calculated total Expenses amount.
 *
 * @param {Array} dataItems passing the given data Array.
 * @return {number} total expenses.
 */
const getExpenses =(dataItems)=> {
    return dataItems
      .filter(item => item.account_category === 'expense')
      . reduce(accumulatorOfTotalValue, 0);
}
export default getExpenses;