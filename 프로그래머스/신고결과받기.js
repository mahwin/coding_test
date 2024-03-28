function solution(id_list, report, k) {
  const banObj = {};
  const nameIdxObj = {};

  for (let i = 0; i < id_list.length; i++) {
    nameIdxObj[id_list[i]] = i;
  }

  report.forEach((string) => {
    const [a, banId] = string.split(" ");
    if (banObj[banId]) {
      banObj[banId].add(a);
    } else {
      banObj[banId] = new Set();
      banObj[banId].add(a);
    }
  });

  const result = Array.from({ length: id_list.length }, () => 0);

  Object.keys(banObj).forEach((banId) => {
    if (banObj[banId].size >= k) {
      for (const name of banObj[banId]) {
        result[nameIdxObj[name]]++;
      }
    }
  });

  return result;
}
