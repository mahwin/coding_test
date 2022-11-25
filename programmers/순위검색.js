//map보다 {}가 훠어얼씬 빠름
function solution(info, query) {
  let answer = [];
  let map = {};

  // info 원소를 통해 모든 key 값을 조합하고 value는 그 값에 해당하는 score를 넣음
  // ex {'abc':[10,200,300]}
  function combination(infomation, score, map, start) {
    let key = infomation.join(""); //key 값

    //존재하는 키 값인지 판별
    if (map[key]) {
      map[key].push(score);
    } else {
      map[key] = [score];
    }

    // 기존 info 배열에 '-'를 넣어서 score가 해당할 수 있는 모든 key 값에 넣음.
    // ex {'abc':[1], 'a--':[1], 'a-c':[1]}
    for (let i = start; i < infomation.length; i++) {
      let newInfo = [...infomation];
      newInfo[i] = "-";
      combination(newInfo, score, map, i + 1);
    }
  }

  for (let i = 0; i < info.length; i++) {
    let infomation = info[i].split(" ");
    const score = infomation.pop();
    combination(infomation, score, map, 0);
  }

  function binarySearch(scoreArr, score) {
    if (scoreArr) {
      let left = 0;
      let right = scoreArr.length;

      while (left < right) {
        let mid = Math.floor((right + left) / 2);
        if (scoreArr[mid] >= score) {
          right = mid;
        } else if (scoreArr[mid] < score) {
          left = mid + 1;
        }
      }
      return scoreArr.length - left;
    } else return 0;
  }

  // score 배열 오름 차순으로 정렬 (for 이분 탐색)
  for ([key, value] of Object.entries(map)) {
    value = value.sort((a, b) => a - b).map((n) => +n);
    map[key] = value;
  }

  // query => key ,score 구해서 만족하는 수 세기
  for (let q of query) {
    q = q.split(" and ");
    let [finKey, score] = q.pop().split(" ");
    let key = q.join("") + finKey;
    const scoreArr = map[key];
    answer.push(binarySearch(scoreArr, score));
  }
  return answer;
}

console.log(
  solution(
    [
      "java backend junior pizza 150",
      "python frontend senior chicken 210",
      "python frontend senior chicken 150",
      "cpp backend senior pizza 260",
      "java backend junior chicken 80",
      "python backend senior chicken 50",
    ],
    [
      "java and backend and junior and pizza 100",
      "python and frontend and senior and chicken 200",
      "cpp and - and senior and pizza 250",
      "- and backend and senior and - 150",
      "- and - and - and chicken 100",
      "- and - and - and - 150",
    ]
  )
);
