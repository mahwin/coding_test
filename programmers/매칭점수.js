const getScore = (pageInfos) => {
  let result = [-1, -Infinity];
  for (let i = 0; i < pageInfos.length; i++) {
    let linkedScore = 0;
    let url = pageInfos[i].url;
    for (let j = 0; j < pageInfos.length; j++) {
      if (i == j) continue;
      pageInfos[j].link.forEach((outLink) => {
        if (url === outLink) {
          linkedScore += pageInfos[j].basicScore / pageInfos[j].link.length;
        }
      });
    }
    const totalScore = pageInfos[i].basicScore + linkedScore;
    console.log(totalScore);
    if (totalScore > result[1]) {
      result[0] = pageInfos[i].index;
      result[1] = totalScore;
    }
  }
  return result[0];
};

function solution(word, pages) {
  let pageInfos = [];
  const urlP = '  <meta property="og:url" content="https://';
  const linkP = '<a href="https://';
  word = word.toUpperCase();
  pages.forEach((page, i) => {
    let infoObj = { index: i, link: [], basicScore: 0 };
    const html = page.split("\n");

    for (let i = 0; i < html.length; i++) {
      if (html[i].includes(urlP)) {
        infoObj["url"] = html[i].slice(urlP.length, html[i].length - 3);
      } else if (html[i].includes(linkP)) {
        const htmlSplit = html[i].split(linkP);
        for (let sliceHtml of htmlSplit) {
          if (sliceHtml.includes("</a>")) {
            infoObj.link.push(sliceHtml.split('">')[0]);
          }
        }
      }

      html[i]
        .toUpperCase()
        .split(/[\d|\W]/)
        .forEach((w) => {
          if (w === word) infoObj["basicScore"]++;
        });
    }
    pageInfos.push(infoObj);
  });
  console.log(pageInfos);
  return getScore(pageInfos);
}
