function solution(genres, plays) {
  const genreObj = {};
  const uniqueGenre = new Set(genres);

  for (const genre of uniqueGenre) {
    //play 플레이 수, info[0] 플레이 수, info[1] 노래 인덱스
    genreObj[genre] = { play: 0, info: [] };
  }

  genres.forEach((genre, i) => {
    genreObj[genre].play += plays[i];
    genreObj[genre].info.push([plays[i], i]);
  });

  const sortedInfo = Object.values(genreObj).sort((a, b) => b.play - a.play);

  const result = [];
  for (const infoObj of sortedInfo) {
    result.push(
      ...infoObj.info
        .sort((a, b) => b[0] - a[0])
        .slice(0, 2)
        .map((el) => el[1])
    );
  }

  return result;
}
