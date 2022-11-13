function solution(k, ranges) {
  let ubackArr = [[0, k]];
  let idx = 1;

  const coodinator = (k) => {
    if (k === 1) return ubackArr;
    if (k % 2 === 1) {
      k = k * 3 + 1;
    } else {
      k /= 2;
    }
    idx++;
    ubackArr.push([idx, k]);
    coodinator(k);
  };

  const areaCal = (y1, y2) => {
    let area;
    if (y1 >= y2) {
      area = y2 + (1 / 2) * (y1 - y2);
    } else {
      area = y1 + (1 / 2) * (y2 - y1);
    }
    return area;
  };

  const areaSum = (x1, x2, areaArr) => {
    const copyArea = areaArr.slice(x1, x2);
    return copyArea.reduce((p, c) => (p += c), 0);
  };

  //우박 수열 생성, ubackArr
  coodinator(k);

  let areaArr = [];
  for (let i = 0; i < ubackArr.length - 1; i++) {
    [y1, y2] = [ubackArr[i][1], ubackArr[i + 1][1]];
    areaArr.push(areaCal(y1, y2));
  }
  const maxX = ubackArr.length - 1;

  let result = [];
  for (let range of ranges) {
    let [init, fin] = range;
    fin = maxX + fin;
    if (init < fin) {
      result.push(areaSum(init, fin, areaArr));
    } else if (init === fin) {
      result.push(0.0);
    } else {
      result.push(-1.0);
    }
  }
  return result;
}

solution(5, [
  [0, 0],
  [0, -1],
  [2, -3],
  [3, -3],
]);
