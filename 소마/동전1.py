from sys import stdin

N,target = map(int,stdin.readline().rstrip().split(' '))
dp = [0]*(target+1)

coins = []
for _ in range(N):
  coin = int(stdin.readline().rstrip())
  coins.append(coin)

dp[0]=1

for coin in coins:
  for j in range(coin,target+1):
    if j-coin >=0:
      dp[j] += dp[j-coin]

print(dp[target])