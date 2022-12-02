function solution(participant, completion) {
  let participantObj = {};
  participant.forEach((p) => {
    participantObj[p] = participantObj[p] ? participantObj[p]++ : 1;
  });
  completion.forEach((c) => {
    participantObj[c]--;
  });

  console.log(participantObj);
  const answer = Object.keys(participantObj).filter(
    (key) => participantObj[key] > 0
  );

  return answer[0];
}

console.log(solution(["leo", "kiki", "eden"], ["eden", "kiki"]));
