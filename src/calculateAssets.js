import accumulatorOfTotalValue from './helper.js'


const checkIsAsset = (item)=>{
    return (item.account_category === 'assets' && ['current', 'bank', 'current_accounts_receivable']
    .includes(item.account_type));
}

/**
 * Returns calculated total assets
 *
 * @param {Array} dataItems  passed items.
 * @return {number}  total assets
 */
const getAssets = (dataItems) => {
    const totalAssetDebits = dataItems
        .filter(item => checkIsAsset(item) && item.value_type === 'debit')
        .reduce(accumulatorOfTotalValue, 0);
        console.log('totalAssetDebits',totalAssetDebits)
    const totalAssetCredits = dataItems
        .filter(item => checkIsAsset(item)  && item.value_type === 'credit')
        .reduce(accumulatorOfTotalValue, 0);
        console.log('totalAssetCredits',totalAssetCredits)
    return totalAssetDebits - totalAssetCredits;
    

}

export default getAssets;