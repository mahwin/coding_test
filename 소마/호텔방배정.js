function solution(k, room_number) {
  const map = new Map();
  const result = [];
  for (let room of room_number) {
    let tmp = [];
    while (map.has(room)) {
      tmp.push(room);
      room = map.get(room);
    }
    result.push(room);
    map.set(room, room + 1);

    tmp.forEach((r) => map.set(r, room + 1));
  }
  return result;
}
