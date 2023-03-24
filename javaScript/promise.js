// Synchronous vs Asynchronous
// 병렬적으로 실행되는 것을 비동기적이다라고 함.
// fetch api => promise 사용
import fetch from "fetch";

const url = "https://jsonplaceholder.typicode.com/posts";

// npm install node-fetch
// import fetch from 'node-fetch'
fetch(url)
  //promise chain 방식 더 일반적인 방식.
  .then((res) => res.json()) // res는 Response객체가 들어옴. res.json()도 프라미스 임. 그래서 then을 한 번 더 사용 가능.
  .then((data) => console.log(data))
  .catch((reason) => console.log("error", reason));

// promise nested 방식
// .then(function(response){
//   response.json().then(function(data){console.log(data)})
// })

// then => 프로미스임.
// fecth는 web api임.
// fecth는 프로미스를 리턴함. 성공적으로 통신했을 경우 Response object가 옴.
// .then() , .catch() 두 개의 메소드를 사용할 수 있음. 둘 다 콜백함수를 인자로 받는다.
// fetch api의 결과가 성공했을 떄 .then이 실행, catch는 실패했을 떄.

// new Promise

function job1() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("job1 ok!");
    }, 2000);
  });
}

function job2() {
  return new Promise(function (resolve, reject) {
    setTimeout(function () {
      resolve("job2 ok!");
    }, 2000);
  });
}
//중첩 방식
job1().then(function (data) {
  console.log(data);
  job2().then(function (data) {
    console.log(data);
  });
});

//체이닝 방식.
job1()
  .then(function (data) {
    console.log(data);
    return job2();
  })
  .catch(function (reason) {
    console.log(reason);
    //뒤에 then이 실행되지않게 하려고.
    return Promise.reject();
  })
  .then(function (data) {
    console.log(data);
  });
