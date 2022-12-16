function solution(cacheSize, cities) {
  let answer = 0;
  let chache = [];

  if (cacheSize === 0) return cities.length * 5;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i].toLowerCase();
    const isIn = chache.includes(city);
    answer += isIn ? 1 : 5;
    if (isIn) {
      let cityIndex = chache.indexOf(city);
      chache = [
        ...chache.slice(0, cityIndex),
        ...chache.slice(cityIndex + 1),
        city,
      ];
    } else {
      if (chache.length === cacheSize) {
        chache = [...chache.slice(1), city];
      } else chache.push(city);
    }
  }

  return answer;
}

solution(5, [
  "Jeju",
  "Pangyo",
  "Seoul",
  "NewYork",
  "LA",
  "SanFrancisco",
  "Seoul",
  "Rome",
  "Paris",
  "Jeju",
  "NewYork",
  "Rome",
]);
