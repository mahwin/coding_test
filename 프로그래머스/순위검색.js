function solution(info, query) {
  const scoreObj = {};

  info.forEach((el) => {
    const infoArr = el.split(" ");

    for (let i = 0; i < 1 << 4; i++) {
      let key = "";

      for (let j = 0; j < 4; j++) {
        const mask = 1 << j;
        if (i & mask) {
          key += infoArr[j];
        }
      }

      if (scoreObj[key]) {
        scoreObj[key].push(Number(infoArr[4]));
      } else {
        scoreObj[key] = [Number(infoArr[4])];
      }
    }
  });

  // 정렬
  Object.keys(scoreObj).forEach((key) => {
    scoreObj[key].sort((a, b) => a - b);
  });

  const result = [];

  query.forEach((info) => {
    const infoArr = info.split(" ");
    const targetScore = Number(infoArr.pop());
    const targetKey = infoArr
      .filter((char) => char !== "and" && char !== "-")
      .join("");

    if (scoreObj[targetKey]) {
      result.push(binarySearch(scoreObj[targetKey], targetScore));
    } else {
      result.push(0);
    }
  });
  return result;
}

function binarySearch(scores, target) {
  let l = 0;
  let r = scores.length;
  let result = Infinity;
  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (scores[mid] < target) {
      l = mid + 1;
    } else {
      result = Math.min(result, mid);
      r = mid - 1;
    }
  }
  return scores.length - result;
}
