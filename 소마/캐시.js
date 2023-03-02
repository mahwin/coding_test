function solution(cacheSize, cities) {
  let result = 0;
  let caches = [];
  if (!cacheSize) return 5 * cities.length;
  cities.forEach((city) => {
    city = city.toLowerCase();
    const idx = caches.indexOf(city);

    if (idx === -1) {
      if (caches.length < cacheSize) {
        caches.push(city);
      } else {
        caches.shift();
        caches.push(city);
      }
      result += 5;
    } else {
      caches.splice(idx, 1);
      caches.push(city);
      result += 1;
    }
  });
  return result;
}
