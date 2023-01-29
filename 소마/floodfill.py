class Solution:
    def floodFill(self,image, sr, sc,color):
        print(image)
        
        self.ROW_LENGTH = len(image)
        self.COL_LENGTH = len(image[0])

        dirs = [[0,1],[1,0],[-1,0],[0,-1]]
        queue = [[sr,sc]]
        oldColor,image[sr][sc]  = image[sr][sc] ,color

        while len(queue) >0:
          [r,c] =queue.pop(-1)
          print(r,c)
          for dir in dirs:
            nr = r +dir[0]
            nc = c +dir[1]
            if self.isValid(self,nr,nc) and oldColor == image[nr][nc]:
                image[nr][nc] = color  
                queue.append([nr,nc])
          print(image)
    
    def isValid(self,r,c):
        if r<0 or c<0 or r>=self.ROW_LENGTH or c >=self.COL_LENGTH :
            return False
        return True








# Solution.floodFill(Solution,image=[[1,1,1],[1,1,0],[1,0,1]],sr=1,sc=1,color=2)






