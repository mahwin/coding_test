from sys import stdin,setrecursionlimit

setrecursionlimit(10**9)


M,N=map(int,stdin.readline().rstrip().split())

board = [list(map(int, stdin.readline().split())) for _ in range(M)]
dp = [[-1 for _ in range(N)] for _ in range(M)]


def is_valid(row,col):
  if row<0 or col<0 or row>=M or col >=N: return False
  return True

dirs = [[0,1],[1,0],[-1,0],[0,-1]]

def dfs(row,col):
  if row ==M-1 and col == N-1:
    return 1
  
  
  if dp[row][col] ==-1:
    pre_value = board[row][col]
    dp[row][col] =0
    for dir in dirs:
      nr = row+dir[0]
      nc = col+dir[1]
      if is_valid(nr,nc) and pre_value > board[nr][nc]:
        print(row,col)
        dp[row][col] += dfs(nr,nc)
  return dp[row][col]

print(dfs(0, 0))
    



