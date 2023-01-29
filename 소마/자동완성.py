def solution (words):
    answer =0;

    words.sort()
    for idx,word in enumerate(words):
        cnt =1

        if idx > 0: # 뒤에 비교
              for i,char in enumerate(word):
                cnt =max(cnt, i+1)
                if len(words[idx-1])==i or char != words[idx-1][i] : break
        print(idx)
        if idx+1 < len(words): # 앞에 비교
            for i,char in enumerate(word):
                cnt =max(cnt, i+1)
                
                if len(words[idx+1])==i or char != words[idx+1][i] : break
        answer+=cnt
    return answer

print(solution(["word","war","warrior","world"]))