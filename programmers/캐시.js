const arrDeleteTarget = (arr, target) => {
  arr.splice(arr.indexOf(target), 1);
  return arr;
};

function solution(cacheSize, cities) {
  if (cacheSize === 0) return cities.length * 5;
  cities = cities.map((el) => el.toLowerCase());

  let cacheArr = [];
  let time = 0;
  for (let i = 0; i < cities.length; i++) {
    const city = cities[i];
    if (cacheArr.includes(city)) {
      cacheArr = arrDeleteTarget(cacheArr, city);
      cacheArr.push(city);
      time += 1;
    } else {
      if (cacheArr.length < cacheSize) {
        cacheArr.push(city);
      } else {
        cacheArr = [...cacheArr.slice(1), city];
      }
      time += 5;
    }
  }

  return time;
}

solution(0, ["LA", "LA"]);
