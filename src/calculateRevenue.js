import accumulatorOfTotalValue from './helper.js'

const getRevenue =(dataItems)=> {
    return dataItems
      .filter(item => item.account_category === 'revenue')
      . reduce(accumulatorOfTotalValue, 0);
}
export default getRevenue;