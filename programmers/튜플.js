function solution(s) {
  let set = new Set();

  s.slice(2, -2)
    .split("},{")
    .map((el) => el.split(",").map(Number))
    .sort((a, b) => a.length - b.length)
    .forEach((el) => el.forEach((num) => set.add(num)));

  return [...set];
}

let s = "{{2},{2,1},{2,1,3},{2,1,3,4}}";
console.log(solution(s));
