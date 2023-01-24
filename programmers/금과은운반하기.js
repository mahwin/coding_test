function solution(a, b, g, s, w, t) {
  let len = g.length;
  let left = 0;
  let right = 10e5 * 4 * 10e9;

  let maxGold, maxSilver, sum, mid;

  while (left < right) {
    [maxGold, maxSilver, sum] = [0, 0, 0];
    mid = Math.floor((left + right) / 2);

    for (let i = 0; i < len; i++) {
      let cnt = Math.floor(mid / (t[i] * 2));
      if (mid % (t[i] * 2) >= t[i]) cnt++;

      let maxWeight = cnt * w[i];
      maxGold += g[i] < maxWeight ? g[i] : maxWeight;
      maxSilver += s[i] < maxWeight ? s[i] : maxWeight;
      sum += g[i] + s[i] > maxWeight ? maxWeight : g[i] + s[i];
    }

    if (maxGold >= a && maxSilver >= b && sum >= a + b) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return left;
}

// console.log(solution(10, 10, [100], [100], [7], [10]));
console.log(
  solution(90, 500, [70, 70, 0], [0, 0, 500], [100, 100, 2], [4, 8, 1])
);
