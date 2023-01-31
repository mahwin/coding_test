from sys import stdin

N = int(stdin.readline().rstrip())

data = []
for _ in range(N):
  data.append(list(map(int,stdin.readline().rstrip().split())))

data = sorted(data, key=lambda a :a[0])

dp =[1]*N

for i in range(N):
  for j in range(N):
    if data[i][1] > data[j][1]:
      dp[i] = max(dp[i], dp[j]+1)





print(N -max(dp))
