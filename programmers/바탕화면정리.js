function solution(wallpaper) {
  let r1, c1, r2, c2;
  let flag = false;
  for (let r = 0; r < wallpaper.length; r++) {
    for (let c = 0; c < wallpaper[0].length; c++) {
      if (wallpaper[r][c] == "#") {
        r1 = r;
        flag = true;
        break;
      }
    }
    if (flag) break;
  }
  flag = false;
  for (let r = wallpaper.length - 1; r > -1; r--) {
    for (let c = 0; c < wallpaper[0].length; c++) {
      if (wallpaper[r][c] == "#") {
        r2 = r + 1;
        flag = true;
        break;
      }
    }
    if (flag) break;
  }
  flag = false;
  for (let c = 0; c < wallpaper[0].length; c++) {
    for (let r = 0; r < wallpaper.length; r++) {
      if (wallpaper[r][c] == "#") {
        c1 = c;
        flag = true;
        break;
      }
    }
    if (flag) break;
  }
  flag = false;
  for (let c = wallpaper[0].length - 1; c > -1; c--) {
    for (let r = 0; r < wallpaper.length; r++) {
      console.log(c, r);
      if (wallpaper[r][c] == "#") {
        c2 = c + 1;
        flag = true;
        break;
      }
    }
    if (flag) break;
  }
  if (r1 === r2) r2++;
  if (c1 === c2) c2++;
  return [r1, c1, r2, c2];
}

console.log(solution(["..", "#."]));
