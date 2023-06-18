const keyObj = {
  1: [0, 0],
  2: [0, 1],
  3: [0, 2],
  4: [1, 0],
  5: [1, 1],
  6: [1, 2],
  7: [2, 0],
  8: [2, 1],
  9: [2, 2],
  0: [3, 1],
};

const getDis = (pos1, pos2) => {
  return Math.abs(pos1[0] - pos2[0]) + Math.abs(pos1[1] - pos2[1]);
};
function solution(numbers, hand) {
  let onlyLeft = [1, 4, 7];
  let onlyRight = [3, 6, 9];
  let result = "";
  const pos = { left: [3, 0], right: [3, 2] };

  numbers.forEach((num) => {
    if (onlyLeft.includes(num)) {
      // 왼손으로만 누르는 패드
      result += "L";
      pos.left = keyObj[num];
    } else if (onlyRight.includes(num)) {
      // 오른손으로만 누르틑 패드
      result += "R";
      pos.right = keyObj[num];
    } else {
      const LDistance = getDis(pos.left, keyObj[num]);
      const RDistance = getDis(pos.right, keyObj[num]);
      if (LDistance === RDistance) {
        if (hand === "right") {
          result += "R";
          pos.right = keyObj[num];
        } else {
          result += "L";
          pos.left = keyObj[num];
        }
      } else if (LDistance > RDistance) {
        result += "R";
        pos.right = keyObj[num];
      } else {
        result += "L";
        pos.left = keyObj[num];
      }
    }
  });
  return result;
}
