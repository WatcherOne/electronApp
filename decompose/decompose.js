/**
 * @param {*} sum     - 总数和
 * @param {*} howMany - 多少个数
 * @return {*} Array  - 返回十以内的数之和(且不重复)
 */
module.exports = (sum, howMany) => {
    if (sum > 45 || howMany > 9) {
        console.log('输入参数不合法')
        return []
    }
    sum = parseInt(sum) || 1
    howMany = parseInt(howMany) || 1
    
    let result = []
    
    function generateCombinations(remainingSum, remainingCount, currentCombination, start) {
        if (remainingCount === 0 && remainingSum === 0) {
            result.push([...currentCombination])
            return
        }

        for (let i = start; i <= 9; i++) {
            if (i <= remainingSum && !currentCombination.includes(i)) {
                currentCombination.push(i)
                generateCombinations(remainingSum - i, remainingCount - 1, currentCombination, i + 1)
                currentCombination.pop()
            }
        }
    }
    
    generateCombinations(sum, howMany, [], 1)
    
    return result
}
