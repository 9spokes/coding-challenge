import accumulatorOfTotalValue from './helper.js'

/**
 * Returns whether item is a liability or not
 *
 * @param {item} item  passed item.
 * @return {Boolean}  liability or not
 */
const checkIsLiability = (item)=>{
    return (item.account_category === 'liability' && ['current', 'current_accounts_payable']
    .includes(item.account_type));
}

/**
 * Returns calculated total liabilities
 *
 * @param {Array} dataItems  passed items.
 * @return {number}  total liabilities
 */
const getLiabilities = (dataItems) => {
    const totalLiabilityDebits = dataItems
        .filter(item => checkIsLiability(item) && item.value_type === 'debit')
        .reduce(accumulatorOfTotalValue, 0);
    const totalLiabilityCredits = dataItems
        .filter(item => checkIsLiability(item)  && item.value_type === 'credit')
        .reduce(accumulatorOfTotalValue, 0);
    return totalLiabilityDebits - totalLiabilityCredits;
}


export default getLiabilities;