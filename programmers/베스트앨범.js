function solution(genres, plays) {
  let answer = [];
  let countGenre = {};
  genres.forEach((genre, i) => {
    if (countGenre[genre]) {
      const [sum, countArr, idxArr] = countGenre[genre];
      countGenre[genre] = [
        sum + plays[i],
        [...countArr, plays[i]],
        [...idxArr, i],
      ];
    } else {
      countGenre[genre] = [plays[i], [plays[i]], [i]];
    }
  });
  // 합이 큰 장르 리스트 뽑기
  const sortKeys = Object.keys(countGenre).sort(
    (a, b) => countGenre[b][0] - countGenre[a][0]
  );
  //  합이 큰 장르 순서대로 베스트 2곡 뽑기
  sortKeys.forEach((genre) => {
    if (countGenre[genre][1].length === 1) answer.push(countGenre[genre][2][0]);
    else {
      let [_, countArr, idxArr] = countGenre[genre];
      let sortArr = [...countArr].sort((a, b) => b - a);
      let [max, nextMax] = sortArr.slice(0, 2);
      let tmp = [[], []];
      countArr.forEach((count, i) => {
        if (count === max) tmp[0].push(idxArr[i]);
        if (count === nextMax) tmp[1].push(idxArr[i]);
      });
      if (tmp[0].length > 1) {
        let sort = tmp[0].sort((a, b) => a - b);
        answer.push(sort[0], sort[1]);
      } else {
        tmp.forEach((t) => {
          let sort = t.sort((a, b) => a - b);
          answer.push(sort[0]);
        });
      }
    }
  });
  return answer;
}

// console.log(
//   solution(
//     ["classic", "pop", "classic", "classic", "pop"],
//     [500, 600, 150, 800, 2500]
//   )
// );

console.log(solution(["a", "b", "b"], [1, 2, 2]));
