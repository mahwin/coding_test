from sys import stdin
# 규칙 앞에 dp[n] = [dp[n-1][1],dp[n-1][0]+dp[n-1][1]]

dp = [[1,0],[0,1],[1,1],[1,2],[2,3],[3,5]]
N = int(stdin.readline().rstrip())
nums = []
for _ in range(N):
    nums.append(int(stdin.readline().rstrip()))
max_num = max(nums)
if max_num<=5:
  for num in nums:
    print(' '.join(list(map(str,dp[num]))))
else :
  for i in range(6,max_num+1):
    dp.append([dp[i-1][1], sum(dp[i-1])])
  print(dp)
  for num in nums:
    print(' '.join(list(map(str,dp[num]))))




  






