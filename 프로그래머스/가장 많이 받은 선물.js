// 1. 너에게 선물을 많이 줬으면 나는 다음 달에 받는다.
// 2. 주고 받지 않았거나 똑같이 주고 받았다면 선물 지수가 더 큰 사람이 받는다.
//    => 선물 지수는 자신이 친구들에게 준 선물의 수 - 받은 선물
function solution(friends, gifts) {
  const len = friends.length;

  // i,j는 i가 j에게 준 선물
  const 선물지수배열 = Array.from({ length: len }, () => 0);
  const 주고받은배열 = Array.from({ length: len }, () =>
    Array.from({ length: len }, () => 0)
  );

  const nameIdxMap = {};
  // 이름 대신 인덱스로 접근하기 위해 필요함.
  friends.forEach((name, i) => {
    nameIdxMap[name] = i;
  });

  gifts.forEach((info) => {
    const [준사람, 받은사람] = info.split(" ").map((name) => nameIdxMap[name]);
    선물지수배열[준사람]++;
    선물지수배열[받은사람]--;

    주고받은배열[준사람][받은사람]++;
  });

  let result = 0;
  for (let i = 0; i < len; i++) {
    let present = 0;
    for (let j = 0; j < len; j++) {
      if (i === j) continue;
      if (주고받은배열[i][j] < 주고받은배열[j][i]) continue;

      if (주고받은배열[i][j] > 주고받은배열[j][i]) present++;
      else if (선물지수배열[i] > 선물지수배열[j]) present++;
    }
    result = Math.max(result, present);
  }

  return result;
}
