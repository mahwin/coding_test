const subCalculator = (inTime, outTime) => {
  let [H1, M1] = inTime.split(":").map(Number);
  let [H2, M2] = outTime.split(":").map(Number);
  return (H2 - H1) * 60 + M2 - M1;
};

const costCalculator = (min, fees) => {
  const [baseTime, baseFee, addTime, addFee] = fees;
  if (min <= baseTime) return baseFee;
  return Math.ceil((min - baseTime) / addTime) * addFee + baseFee;
};

function solution(fees, records) {
  let answer = [];
  let carNumber = new Set();
  let recordObj = {};
  records.forEach((record) => {
    const [time, number, _] = record.split(" ");
    carNumber.has(number)
      ? recordObj[number].push(time)
      : (recordObj[number] = [time]);
    carNumber.add(number);
  });

  let sortCarNumber = Object.keys(recordObj).sort((a, b) => a - b);

  sortCarNumber.forEach((number) => {
    let times = recordObj[number];
    times.length % 2 !== 0 ? times.push("23:59") : null;
    let parkTime = 0;
    while (times.length) {
      let inTime = times.shift();
      let outTime = times.shift();
      parkTime += subCalculator(inTime, outTime);
    }

    answer.push(costCalculator(parkTime, fees));
  });

  return answer;
}

solution(
  [180, 5000, 10, 600],
  [
    "05:34 5961 IN",
    "06:00 0000 IN",
    "06:34 0000 OUT",
    "07:59 5961 OUT",
    "07:59 0148 IN",
    "18:59 0000 IN",
    "19:09 0148 OUT",
    "22:59 5961 IN",
    "23:00 5961 OUT",
  ]
);
