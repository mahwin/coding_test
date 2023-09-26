// ```
// Todo
// 플러스 마이너스 상태를 store로 관리하고
// 클릭 이벤트가 발생하면 store 값을 변경한다.
// 플러스 마이너스 상태에 변경이 있으면 구독된 함수가 자동으로 실행되도록 한다.
// 구독된 함수는 +,-를 toggle하는 녀석과 카테고리 패널을 변경하는 녀석
// ```;

// 얘가 상태 값을 저장하고 상태 값마다 변경사항이 있을때 호출되는 함수와 연결한다.
class Store {
  #state;
  constructor(state) {
    this.#state = state;
    this.fns = new Set();
    const keys = Object.keys(state);
    keys.forEach((key) => {
      Object.defineProperty(this, key, {
        get: () => {
          return this.#state[key];
        },
        set: (newState) => {
          this.#state[key] = newState;
          // key와 관련된 state가 변경이 있으면 연결되어 있는 함수를 호출
          // fn
          this.notify();
        },
      });
    });
  }

  subscribe(fn) {
    this.fns.add(fn);
  }

  notify() {
    // 등록도 실행
    [...this.fns].forEach((f) => f());
  }
}

export default Store;
