import heapq

def solution(jobs):
    answer = 0
    time = 0    
    heap = []
    pointer = 0
    
    jobs.sort(key=lambda x: x[0])
    
    while pointer != len(jobs) or len(heap) != 0:

        while pointer < len(jobs) and jobs[pointer][0] <= time:
            start,duration = jobs[pointer]
            heapq.heappush(heap, (duration,start))
            pointer+=1
        if len(heap) == 0:
            start,duration = jobs[pointer]
            time = start
            heapq.heappush(heap, (duration,start))
            pointer+=1
        else:        
            duration,start = heapq.heappop(heap)
            time += duration
            answer += time - start
    return int(answer/len(jobs))