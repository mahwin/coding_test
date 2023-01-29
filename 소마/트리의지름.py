import sys

N = int(sys.stdin.readline().rstrip())
sys.setrecursionlimit(10**9)
graph = [[] for _ in range(N+1)]

for i in range(N):
  input = list(map(int,sys.stdin.readline().rstrip().split(' ')))
  length = len(input)//2-1
  
  for i in range(length):
      idx = 2*i+1
      graph[input[0]].append([input[idx],input[idx+1]])
    
distance = [-1 for _ in range(N+1)]
print(distance)
def dfs (node,w):
    for nextNode,nextWeight in graph[node]:
        if distance[nextNode]==-1:
            distance[nextNode] = nextWeight+w
            dfs(nextNode,nextWeight+w)

distance[1] = 0  
dfs(1,0)
startNode= distance.index(max(distance))
distance = [-1 for _ in range(N+1)]
distance[startNode] = 0  
dfs(startNode,0)

print(max(distance))






