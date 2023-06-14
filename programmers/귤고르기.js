function solution(k, tangerine) {
  let result = 0;
  const tangerineObj = {};
  tangerine.forEach((tan) => {
    tangerineObj[tan] = tangerineObj[tan] ? tangerineObj[tan] + 1 : 1;
  });
  let tangerineArr = Object.entries(tangerineObj);
  tangerineArr.sort((a, b) => b[1] - a[1]);

  for (let i = 0; i < tangerineArr.length; i++) {
    if (result + tangerineArr[i][1] >= k) return i + 1;
    else result += tangerineArr[i][1];
  }
}
