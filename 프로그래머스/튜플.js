function solution(s) {
  const result = [];
  ("}," + s.slice(1, -1) + ",{")
    .split("},{")
    .filter((el) => el !== "")
    .sort((a, b) => a.length - b.length)
    .forEach((el) => {
      el.split(",")
        .map(Number)
        .forEach((num) => {
          if (!result.includes(num)) result.push(num);
        });
    });
  return result;
}
