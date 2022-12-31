function solution(numbers) {
  dist = distance();

  const map = new Map([["46", 0]]);

  for (let i = 0; i < numbers.length; i++) {
    let tmp = new Map(map);
    let num = numbers[i];

    map.clear();

    for (let [key, val] of tmp) {
      let [left, right] = key.split("");

      if (map.has(left + num) || map.has(num + left)) {
        let rightKey = map.has(left + num) ? left + num : num + left;

        map.set(rightKey, Math.min(map.get(rightKey), val + dist[right][num]));
      } else {
        if (left != num) map.set(left + "" + num, val + dist[right][num]);
      }

      if (map.has(num + right) || map.has(right + num)) {
        let leftKey = map.has(num + right) ? num + right : right + num;
        map.set(leftKey, Math.min(leftKey, val + dist[left][num]));
      } else {
        if (right != num) map.set(num + "" + right, val + dist[left][num]);
      }
    }
  }

  return [...map.entries()].reduce((pv, cv) => (pv[1] < cv[1] ? pv : cv))[1];
}

function distance() {
  const w = Array.from({ length: 10 }, () => Array(10).fill(0));

  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      let x = Math.abs(position(i)[0] - position(j)[0]);
      let y = Math.abs(position(i)[1] - position(j)[1]);
      let min = Math.min(x, y);
      let max = Math.max(x, y);
      w[j][i] = i === j ? 1 : min * 3 + Math.abs(max - min) * 2;
    }
  }
  return w;
}

function position(num) {
  const pad = [
    ["1", "2", "3"],
    ["4", "5", "6"],
    ["7", "8", "9"],
    ["*", "0", "#"],
  ];
  let p = [];
  pad.find((arr, i) => {
    if (arr.includes(num + "")) {
      p = [i, arr.indexOf(num + "")];
    }
  });
  return p;
}
