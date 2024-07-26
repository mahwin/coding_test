function upToMax(target, max, addNum) {
  return Math.min(target + addNum, max);
}

function solution(bandage, health, attacks) {
  const MAX_HEALTH = health;
  const [duration, secHeal, heal] = bandage;

  let preAttTime = attacks[0][0] - 1;

  for (let i = 0; i < attacks.length; i++) {
    const [attTime, dem] = attacks[i];

    const attDiff = attTime - preAttTime - 1;

    if (attDiff >= duration) {
      health += Math.floor(attDiff / duration) * heal;
    }
    health = upToMax(health, MAX_HEALTH, attDiff * secHeal);

    health -= dem;
    preAttTime = attTime;

    if (health <= 0) return -1;
  }
  return health <= 0 ? -1 : health;
}
