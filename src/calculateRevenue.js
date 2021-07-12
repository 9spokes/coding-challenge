import accumulatorOfTotalValue from './helper.js'

const getRevenue =(dataRecords)=> {
    return dataRecords
      .filter(record => record.account_category === 'revenue')
      . reduce(accumulatorOfTotalValue, 0);
}
export default getRevenue;