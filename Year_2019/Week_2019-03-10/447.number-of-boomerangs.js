/*
 * @lc app=leetcode id=447 lang=javascript
 *
 * c
 */
/**
 * @param {number[][]} points
 * @return {number}
 */
var numberOfBoomerangs = function(points) {
  var result = 0;
  var length = points.length;
  function getDistance(a, b){
      return (a[0] - b[0])*(a[0] - b[0]) + (a[1] - b[1])*(a[1] - b[1]);
  }
  for(let i = 0; i < length; i++){
      var map = new Map();
      for(let j = 0; j < length; j++){
          if(i === j)continue;
          var dist = getDistance(points[i], points[j]);
          map.set(dist, (map.get(dist) || 0) + 1);
      }
      map.forEach(function(value){
        result += value * (value - 1);
      })
  }
  return result;
};

