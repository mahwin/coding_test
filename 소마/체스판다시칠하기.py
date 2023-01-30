from sys import stdin

[row_length,col_length ] = list(map(int,stdin.readline().rstrip().split()))
board =[]

for _ in range(row_length):
    board.append(list(stdin.readline().rstrip()))

def paint (row_init,col_init):
    # print(board)
    result = 32
    print(row_init,col_init)
    for patten in [['W','B'],['B','W']]:
      cnt = 0
      for row in range(8): 
          for col in range(8):
              nr = row_init+row  
              nc = col_init+col
              idx = (nr+nc) % 2
              if patten[idx] != board[nr][nc]: cnt+=1
      print(row_init,col_init,cnt)
      result = min(result,cnt)
    return result

result = 32
for row_init in range(0, row_length-7):
    for col_init in range(0, col_length-7):
        tmp = paint(row_init,col_init)
        result = min(result,tmp)
print(result)

