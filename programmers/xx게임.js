function solution(land, P, Q) {
  let spreadLand = land.flat();

  let floorSet = [...new Set(spreadLand)].sort((a, b) => b - a);

  const calCost = (floor) => {
    if (floor === undefined) return Infinity;
    let needBuild = 0;
    let needDestroy = 0;
    spreadLand.forEach((el) => {
      const dif = floor - el;
      if (dif > 0) needBuild += dif;
      else needDestroy += dif * -1;
    });

    return P * needBuild + Q * needDestroy;
  };

  let left = 0;
  let right = floorSet.length;
  let result = 0;

  while (left <= right) {
    mid = Math.floor((left + right) / 2);
    const currentost = calCost(floorSet[mid]);
    const nextCost = calCost(floorSet[mid + 1]);

    if (currentost < nextCost) {
      result = midCost;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return result;
}
