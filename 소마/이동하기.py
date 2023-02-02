from sys import stdin

R,C=map(int,stdin.readline().rstrip().split())
dp = [[0 for _ in range(C+1)] for _ in range(R+1)]
candy =[]
for _ in range(R):
  candy.append(list(map(int,stdin.readline().rstrip().split())))  


for r in range(1,R+1):
  for c in range(1,C+1):
    dp[r][c] = candy[r-1][c-1] + max(dp[r-1][c],dp[r][c-1],dp[r-1][c-1])

print(dp[R][C])