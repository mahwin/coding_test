function solution(word, pages) {
  // value, outLinked,linkScore,mathScore 기본 점수, 외부링크, 링크점수, 매칠점수
  const N = pages.length;

  const pageScores = Array.from({ length: N }, (_, i) => [0, 0, 0, 0, i]);
  const pageInfo = Array.from({ length: N }, () =>
    Array.from({ length: 2 }, () => [])
  );

  let specialReg = /[^a-z]/g;

  for (let i = 0; i < N; i++) {
    let page = pages[i];

    for (let el of page.split("<")) {
      if (el.startsWith('meta property="og:url"')) {
        let homeUrl = el.split(" ").slice(2)[0].split('"')[1];
        pageInfo[i][0].push(homeUrl);
      } else if (el.startsWith("a href")) {
        let linkUrl = el.split(">")[0].slice(7);
        pageInfo[i][1].push(linkUrl.slice(1, -1));
      }
    }
    let wordCnt = 0;

    page
      .toLowerCase()
      .split(specialReg)
      .forEach((string) => {
        if (word.toLowerCase() === string.toLowerCase()) wordCnt++;
      });
    pageScores[i][0] = wordCnt;
  }

  for (let i = 0; i < N; i++) {
    const outLinked = pageInfo[i][1].length;
    pageScores[i][1] = outLinked;
  }

  for (let i = 0; i < N; i++) {
    let targetUrl = pageInfo[i][0][0];
    let score = 0;
    for (let j = 0; j < N; j++) {
      if (i === j) continue;
      for (let linkUrl of pageInfo[j][1]) {
        if (targetUrl === linkUrl) {
          score += pageScores[j][0] / pageScores[j][1];
        }
      }
    }
    pageScores[i][2] = score;
    pageScores[i][3] = score + pageScores[i][0];
  }

  pageScores.sort((a, b) => b[3] - a[3]);

  return pageScores[0][4];
}

let pages = [
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
];

console.log(solution("Muzi", pages));
