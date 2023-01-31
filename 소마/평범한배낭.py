from sys import stdin
[N,MAX_WEIGHT] = list(map(int,stdin.readline().rstrip().split(' ')))
dp  = [[0 for _ in range(MAX_WEIGHT+1)] for _ in range(N+1)]

w_v_info =[[0,0]]
for _ in range(N):
  w_v_info.append(list(map(int,stdin.readline().rstrip().split(' '))))


for i in range(1,N+1):
  for j in range(1,MAX_WEIGHT+1):
    w = w_v_info[i][0]
    v = w_v_info[i][1]

    if j < w :
      dp[i][j] = dp[i-1][j]
    else :
      dp[i][j] = max(v + dp[i-1][j-w],dp[i-1][j])

print(dp[N][MAX_WEIGHT])