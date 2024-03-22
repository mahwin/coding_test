function solution(numbers, hand) {
  hand = hand[0] === "r" ? "R" : "L";

  const numberPosObj = {};

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 4; j++) {
      numberPosObj[i * 3 + j + 1] = [i, j];
    }
  }

  numberPosObj[0] = [3, 1];

  const handPos = { L: [3, 0], R: [3, 2] };

  return numbers
    .map((number) => {
      if (/[147]/g.test(number)) {
        handPos.L = numberPosObj[number];

        return "L";
      }
      if (/[369]/.test(number)) {
        handPos.R = numberPosObj[number];
        return "R";
      }
      const rD = getDistance(number, handPos.R, numberPosObj);
      const lD = getDistance(number, handPos.L, numberPosObj);

      if (rD === lD) {
        handPos[hand] = numberPosObj[number];
        return hand;
      }

      if (rD > lD) {
        handPos.L = numberPosObj[number];
        return "L";
      }
      handPos.R = numberPosObj[number];
      return "R";
    })
    .join("");
}

function getDistance(number, handPos, numberPosObj) {
  return (
    Math.abs(numberPosObj[number][0] - handPos[0]) +
    Math.abs(numberPosObj[number][1] - handPos[1])
  );
}

console.log(solution([1, 3, 4, 5, 8, 2, 1, 4, 5, 9, 5], "right"));
