const readline = require("readline");

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

let input;

rl.on("line", (line) => {
  input = line.trim();
  rl.close();
});

rl.on("close", () => {
  console.log(solution());
  process.exit();
});

// 224ms
const solution = () => {
  let result = -Infinity;
  let ducks = [];
  const sound = "quack";
  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    if (current === "q") {
      ducks.push(1);
      result = Math.max(result, ducks.length);
      continue;
    }

    let flag = false; // 현재 소리를 낼 수 있는 오리가 있으면 true
    for (let duckIdx = 0; duckIdx < ducks.length; duckIdx++) {
      const nextSound = ducks[duckIdx];
      if (sound[nextSound] === current) {
        ducks[duckIdx]++;
        flag = true;
        if (ducks[duckIdx] === 5) ducks.splice(duckIdx, 1);
        break;
      }
    }
    if (!flag) return -1;

    result = Math.max(result, ducks.length);
  }
  //아직 울음이 끝나지 않은 오리가 있으면 -1
  return ducks.length === 0 ? result : -1;
};

//200ms
const sol = () => {
  let result = -Infinity;
  const sound = "quack";

  const soundMap = {};
  sound.split("").forEach((s, i) => (soundMap[s] = i));

  let ducks = Array.from({ length: sound.length }, () => 0);

  for (let i = 0; i < input.length; i++) {
    const current = input[i];
    const key = soundMap[current];
    ducks[key]++;

    for (let i = 0; i < 4; i++) {
      if (ducks[i] < ducks[i + 1]) {
        return -1;
      }
    }
    result = Math.max(result, ducks[0] - ducks[4]);
  }
  //울다 말았을 경우 -1
  return ducks[0] === ducks[4] ? result : -1;
};

// const genInput = (num) => {
//   const sound = "quack";
//   let input = [];
//   while (input.length !== num) {
//     const random = sound[Math.floor(Math.random() * 5)];
//     input.push(random);
//   }
//   return input;
// };

// while (true) {
//   input = genInput(10);
//   const s1 = solution();
//   const s2 = sol();
//   if (s1 !== s2) {
//     console.log(input);
//     console.log(s1);
//     console.log(s2);
//     break;
//   }
// }
