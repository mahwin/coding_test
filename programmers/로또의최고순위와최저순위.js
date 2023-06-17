const getGrade = (sameNum) => {
  if (sameNum >= 2) return 7 - sameNum;
  return 6;
};

function solution(lottos, win_nums) {
  const cnt = [0, 0]; // [실제로 일치하는 수, 알아 볼 수 없는 수];
  lottos.forEach((el) => {
    if (win_nums.includes(el)) cnt[0]++;
    else if (el === 0) cnt[1]++;
  });
  return [getGrade(cnt[1] + cnt[0]), getGrade(cnt[0])];
}
