import sys

N = sys.stdin.readline().rstrip()

def solution(num):
  if num[0]=='0': return '0'
  dp =[1,1]
  mod =1000000
  length = len(num)
  for idx in range(1,length):
    cnt=0
    two_length_num = int(num[idx-1:idx+1])
    currentNum= int(num[idx])
    if currentNum > 0:
      cnt += dp[-1]
    if two_length_num >= 10 and two_length_num <= 26:
      cnt +=dp[-2]
    dp.append(cnt%mod)
  return dp[-1]
    
print(solution(N))