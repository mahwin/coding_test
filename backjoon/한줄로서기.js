let input = `6
5 4 3 2 1 0`.split("\n");

const solution = () => {
  const n = +input[0];
  input = input[1].split(" ").map(Number);
  const arr = Array.from({ length: n }, () => null);

  for (let i = 0; i < n; i++) {
    let bigger = 0;
    for (let j = 0; j < n; j++) {
      if (bigger == input[i]) {
        if (arr[j]) continue;
        else {
          arr[j] = i + 1;
          break;
        }
      } else if (arr[j] > i + 1 || !arr[j]) bigger++;
    }
  }
  return arr.join(" ");
};

console.log(solution());
