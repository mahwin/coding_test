function solution(cacheSize, cities) {
  let cache = [];
  let answer = 0;
  cities.forEach((city) => {
    city = city.toLowerCase();
    if (cache.includes(city)) {
      // 캐시 히트
      answer++;
      cache = cache.filter((el) => el !== city);
      cache.push(city);
    } else {
      // 캐시 미스
      answer += 5;
      cache.push(city);
      if (cache.length > cacheSize) cache.shift();
    }
  });

  return answer;
}
