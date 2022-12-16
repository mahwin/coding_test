function solution(msg) {
  const alphas = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
  const compressObj = new Map();
  alphas.split("").forEach((alpha, i) => {
    compressObj.set(alpha, i + 1);
  });

  let answer = [];

  let key = "";
  msg += "!";
  for (let i = 0; i < msg.length; i++) {
    key += msg[i];

    if (compressObj.has(key)) continue;
    else {
      compressObj.set(key, compressObj.size + 1);
      answer.push(compressObj.get(key.slice(0, -1)));
      i--;
      key = "";
    }
  }
  answer.pop();
  return answer;
}

console.log(solution("KAKAO"));
