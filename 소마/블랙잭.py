from sys import stdin

[N,M] = list(map(int,stdin.readline().rstrip().split(' ')))
cards = list(map(int,stdin.readline().rstrip().split(' ')))
result = 0

for i in range(0,N-2):
  for j in range(i+1,N-1):
    for k in range(j+1, N):
      
      res = cards[i]+cards[j]+cards[k]
      
      if res <=M:
      
        result = max([result,res])
print(result)