let input = `5 6
1
5 1 1
1 2 2
1 3 3
2 3 4
2 4 5
3 4 6`.split("\n");

class MinHeap {
  heapArray = [];
  constructor() {
    this.heapArray.push(null);
  }
  size() {
    return this.heapArray.length - 1;
  }

  push(data) {
    if (this.heapArray === null) {
      this.heapArray = [];
      this.heapArray.push(null);
      this.heapArray.push(data);
    } else {
      this.heapArray.push(data);
      let inserted_idx = this.heapArray.length - 1;
      let parent_idx = parseInt(inserted_idx / 2);
      while (inserted_idx > 1) {
        if (this.heapArray[inserted_idx][1] < this.heapArray[parent_idx][1]) {
          const tmp = this.heapArray[inserted_idx];
          this.heapArray[inserted_idx] = this.heapArray[parent_idx];
          this.heapArray[parent_idx] = tmp;
          inserted_idx = parent_idx;
          parent_idx = parseInt(parent_idx / 2);
        } else {
          break;
        }
      }
    }
  }
  move_down(pop_idx) {
    const left_child = pop_idx * 2;
    const right_child = pop_idx * 2 + 1;

    if (left_child >= this.heapArray.length) {
      return false;
    } else if (right_child >= this.heapArray.length) {
      if (this.heapArray[pop_idx][1] > this.heapArray[left_child][1]) {
        return true;
      }
      return false;
    } else {
      if (this.heapArray[left_child][1] < this.heapArray[right_child][1]) {
        if (this.heapArray[pop_idx][1] > this.heapArray[left_child][1]) {
          return true;
        }
        return false;
      } else {
        if (this.heapArray[pop_idx][1] > this.heapArray[right_child][1]) {
          return true;
        }
        return false;
      }
    }
  }

  pop() {
    if (this.heapArray === null) {
      return null;
    } else {
      const return_data = this.heapArray[1];
      this.heapArray[1] = this.heapArray[this.heapArray.length - 1];
      this.heapArray.pop();
      let popped_idx = 1;
      while (this.move_down(popped_idx)) {
        const left_child = popped_idx * 2;
        const right_child = popped_idx * 2 + 1;
        if (right_child >= this.heapArray.length) {
          if (this.heapArray[popped_idx][1] > this.heapArray[left_child][1]) {
            const tmp = this.heapArray[popped_idx];
            this.heapArray[popped_idx] = this.heapArray[left_child];
            this.heapArray[left_child] = tmp;
            popped_idx = left_child;
          }
        } else {
          if (this.heapArray[left_child][1] < this.heapArray[right_child][1]) {
            if (this.heapArray[popped_idx][1] > this.heapArray[left_child][1]) {
              const tmp = this.heapArray[popped_idx];
              this.heapArray[popped_idx] = this.heapArray[left_child];
              this.heapArray[left_child] = tmp;
              popped_idx = left_child;
            }
          } else {
            if (
              this.heapArray[popped_idx][1] > this.heapArray[right_child][1]
            ) {
              const tmp = this.heapArray[popped_idx];
              this.heapArray[popped_idx] = this.heapArray[right_child];
              this.heapArray[right_child] = tmp;
              popped_idx = right_child;
            }
          }
        }
      }
      return return_data;
    }
  }
}

const solution = () => {
  const [V, E] = input.shift().split(" ").map(Number);
  const startNode = +input.shift();
  const d = Array.from({ length: V + 1 }, () => Infinity);
  d[startNode] = 0;
  const graph = {};
  for (let i = 0; i < E; i++) {
    const [from, to, cost] = input[i].split(" ").map(Number);
    if (graph[from]) {
      graph[from].push([to, cost]);
    } else {
      graph[from] = [[to, cost]];
    }
  }

  const pq = new MinHeap();
  pq.push([startNode, 0]);

  while (pq.size()) {
    const [node, accCost] = pq.pop();

    if (accCost > d[node]) continue;
    if (!graph[node]) continue;

    for (const [nextNode, nextCost] of graph[node]) {
      const sumCost = nextCost + accCost;
      if (sumCost < d[nextNode]) {
        d[nextNode] = sumCost;
        pq.push([nextNode, sumCost]);
      }
    }
  }
  d.shift();
  console.log(
    d
      .map((el) => {
        if (el === Infinity) return "INF";
        else return el;
      })
      .join("\n")
  );
};

solution();
