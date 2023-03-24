/* 
일반적으로 this의 값은 함수를 호출하는 방법에 의해 결정된다.
함수가 호출될 때 마다 다를 수 있음!!
*/

let someone = {
  name: "유석",
  whoAmI: function () {
    console.log(this.name);
  },
};

let myWhoAmI = someone.whoAmI;

someone.whoAmI(); // 유석                                  => someone이 호출했음
myWhoAmI(); //  undefined , 브라우저였으면 window 객체   => window가 호출했음

let btn = document.getElementById("btn");
btn.addEventListener("click", someone.whoAmI); // => btn
btn.addEventListener("click", myWhoAmI); // => btn

// 결국 핵심은 호출한 놈(객체)가 this이다.

/// this를 누가 호출하냐에 관계없이 고정하는 메서드는 bind!!

let bindMyWhoAmI = myWhoAmI.bind(someone); // 이제 어떻게 호출하든 this가 someone을 가르키게 됨.
btn.addEventListener("click", bindMyWhoAmI.whoAmI); // => 유석

// ----------------------------------------------------------------------------------------------------------------

// 특징 1. this는 어디서든 존재한다.

function foo() {
  console.log(this); // window를 가르킴.
}

// 특징 2. 함수안의 thi는 어떻게 호출하냐에 따라 this가 다름

const obj = {
  list: [1, 2, 3],
  foo,
};

obj.foo(); // 지금 this는 obj임.

const obj2 = {
  liet: [4, 5, 6],
};

//자바스크립트는 함수 뒤에 점을 붙이는 식으로 함수 그 자체를 객체처럼 다룰 수 있다.
foo.call(obj2); // this를 지정하는 방법.

// 특징 3. 화살표 함수안의 this는 선언될 때 결정됨.

const foo1 = {
  list: ["a", "b"],
  getList() {
    setTimeout(function () {
      console.log(this.list);
    }, 2000);
    return this;
  },
};

foo1.getList(); // undefined임 왜 ['a','b']가 아니냐면 지금 this가 윈도우를 가르침.
// 비동기 함수의 특징임.
// 해결하기 위해서 arrow fn을 사용하기.

const foo2 = {
  list: ["a", "b"],
  getList() {
    setTimeout(() => {
      console.log(this.list);
    }, 2000);
    return this;
  },
};

foo2.getList(); // ['a','b']
// arrow fn은 this가 선언된 시점의 어떠한 환경을 가르킴.

// 특징 1. this는 어디서든 존재한다.
// 특징 2. 함수안의 thi는 어떻게 호출하냐에 따라 this가 다름
// 특징 3. 화살표 함수안의 this는 선언될 때 결정됨.
// 특징 4. 모르겠다. 디버깅으로 해결하자.
