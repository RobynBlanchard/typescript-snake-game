// class Food {
//   // private
//   randomNumber(snakeLength, canvasLength) {
//     return Math.round(Math.floor(Math.random() * (canvasLength - 1)) / snakeLength) * snakeLength;
//   }

//   getRandomCoord(snakeLength, canvasLength, snakeWidth) {
//     var randomNum = Math.round(Math.floor(Math.random() * (300 - 1)) / 10) * 10;
//     for (var i = 0; i < snake.length; i++) {
//       // hit snake
//       if (randomNum === snake[i][axis] * snakeWidth) {
//         return getRandomCoord(axis);
//       }
//     }
//     return randomNum;
//   }

//   getNewPosition(snakeLength, canvasLength, snakeWidth) {
//     return {
//       x: getRandomCoord('x'),
//       y: getRandomCoord('y')
//     };
//   }
// }

// export Food;
