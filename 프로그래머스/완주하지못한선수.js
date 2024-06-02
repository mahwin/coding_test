function solution(participant, completion) {
  const map = new Map();
  participant.forEach((start) => {
    map.set(start, map.get(start) ? map.get(start) + 1 : 1);
  });
  completion.forEach((finish) => {
    map.get(finish) === 1
      ? map.delete(finish)
      : map.set(finish, map.get(finish) - 1);
  });

  return map.keys()[Symbol.iterator]().next().value;
}
