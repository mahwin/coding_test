from sys import stdin
N = int(stdin.readline().rstrip())




data =[]
for _ in range(N):
    element= list(map(int,stdin.readline().rstrip().split()))
    data.append(element)

result = []
for people in range(N):
    cnt =1
    cur_hei,cur_wei = data[people]
    for hei,wei in data:
        if cur_hei <hei and cur_wei <wei:
            cnt+=1  
    result.append(cnt)


print(' '.join(map(str,result)))