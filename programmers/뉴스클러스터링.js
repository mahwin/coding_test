function solution(str1, str2) {
  const mutilSet = (str) => {
    const reg = /[a-z]+/;

    let set = [];
    for (let i = 0; i < str.length - 1; i++) {
      let newStr = str.slice(i, i + 2);
      if (newStr.match(reg)) {
        newStr.match(reg)[0].length === 2 ? set.push(newStr) : null;
      }
    }
    return set;
  };

  const jakardScore = (setOne, setTwo) => {
    const oneObj = {};
    const twoObj = {};

    for (let key of setOne) {
      oneObj[key] = oneObj[key] ? oneObj[key] + 1 : 1;
    }
    for (let key of setTwo) {
      twoObj[key] = twoObj[key] ? twoObj[key] + 1 : 1;
    }
    const oneKeys = [...Object.keys(oneObj)];
    const twoKeys = [...Object.keys(twoObj)];

    let unionKey = [...oneKeys];
    [...twoKeys].forEach((key) => {
      if (!unionKey.includes(key)) unionKey.push(key);
    });

    let unionLength = 0;
    unionKey.forEach((key) => {
      const oneV = oneObj[key];
      const twoV = twoObj[key];
      if (oneV && twoV) unionLength += oneV > twoV ? oneV : twoV;
      else if (oneV === undefined) unionLength += twoV;
      else unionLength += oneV;
    });

    let interLength = 0;

    oneKeys.forEach((key) => {
      const oneV = oneObj[key];
      const twoV = twoObj[key];
      if (oneV && twoV) interLength += oneV > twoV ? twoV : oneV;
    });

    return Math.floor((interLength / unionLength) * 65536);
  };

  set1 = mutilSet(str1.toLowerCase());
  set2 = mutilSet(str2.toLowerCase());
  if (set1.length && set2.length) return jakardScore(set1, set2);
  if (!set1.length && !set2.length) return 65536;
  return 0;
}

console.log(solution("FRANCE", "french"));

// FRANCE;
// french;
