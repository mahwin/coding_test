num = int(input())

def check (num):
    if str(num).find('666') != -1:
      return True
    else:
      return False
    

number = 666
cnt =1
while True:
    if cnt == num: break
    number+=1
    if check(number):
        cnt+=1


print(number)