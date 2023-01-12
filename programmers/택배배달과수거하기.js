function solution(cap, n, deliveries, pickups) {
  let deliverPointer = deliveries.length - 1;
  let pickPointer = pickups.length - 1;

  let end = deliverPointer;

  while (end > -1) {
    if (deliveries[end] > 0) break;
    if (pickups[end] > 0) break;
    end--;
  }

  let dis = 0;
  let pack, pick;

  while (end > -1) {
    dis += (end + 1) * 2;

    pack = cap;
    while (pack !== 0 && deliverPointer > -1) {
      if (deliveries[deliverPointer] >= pack) {
        deliveries[deliverPointer] -= pack;
        pack = 0;
      } else {
        pack -= deliveries[deliverPointer];
        deliveries[deliverPointer] = 0;
      }
      while (deliveries[deliverPointer] === 0) deliverPointer--;
    }

    pick = cap;
    while (pick !== 0 && pickPointer > -1) {
      if (pickups[pickPointer] >= pick) {
        pickups[pickPointer] -= pick;
        pick = 0;
      } else {
        pick -= pickups[pickPointer];
        pickups[pickPointer] = 0;
      }
      while (pickups[pickPointer] === 0) pickPointer--;
    }
    end = pickPointer > deliverPointer ? pickPointer : deliverPointer;
  }
  return dis;
}
console.log(solution(1, 7, [0, 0, 0, 0, 0, 0, 0], [0, 0, 0, 0, 0, 0, 0]));
