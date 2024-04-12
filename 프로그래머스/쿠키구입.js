function solution(cookie) {
  let result = 0;
  const len = cookie.length;

  for (let i = 0; i < len - 1; i++) {
    let bro1P = i;
    let bro2P = i + 1;
    let bro1 = cookie[bro1P];
    let bro2 = cookie[bro2P];

    while (bro1P > -1 && bro2P < len) {
      if (bro1 === bro2) {
        result = Math.max(result, bro1);
        bro1P--;
        bro2P++;
        bro1 += cookie[bro1P];
        bro2 += cookie[bro2P];
      } else if (bro1 < bro2) {
        bro1P--;
        bro1 += cookie[bro1P];
      } else {
        bro2P++;
        bro2 += cookie[bro2P];
      }
    }
  }

  return result;
}
