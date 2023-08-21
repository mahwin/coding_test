const [n, k] = input[0].split(" ").map(Number);
let pick;
let result = 0;
const words = []; // input 데이터를 비트화해서 저장

const sol = () => {
  const initAlpha = new Set("antatica");

  if (k < initAlpha.size) return 0;
  else if (k >= 26) return n;

  let alpha = 0;

  //초기값 비트 표기
  [...initAlpha].forEach(
    (a) => (alpha |= 1 << (a.charCodeAt() - "a".charCodeAt()))
  );

  //input 단어를 비트로 표기
  for (let i = 1; i <= n; i++) {
    let word = 0;
    input[i].split("").forEach((char) => {
      word |= 1 << (char.charCodeAt() - "a".charCodeAt());
    });
    words.push(word);
  }

  //고를 수 있는 알파벳 수
  pick = k - initAlpha.size;

  dfs(0, 0, alpha); // 선택한 수, 비트 마스크
};

const dfs = (init, cnt, alphaBit) => {
  if (cnt === pick) {
    let tmp = 0;
    for (const word of words) {
      if ((alphaBit | word) === alphaBit) {
        tmp++;
      }
    }
    result = Math.max(result, tmp);
    return;
  }
  for (let i = init; i < 26; i++) {
    if (alphaBit & (1 << i)) continue;
    dfs(i + 1, cnt + 1, alphaBit | (1 << i));
  }
};

sol();
console.log(result);
