// function solution(k, d) {
//   var answer = 0;

//   const isInside = (dot1, doc2, d) => {
//     return Math.sqrt(dot1 * dot1 + doc2 * doc2) <= d ? true : false;
//   };

//   for (let x = 0; x <= d; x += k) {
//     for (let y = 0; y <= d; y += k) {
//       isInside(x, y, d) ? answer++ : null;
//     }
//   }

//   return answer;
// }

function solution(k, d) {
  let answer = 0;

  let area = d * d;

  let farY = (x, k, area) => {
    area -= x * x;
    let tmpY = Math.floor(Math.sqrt(area));
    while (tmpY % k !== 0) {
      tmpY--;
    }
    return tmpY;
  };

  let yArr = [];
  for (let x = 0; x <= d; x += k) {
    answer += farY(x, k, area) / k + 1;
  }

  return answer;
}

solution(2, 4);
