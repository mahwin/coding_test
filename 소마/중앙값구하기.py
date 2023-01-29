from heapq import heappush,heappop
input = '''3
9
1 2 3 4 5 6 7 8 9
9
9 8 7 6 5 4 3 2 1
23
23 41 13 22 -3 24 -31 -11 -8 -7 3 5 103 211 -311 -45 -67 -73 -81 -99 -33 24 56'''

def solution(data):
    minHeap = []
    maxHeap = []
    middle = data[0]
    result = [middle]
    

    for idx,val in enumerate(data[1:],1):
        if middle < val:
          heappush(minHeap,val) 
        else:
          heappush(maxHeap,(-val,val))

        if idx%2 == 0:
            
            if len(maxHeap) > len(minHeap):
                heappush(minHeap, middle)
                middle = heappop(maxHeap)[1]
                
            
            elif len(maxHeap) < len(minHeap):
                heappush(maxHeap, (-middle,middle))
                middle = heappop(minHeap)
                
            result.append(middle)
    print(len(result))
    length = round(len(result) / 10)
    for i in range(0,length+1):
      print(' '.join(map(str,result[i*10:i*10+10])))


    


input = input.split('\n')
trials = round((len(input)-1)/2)
for trial in range(1,trials+1):
  data = list(map(int,input[trial*2].split()))
  solution(data)
