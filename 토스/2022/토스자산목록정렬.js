let inputs = [
  [
    "20-DE0815",
    "20-CO1299",
    "20-MO0901",
    "20-KE0511",
    "20-SP1102",
    "21-DE0401",
    "21-CO0404",
    "21-MO0794",
    "21-KE0704",
    "21-SP0404",
    "19-DE0401",
    "19-CO0404",
    "19-MO0794",
    "19-KE1204",
    "19-SP0404",
  ],
  [
    "13-DE0401",
    "2-MO0915",
    "19-MO1299",
    "17-CO0901",
    "14-DE0511",
    "19-KE1102",
    "13-DE0101",
    "20-SP0404",
    "20-CO0794",
  ],
  [
    "13-DE0401",
    "13-DE0401",
    "22-MO0815",
    "19-MO1299",
    "17-CO0901",
    "14-DE0511",
    "19-KE1102",
    "20-SP0404",
    "20-CO0794",
  ],
];
const answers = [
  [
    "19-SP0404",
    "19-KE1204",
    "19-MO0794",
    "19-CO0404",
    "19-DE0401",
    "20-SP1102",
    "20-KE0511",
    "20-MO0901",
    "20-CO1299",
    "20-DE0815",
    "21-SP0404",
    "21-KE0704",
    "21-MO0794",
    "21-CO0404",
    "21-DE0401",
  ],
  [
    "13-DE0401",
    "14-DE0511",
    "17-CO0901",
    "19-KE1102",
    "19-MO1299",
    "20-SP0404",
    "20-CO0794",
  ],
  [
    "13-DE0401",
    "14-DE0511",
    "17-CO0901",
    "19-KE1102",
    "19-MO1299",
    "20-SP0404",
    "20-CO0794",
    "22-MO0815",
  ],
];

const codes = ["SP", "KE", "MO", "CO", "DE"];

const dataSplit = (str) => {
  let arr = [];
  let tmp = "";
  for (let i = 0; i < str.length; i++) {
    if (str[i] == "-") continue;
    tmp += str[i];
    if (tmp.length == 2) {
      arr.push(tmp);
      tmp = "";
    }
  }
  return arr;
};

const isValid = (str) => {
  if (str.length != 9) return false;
  let [year, code, month, num] = dataSplit(str);
  [year, month, num] = [year, month, num].map(Number);
  if (13 > year || year > 22) return false;
  if (!codes.includes(code)) return false;
  if (1 > month && 12 < month) return false;
  else {
    if (year == 13 && month < 4) return false;
    if (year == 22 && month > 8) return false;
  }
  if (0 > num && 99 < num) return false;
  return [year, code, month, num];
};
const solution = (input) => {
  let set = new Set();
  let result = [];
  input.forEach((str) => {
    const data = isValid(str);
    if (data && !set.has(str)) {
      result.push([str, ...data]);
      set.add(str);
    }
  });

  return result
    .sort((a, b) => {
      const [_, ay, ac, am, an] = a;
      const [__, by, bc, bm, bn] = b;
      if (ay !== by) {
        return ay - by;
      } else if (ac !== bc) {
        return codes.indexOf(ac) - codes.indexOf(bc);
      } else if (am !== bm) return am - bm;
      else return an - bn;
    })
    .map((el) => el[0]);
};

const isSame = (arr1, arr2) => {
  if (arr1.length !== arr2.length) {
    console.log("틀렸습니다.");
    return;
  }
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] != arr2[i]) {
      console.log("틀렸습니다.");
      return;
    }
  }
  console.log("정답입니다.");
};

for (let i = 0; i < 3; i++) {
  const my = solution(inputs[i]);
  isSame(my, answers[i]);
}
