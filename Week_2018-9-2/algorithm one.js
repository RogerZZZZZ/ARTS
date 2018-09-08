// /**
//  * @version 1 70.69%
//  * @param {string} moves
//  * @return {boolean}
//  */
// var judgeCircle = function(moves) {
//   moves = moves.toLowerCase()
//   const commands = moves.split('')
//   let x = y = 0

//   commands.forEach(command => {
//     switch (command) {
//       case 'l':
//         x--
//         break;
//       case 'r':
//         x++
//         break;
//       case 'u':
//         y++
//         break;
//       case 'd':
//         y--
//         break;
//       default:
//         break;
//     }
//   })
//   if (x === 0 && y === 0) return true 
//   return false
// };

/**
 * @version 2 70.69%
 * @param {string} moves
 * @return {boolean}
 */
var judgeCircle = function(moves) {
  moves = moves.toLowerCase()
  const commands = moves.split('')
  let res = []

  commands.forEach(command => {
    const code = command.charCodeAt()
    if (res[code]) {
      res[code]++
    } else {
      res[code] = 1
    }
  })

  if (res['u'.charCodeAt()] === res['d'.charCodeAt()]
      && res['l'.charCodeAt()] === res['r'.charCodeAt()]) return true
  return false
};

console.log(judgeCircle('RRLL'))

