function solution(id_list, report, k) {
  const idMap = new Map();
  const mailMap = new Map();
  id_list.forEach((id) => {
    idMap.set(id, new Set());
    mailMap.set(id, 0);
  });
  report.forEach((el) => {
    const [a, b] = el.split(" "); // a가 b를 신고
    idMap.set(b, idMap.get(b).add(a));
  });

  let result = [];
  for (const value of idMap.values()) {
    if (value.size >= k) {
      value.forEach((name) => mailMap.set(name, mailMap.get(name) + 1));
    }
  }
  return [...mailMap.values()];
}
