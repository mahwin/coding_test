const alpha = "abcdefghijklmnopqrstuvwxyz".toUpperCase();
function solution(msg) {
  const dic = new Map();

  alpha.split("").map((el, i) => {
    dic.set(el, i + 1);
  });
  let result = [];
  let key = "";
  for (let i = 0; i < msg.length; i++) {
    key += msg[i];
    if (dic.has(key)) continue;
    else {
      result.push(dic.get(key.slice(0, key.length - 1)));
      dic.set(key, dic.size + 1);
      key = key[key.length - 1];
    }
  }
  result.push(dic.get(key));
  return result;
}
