function solution(k, room_number) {
  let answer = [];

  const roomMap = new Map();

  for (let room of room_number) {
    let tmp = [];
    while (true) {
      if (!roomMap.has(room)) {
        roomMap.set(room, room + 1);
        answer.push(room);
        break;
      } else {
        tmp.push(room);
        room = roomMap.get(room);
      }
    }

    for (const needUpdate of tmp) {
      roomMap.set(needUpdate, tmp[tmp.length - 1] + 1);
    }
  }

  return answer;
}

console.log(solution(10, [1, 3, 4, 1, 3, 1]));
