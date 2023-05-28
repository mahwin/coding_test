let input = `4
RDD
4
[1,2,3,4]
DD
1
[42]
RRD
6
[1,1,2,3,5,8]
D
0
[]`.split("\n");

const cal = (funcs, k, arr) => {
  let isReverse = false;
  let [l, r] = [0, arr.length];

  for (let f of funcs) {
    if (f === "R") isReverse = !isReverse;
    else {
      isReverse ? r-- : l++;
    }
  }

  if (r < l) return "error";
  return isReverse ? arr.slice(l, r).reverse() : arr.slice(l, r);
};

const solution = () => {
  const n = Number(input[0]);
  let result = "";
  for (let i = 0; i < n; i++) {
    let j = i * 3 + 1;
    const funcs = input[j].split("");
    const k = Number(input[j + 1]);
    const arr = eval(input[j + 2]);
    const answer = cal(funcs, k, arr);
    if (answer === "error") result += answer + "\n";
    else result += "[" + answer.join(",") + "]" + "\n";
  }
  console.log(result.trim());
};

solution();
