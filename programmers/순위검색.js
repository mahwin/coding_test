const scoreObj = {};

//등수 계산
const bs = (nums, num) => {
  if (!nums) return 0;
  let [l, r] = [0, nums.length - 1];

  while (l <= r) {
    const mid = Math.floor((l + r) / 2);
    if (nums[mid] >= num) {
      l = mid + 1;
    } else {
      r = mid - 1;
    }
  }
  return l;
};

//key값 만들어서 obj 채우기
const fillObj = (arr) => {
  let key = [];

  const dfs = (node) => {
    const k = key.join("");
    scoreObj[k] ? scoreObj[k].push(+arr[4]) : (scoreObj[k] = [+arr[4]]);
    for (let i = node; i < 4; i++) {
      key.push(arr[i]);
      dfs(i + 1);
      key.pop();
    }
  };
  dfs(0);
};
function solution(info, query) {
  info.forEach((el) => {
    const arr = el.split(" ");
    fillObj(arr);
  });

  let result = [];

  Object.keys(scoreObj).forEach((key) => {
    scoreObj[key] = scoreObj[key].sort((a, b) => b - a);
  });

  query.forEach((el) => {
    const arr = el.split(" and ");
    let key = "";
    for (let i = 0; i < 3; i++) {
      if (arr[i] !== "-") key += arr[i];
    }
    const [food, num] = arr[3].split(" ");
    if (food !== "-") key += food;
    result.push(bs(scoreObj[key], num));
  });
  return result;
}

// 효율성 700ms

const scoreMap = new Map();

// 같은 논리로 obj 객체 대신 hash map을 사용하면 통과 못함.
// hash 테이블에 기존에 존재하던 key에 값 추가할때 value를 기존 spread 연산자나 concat을 통해 새 배열로 만들어서 넣어줘야해서 여기서 시간이 오래 걸림.
// obj[key] =obj[key]push(newValue)가 되지만
// map.set(key), map.get(key).push(newValue)) xxxxxxxx [...] 나 concat해서 계산된 값이 배열이 되어야함 push의 경우 undefined임!!.

//등수 계산
// const bs = (nums,num)=> {
//     if(!nums) return 0
//     let [l,r] = [0,nums.length-1];

//     while(l<=r){
//         const mid = Math.floor((l+r)/2);
//         if(nums[mid] >= num){
//             l = mid+1;
//         }else {
//             r = mid-1;
//         }
//     }
//     return l;
// };

// //key값 만들어서 obj 채우기
// const fillObj = (arr)=>{
//     let key = [];
//     const dfs =(node)=>{
//         const k = key.join('');
//         scoreMap.has(k)
//             ? scoreMap.set(k, scoreMap.get(k).concat(+arr[4]))
//             : scoreMap.set(k,[+arr[4]]);
//         for (let i=node; i<4; i++){
//             key.push(arr[i]);
//             dfs(i+1);
//             key.pop();
//         }
//     }
//     dfs(0);
// }
// function solution(info, query) {
//     info.forEach((el)=>{
//         const arr =el.split(' ');
//         fillObj(arr);
//     })

//     let result = [];

//     scoreMap.forEach((v,k)=>{
//         scoreMap.set(k,scoreMap.get(k).sort((a,b)=>b-a));
//     })

//     query.forEach((el)=>{
//         const arr=el.split(' and ');
//         let key = '';
//         for (let i=0; i<3; i++){
//             if(arr[i] !=='-') key +=arr[i];
//         }
//         const [food,num] = arr[3].split(' ');
//         if(food !=='-') key +=food;
//         result.push(bs(scoreMap.get(key),num))
//     })
//     return result
// }
