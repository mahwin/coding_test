from sys import stdin

N,M = map(int,stdin.readline().rstrip().split())

board = [[0]* (N+1)]
for _ in range(N):
  tmp = list(map(int,stdin.readline().rstrip().split()))  
  tmp.insert(0,0)
  board.append(tmp)

tests = [list(map(int,stdin.readline().rstrip().split())) for _ in range(M)]

dp =[[0]*(N+1) for _ in range(N+1)]


for i in range(1,N+1):
  acc =0
  for j in range(1,N+1):
    acc += board[i][j]
    dp[i][j] = dp[i-1][j] + acc
  

for test in tests:
  [r1,c1,r2,c2] = test
  print(dp[r2][c2]-dp[r1-1][c2]-dp[r2][c1-1]+dp[r1-1][c1-1])
  