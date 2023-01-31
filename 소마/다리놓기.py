from sys import stdin
global dp
dp =[1,1,2]

def factorial (num):
  global dp
  for i in range(3,num+1):
    dp.append(dp[i-1]*i)


N = int(stdin.readline().rstrip())
nums=[]
MAX_NUM =0
for _ in range(N):
  nums.append(list(map(int, stdin.readline().rstrip().split())))
  MAX_NUM = max(nums[-1][1],MAX_NUM)

print(MAX_NUM)
factorial(MAX_NUM)
  
for n,m in nums:
  print(int(dp[m]/(dp[n]*dp[m-n])))
