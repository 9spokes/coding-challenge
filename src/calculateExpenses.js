import accumulatorOfTotalValue from './helper.js'

const getExpenses =(dataItems)=> {
    return dataItems
      .filter(item => item.account_category === 'expense')
      . reduce(accumulatorOfTotalValue, 0);
}
export default getExpenses;