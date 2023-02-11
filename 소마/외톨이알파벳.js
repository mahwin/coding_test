function solution(input_string) {
  const alphaCnt = {};
  for (let i = 0; i < input_string.length; i++) {
    const key = input_string[i];
    alphaCnt[key] = alphaCnt[key] ? [...alphaCnt[key], i] : [i];
  }
  let answer = 0;
  let alphaSet = new Set();
  for (const key of Object.keys(alphaCnt)) {
    const els = alphaCnt[key];
    console.log(els);
    for (let i = 1; i < els.length; i++) {
      if (els[i] - els[i - 1] !== 1) {
        console.log(key);
        alphaSet.add(key);
      }
    }
  }

  return alphaSet.size === 0 ? "N" : Array.from(alphaSet).sort().join("");
}

solution("edeaaabbccd");
