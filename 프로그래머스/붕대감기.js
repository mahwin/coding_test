function solution(bandage, health, attacks) {
  const maxHp = health;

  let [cooltime, secHeal, addHeal] = bandage;

  let accHealingTime = 0;
  let preTime = 0;

  for (const [nextTime, dam] of attacks) {
    const timeDiff = nextTime - preTime - 1;
    health += Math.floor(timeDiff / cooltime) * addHeal;
    health += timeDiff * secHeal;

    health = Math.min(health, maxHp);

    preTime = nextTime;

    health -= dam;
    if (health <= 0) return -1;
  }
  return health;
}
