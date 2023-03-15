let input = `4 20
1 2 3 4 5 1 2 3 4 5 1 2 3 4 5 1 2 3 4 5`.split("\n");

const [n, m] = input[0].split(" ").map(Number);
const arr = input[1].split(" ").map(Number);
const concent = new Set();
let result = 0;
for (let i = 0; i < m; i++) {
  if (concent.size < n) {
    concent.add(arr[i]);
    continue;
  }
  if (concent.has(arr[i])) {
    continue;
  } else {
    let tmp = new Set([...concent]);
    let idx = i;
    while (idx < m && tmp.size > 1) {
      if (tmp.has(arr[idx])) {
        tmp.delete(arr[idx]);
      }
      idx++;
    }
    concent.delete([...tmp][0]);
    concent.add(arr[i]);
    result++;
  }
}

console.log(result);
