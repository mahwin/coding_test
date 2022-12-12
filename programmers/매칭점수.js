function solution(word, pages) {
  let answer = [0, 0];
  let pageInfo = {};

  const urlRegex =
    /<meta property="og:url" content="(?<url>https:\/\/[^\s]+)\"\/>/;
  const wordRegex = new RegExp(`(${word}){1,}`, "gi");
  const linkRegex = /<a href="https:\/\/[^"\s]+">/gi;
  pages.forEach((page, i) => {
    const url = page.match(urlRegex).groups.url;
    const words = (page.match(wordRegex) || []).filter(
      (repeated) => repeated.toLowerCase() === word.toLowerCase()
    );
    const links = (page.match(linkRegex) || []).map(
      (str) => str.match(/"(?<url>https:\/\/[^"\s]+)"/).groups.url
    );
    pageInfo[url] = {
      i,
      score: words.length,
      linkScore: words.length / links.length,
      links,
      linkedScore: 0,
    };
  });

  Object.values(pageInfo).forEach((page) => {
    page.links.forEach((linkURL) => {
      if (pageInfo[linkURL]) {
        pageInfo[linkURL].linkedScore += page.linkScore;
      }
    });
  });

  Object.keys(pageInfo).forEach((key) => {
    let i = pageInfo[key].i;
    let totalScore = pageInfo[key].score + pageInfo[key].linkedScore;

    if (totalScore > answer[0]) answer = [totalScore, i];
  });

  return answer[1];
}

solution("Muzi", [
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://careers.kakao.com/interview/list"/>\n</head>  \n<body>\n<a href="https://programmers.co.kr/learn/courses/4673"></a>#!MuziMuzi!)jayg07con&&\n\n</body>\n</html>',
  '<html lang="ko" xml:lang="ko" xmlns="http://www.w3.org/1999/xhtml">\n<head>\n  <meta charset="utf-8">\n  <meta property="og:url" content="https://www.kakaocorp.com"/>\n</head>  \n<body>\ncon%\tmuzI92apeach&2<a href="https://hashcode.co.kr/tos"></a>\n\n\t^\n</body>\n</html>',
]);
