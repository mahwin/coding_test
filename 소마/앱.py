from sys import stdin
N,M=map(int,stdin.readline().split())
memos = list(map(int, stdin.readline().rstrip().split()))
costs = list(map(int, stdin.readline().rstrip().split()))
memos.insert(0,0)
costs.insert(0,0)


result = sum(costs)

dp =[[0 for _ in range(M+1)] for _ in range(N+1)]

for n in range(1,N+1):
  for m in range(1,M+1):
    if m >=costs[n]:
      dp[n][m] = max(dp[n-1][m-costs[n]]+memos[n],dp[n-1][m])
    else :
      dp[n][m] = dp[n-1][m]
    if dp[n][m] >= M:
      result = min(result,m)



print(result)

