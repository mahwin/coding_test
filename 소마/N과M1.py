
[N,M] = [4,2]

from itertools import permutations
# [N,M] = map(int, input().split())

arr = list(range(1,N+1))

result = []
for i in permutations(arr,M):
    result.append(" ".join(map(str,i)))

for n in result:
  print(n,sep='\n')
