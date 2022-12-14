function combination(elements, pick) {
  if (pick === 1) return elements.map((elem) => [elem]);
  const result = [];
  elements.forEach((fixedEl, index) => {
    const tmpCombination = combination(elements.slice(index + 1), pick - 1);
    tmpCombination.forEach((el) => result.push([fixedEl].concat(el)));
  });
  return result;
}

function solution(orders, course) {
  let orderCounter = {};
  let orderArr = Array.from({ length: 20 }, (_, i) => i); //조합용 index Array

  orders = orders.map((food) => food.split("").sort().join(""));
  console.log(orders);

  orders.forEach((order) => {
    let foodLength = order.length;
    let pickArr = course.filter((c) => c <= foodLength);
    pickArr.forEach((pick) => {
      let combis = combination(orderArr.slice(0, foodLength), pick);
      combis.forEach((combi) => {
        let key = "";
        combi.forEach((c) => {
          key += order[c];
        });
        orderCounter[key] = orderCounter[key] ? orderCounter[key] + 1 : 1;
      });
    });
  });
  let courseObj = {};

  Object.keys(orderCounter).forEach((key) => {
    if (course.includes(key.length) && orderCounter[key] !== 1) {
      counter = orderCounter[key];
      if (courseObj[key.length]) {
        if (counter === courseObj[key.length][0]) {
          courseObj[key.length].push(key);
        } else if (counter > courseObj[key.length][0]) {
          courseObj[key.length] = [counter, key];
        }
      } else {
        courseObj[key.length] = [counter, key];
      }
    }
  });
  let answer = [];
  Object.values(courseObj).forEach((arr) => answer.push(...arr.slice(1)));
  return answer.sort();
}

console.log(solution(["XYZ", "XWY", "WXA"], [2, 3, 4]));
