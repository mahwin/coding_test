from sys import stdin

num = stdin.readline().rstrip()


def solution(num):
    length =len(num)
    N = int(num)
    init = 0
    if N >20:
      init = N -length*9
    
    for i in range(init,N):
        nums= list(map(int,str(i)))
        if  N == i+sum(nums):
            return i
    return 0


solution(num)




