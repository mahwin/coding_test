from collections import deque

def solution(rc, operations):
    R,C = len(rc), len(rc[0])
    
    left,right,middle = deque(), deque(), deque()
    
    for r in range(R):
        left.append(rc[r][0])
        right.append(rc[r][-1])
        middle.append(deque(rc[r][1:C-1]))
        
    
    for operation in operations:
        if operation == 'ShiftRow':
            left.appendleft(left.pop())
            right.appendleft(right.pop())
            middle.appendleft(middle.pop())
        elif C >= 3:
            middle_top = middle.popleft()
            middle_bottom = middle.pop()                   
            right.appendleft(middle_top.pop())
            middle_bottom.append(right.pop())
            left.append(middle_bottom.popleft())
            middle_top.appendleft(left.popleft())
            middle.appendleft(middle_top)
            middle.append(middle_bottom)
        else :
            right.appendleft(left.popleft())
            left.append(right.pop())
            
    for r in range(R):
        rc[r] = [left.popleft(), *list(middle.popleft()), right.popleft()]
    return rc