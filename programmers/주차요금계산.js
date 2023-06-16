const timeToMin = (time) => {
  const [h, m] = time.split(":").map(Number);
  return h * 60 + m;
};

const getPee = (fees, time) => {
  //기본 시간 이하면 기본 요금, 넘는 다면 기본 여금 + 단위 시간 금액
  if (time <= fees[0]) return fees[1];
  return fees[1] + Math.ceil((time - fees[0]) / fees[2]) * fees[3];
};

function solution(fees, records) {
  const accTime = {}; // key 차량 : value 누적 주차 시간
  const inCar = new Map(); // key 차량 : 들어온 시간
  records.forEach((el) => {
    const [time, car, inOrOut] = el.split(" ");
    if (inOrOut === "IN") inCar.set(car, timeToMin(time));
    else {
      const diffTime = timeToMin(time) - inCar.get(car);
      accTime[car] = accTime[car] ? accTime[car] + diffTime : diffTime;
      inCar.delete(car);
    }
  });
  // 출차 기록이 없는 차량
  const MAX_TIME = "23:59";
  for (const [car, time] of inCar) {
    const diff = timeToMin(MAX_TIME) - time;
    accTime[car] = accTime[car] ? accTime[car] + diff : diff;
  }
  return Object.keys(accTime)
    .sort()
    .map((el) => getPee(fees, accTime[el]));
}
