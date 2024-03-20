function dateToMin(date) {
  const [h, m] = date.split(":").map(Number);
  return h * 60 + m;
}

function calPrice(min, fees) {
  console.log(min);
  const [baseTime, baseFee, unitTime, unitFee] = fees;
  const addTime = min - baseTime;
  if (addTime <= 0) return baseFee;
  return baseFee + Math.ceil(addTime / unitTime) * unitFee;
}

function solution(fees, records) {
  // 차량 번호 : {inTime:number, totalTime:number}로 저장하자
  // outTime은 totalTime 계산에만 필요해서 취급 XXX

  const parkingInfo = {};
  const parkCarSet = new Set();

  // 잘못 입력된 경우는 없으니 IN이면 inTime을 갱신
  // OUT이면 totalTime을 갱신하도록 하자.
  // 마지막 OUT 정보가 없을 수도 있으니 parkSet을 하나 만들어서 관리하자.
  records.forEach((record) => {
    const [date, carNumber, type] = record.split(" ");
    const curMin = dateToMin(date);
    if (type === "IN") {
      parkCarSet.add(carNumber);
      if (!parkingInfo[carNumber]) {
        parkingInfo[carNumber] = { inMin: 0, totalMin: 0 };
      }
      parkingInfo[carNumber].inMin = curMin;
    }
    if (type === "OUT") {
      parkCarSet.delete(carNumber);
      parkingInfo[carNumber].totalMin += curMin - parkingInfo[carNumber].inMin;
    }
  });

  [...parkCarSet].forEach((carNumber) => {
    parkingInfo[carNumber].totalMin +=
      dateToMin("23:59") - parkingInfo[carNumber].inMin;
  });

  return Object.keys(parkingInfo)
    .sort()
    .map((carNumber) => {
      return calPrice(parkingInfo[carNumber].totalMin, fees);
    });
}
