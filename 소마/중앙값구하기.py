from sys import stdin
import math
import heapq 

def solution (data):
    minHeap = []
    maxHeap = []
    middle = data[0]
    result = [data[0]]
    
    for i,current in enumerate(data[1:],1):
        if current > middle:
            heapq.heappush(minHeap,current)
            
        else:
            heapq.heappush(maxHeap, (-current,current))

        if i % 2 ==0:
            if len(minHeap) > len(maxHeap):
                  heapq.heappush(maxHeap, (-middle,middle))
                  middle = heapq.heappop(minHeap)
            elif len(maxHeap) > len (minHeap):
                  heapq.heappush(minHeap,middle)
                  middle = heapq.heappop(maxHeap)[1]

            result.append(middle)
    print(len(result)) #길이
    cnt = math.ceil(len(result)/10)
    for j in range(cnt):
      print(' '.join(map(str,result[j*10:j*10+10])))
      
    

t = int(stdin.readline().rstrip())

for i in range(t):
    m = int(stdin.readline().rstrip())
    data = []
    if(m%10==0):
        for _ in range(m/10):
            data.extend(list(map(int,stdin.readline().rstrip().split(' '))))
    else :
        
        for _ in range(m//10 +1):
            data.extend(list(map(int,stdin.readline().rstrip().split(' '))))
    solution(data)


