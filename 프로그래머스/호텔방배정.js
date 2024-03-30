function solution(k, room_number) {
  const roomMap = new Map();
  const result = [];

  room_number.forEach((number) => {
    const routes = [number];

    while (roomMap.has(number)) {
      number = roomMap.get(number);
      routes.push(number);
    }

    result.push(number);

    routes.forEach((route) => {
      roomMap.set(route, number + 1);
    });
  });
  return result;
}
