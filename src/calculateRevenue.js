import accumulatorOfTotalValue from './helper.js'

/**
 * Returns calculated total revenue.
 *
 * @param {Array} dataItems passing the given data Array.
 * @return {number} total revenue.
 */
const getRevenue =(dataItems)=> {
    return dataItems
      .filter(item => item.account_category === 'revenue')
      . reduce(accumulatorOfTotalValue, 0);
}
export default getRevenue;