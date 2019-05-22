/*
 * @lc app=leetcode id=122 lang=javascript
 *
 * [122] Best Time to Buy and Sell Stock II
 */
/**
 * @version 1 99.24%
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function(prices) {
  if (!prices || prices.length <= 0) return 0
  const waveList = [0]
  for (let i = 1; i < prices.length; i++) {
    waveList.push(prices[i] - prices[i - 1])
  }

  return waveList.reduce((acc, item) => {
    if (item > 0) acc += item
    return acc
  }, 0)
};

