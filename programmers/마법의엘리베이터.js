function solution(storey) {
  const ceilOrFloor = (num) => {
    numArr = [...num.toString().split("").reverse().map(Number), 0];

    for (let i = 0; i < numArr.length - 1; i++) {
      if (numArr[i] > 5) {
        numArr[i + 1]++;
        numArr[i] = 0;
      } else if (numArr[i] === 5) {
        if (numArr[i + 1] >= 5) {
          numArr[i + 1]++;
          numArr[i] = 0;
        }
      }
    }

    const ceilNum = Number(numArr.reverse().join(""));

    if (ceilNum === num) return countNum(num);
    else return countNum(ceilNum - num) + countNum(ceilNum);
  };

  const countNum = (num) => {
    let cnt = 0;

    num
      .toString()
      .split("")
      .forEach((n) => (cnt += +n));
    return cnt;
  };

  return ceilOrFloor(storey);
}

// for (let num = 555; num < 600; num++) {
//   console.log(solution(num), num);
// }

console.log(solution(16), 16);
// 2554	16
// 16 6

// 6 -> 10

// 56

// 4 1 5번
// 96 => 100 4

// 595 11번이래
// 1000 * 1
// -100 * 4
// -1 * 5

// 595 1005
// 6번

// 95 6번
// 35
