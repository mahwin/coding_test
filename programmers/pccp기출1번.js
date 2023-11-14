function solution(bandage, health, attacks) {
  const MAX_HP = health;
  const LAST_ATTACT_TIME = attacks.at(-1)[0];
  let healTime = 0;
  let attactP = 0;
  for (let time = 1; time <= LAST_ATTACT_TIME; time++) {
    if (attacks[attactP][0] === time) {
      health -= attacks[attactP][1];
      // 죽었는 지 확인
      if (health <= 0) return -1;
      attactP++;
      // 회복 시간 초기화
      healTime = 0;
      continue;
    }
    // 회복한 시간 추가
    healTime++;
    // 초당 회복량 추가
    health += bandage[1];
    // 추가 회복 조건
    if (healTime === bandage[0]) {
      // 회복한 시간 초기화
      healTime = 0;
      health += bandage[2];
    }
    // 최대 최력 넘지 않게 조절
    health = Math.min(MAX_HP, health);
  }

  return health;
}
