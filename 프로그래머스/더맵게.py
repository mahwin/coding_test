import heapq

def solution(scoville, K):
    heap = []
    he = []
    heapq.heappush(he,1)
    heapq.heappush(he,1)
    heapq.heappop(he)
    heapq.heappop(he)
    for sco in scoville:
        heapq.heappush(heap,sco)
    step = 0
    while heap[0] < K:
        try :
            min_scovile = heapq.heappop(heap)
            next_min_scovile = heapq.heappop(heap)
            new_scovile = next_min_scovile * 2 + min_scovile
            heapq.heappush(heap, new_scovile)        
            step+=1
        except :
            return -1
    return step