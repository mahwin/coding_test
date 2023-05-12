function solution(wallpaper) {
  let [minR, minC, maxR, maxC] = [Infinity, Infinity, 0, 0];

  wallpaper.forEach((rowInfo, r) => {
    rowInfo.split("").forEach((el, c) => {
      if (el === "#") {
        minR = Math.min(minR, r);
        minC = Math.min(minC, c);
        maxR = Math.max(maxR, r);
        maxC = Math.max(maxC, c);
      }
    });
  });

  return [minR, minC, maxR + 1, maxC + 1];
}
