# 전형적인 knapsack 이차원 dp 배열을 만들어서 해결한다
# 시간 복잡도 O(N * Weight )
# 공간 복잡도 O(N * Weight )인데 O(Weight)로 줄일 수 있긴함.

from sys import stdin

N,W = map(int,stdin.readline().rstrip().split())
bags=[0]
vals=[0]

for _ in range(N):
  b,v =map(int,stdin.readline().rstrip().split())
  bags.append(b)
  vals.append(v)


dp =[[0 for _ in range(W+1)] for _ in range(N+1)]

for n in range(N+1):
  for w in range(W+1):
    
    if w-bags[n] >=0:
      dp[n][w] = max(dp[n-1][w-bags[n]] + vals[n], dp[n-1][w])
    else:
      dp[n][w] = dp[n-1][w]

print(dp[N][W])