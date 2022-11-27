function solution(name) {
  let changeAlphabet = 0;
  let minCount = name.length - 1;

  const A = "A".charCodeAt();
  const Z = "Z".charCodeAt();
  const mid = Math.ceil(A + Z / 2);

  for (let i = 0; i < name.length; i++) {
    //특정 알파벳이 A가 되도록 하는 수직 이동은 항상 일정함.
    let currentCode = name.charCodeAt(i);
    changeAlphabet += currentCode < mid ? currentCode - A : Z - currentCode;
    let index = i + 1;

    //좌우로 조이스틱을 움직일 때 변경을 해야하는 알파벳을 거치도록하는 최소 횟수
    //양방향이고 최소 값을 나중에 수직 변경이랑 더하기.
    while (index < name.length && name[index] == "A") index++;
    minCount = Math.min(minCount, i * 2 + name.length - index);
    minCount = Math.min(minCount, (name.length - index) * 2 + i);
  }

  return changeAlphabet + minCount;
}

solution("AAABBBABA");
