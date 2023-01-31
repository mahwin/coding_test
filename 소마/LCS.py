from sys import stdin
word_one=stdin.readline().rstrip()
word_two=stdin.readline().rstrip()
word_one_length = len(word_one)
word_two_length = len(word_two)
dp = [[0 for _ in range(word_one_length+1) ] for _ in range(word_two_length+1)]


for j in range(1,word_two_length+1):
  for i in range(1,word_one_length+1):
    if word_one[i-1] == word_two[j-1]:
      dp[j][i] =dp[j-1][i-1]+1
    else:
      dp[j][i] = max(dp[j-1][i] , dp[j][i-1])

print(dp[word_two_length][word_one_length])