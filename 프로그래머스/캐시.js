function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;

  const cache = [];
  const cacheCity = new Set();

  let time = 0;
  cities.forEach((city) => {
    city = city.toLowerCase();

    if (cacheCity.has(city)) {
      // cache 정보가 있을 경우 해당 city를 최근 값으로 갱신
      cache.splice(cache.indexOf(city), 1);
      cache.push(city);
      time += 1;
    } else if (cacheCity.size + 1 <= cacheSize) {
      // cache 정보가 없고 cache가 꽉차지 않은 경우
      cache.push(city);
      cacheCity.add(city);
      time += 5;
    } else {
      // cache 정보가 없고 cache가 꽉찬 경우
      const oldCity = cache.shift();
      cacheCity.delete(oldCity);

      cache.push(city);
      cacheCity.add(city);

      time += 5;
    }
  });
  return time;
}
