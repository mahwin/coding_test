const getCombination = (elements, pick) => {
  if (pick === 1) return elements.map((el) => [el]);

  let combinations = [];
  elements.forEach((fixed, index) => {
    const combis = getCombination(elements.slice(index + 1), pick - 1);
    combis.forEach((c) => combinations.push([fixed].concat(c)));
  });
  return combinations;
};

const binarySearch = (arr, target) => {
  let left = 0;
  let right = arr.length;
  let marking = undefined;
  let mid;
  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    if (arr[mid] < target) left = mid + 1;
    else {
      marking = mid;
      right = mid - 1;
    }
  }
  if (marking === undefined) return 0;
  else return arr.length - marking;
};

function solution(info, query) {
  let answer = [];
  let infoObj = { "": [] };

  const combinations = [];
  for (let pick = 1; pick < 5; pick++) {
    combinations.push(...getCombination([0, 1, 2, 3], pick));
  }

  info.forEach((str) => {
    let arr = str.split(" ");
    infoObj[""].push(+arr[4]);

    combinations.forEach((combi) => {
      let key = "";
      combi.forEach((n) => {
        key += arr[n];
      });
      if (infoObj[key]) {
        infoObj[key].push(+arr[4]);
      } else infoObj[key] = [+arr[4]];
    });
  });

  for (let key of Object.keys(infoObj)) {
    infoObj[key] = infoObj[key].sort((a, b) => a - b);
  }

  query.forEach((q) => {
    let arr = q.split(" and ");
    let [food, score] = arr.pop().split(" ");
    arr.push(food);
    let key = "";
    arr.forEach((need) => {
      if (need !== "-") key += need;
    });

    if (infoObj[key]) {
      answer.push(binarySearch(infoObj[key], +score));
    } else {
      answer.push(0);
    }
  });

  return answer;
}
