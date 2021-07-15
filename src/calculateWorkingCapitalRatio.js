import getLiabilities from './calculateLiabilities.js'
import getAssets from './calculateAssets.js'

/**
 * Returns calculated working capital ratio
 *
 * @param {Array} dataItems  passed items.
 * @return {number}  wotking capital ratio
 */
const getworkingCapitalRatio = (dataItems) => {
    const totalAssets = getAssets(dataItems);
    const totalLiabilities = getLiabilities(dataItems);
    return (totalAssets / totalLiabilities);
}

export default getworkingCapitalRatio;