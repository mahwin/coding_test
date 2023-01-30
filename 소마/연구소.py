from sys import stdin
import copy
from collections import deque

global dirs ,board,row_len,col_len

dirs = [[0,1],[1,0],[-1,0],[0,-1]]
[row_len,col_len] = list(map(int,stdin.readline().rstrip().split(' ')))

def bfs (virus_pos, add_puild):
    copy_board = copy.deepcopy(board)
    
    for row,col in add_puild:
        copy_board[row][col] =1
    
    for virus_row,virus_col in virus_pos:
        queue = deque()
        queue.append([virus_row,virus_col])
        while len(queue) > 0:
          [r,c] = queue.popleft()
          for dir in dirs:
            nr =  r+dir[0]
            nc =  c+dir[1]
            if is_valid(nr,nc) and copy_board[nr][nc]==0:
              copy_board[nr][nc] =2
              queue.append([nr,nc])
    return cnt_zero(copy_board)

def is_valid (r,c):
  if r <0 or c <0 or r >= row_len or c >= col_len:
    return False
  return True

def cnt_zero (board):
    cnt =0
    for row in range(row_len):
      for col in range(col_len):
        if board[row][col]==0:
          cnt+=1
    return cnt





board =[]

for row in range(row_len):
  board.append(list(map(int,stdin.readline().rstrip().split(' '))))

virus_pos = []
can_build = []
for row in range(row_len):
  for col in range(col_len):
    if board[row][col] == 2:
        virus_pos.append([row,col])
    elif board[row][col] == 0:
        can_build.append([row,col])

result = 0
can_build_length = len(can_build)
for i in range(0,can_build_length-2):
    for j in range(i+1,can_build_length-1):
        for k in range(j+1,can_build_length):
            tmp = bfs(virus_pos, [can_build[i],can_build[j],can_build[k]])  
            result = max(tmp,result)

print(result)          

