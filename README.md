# git 解决分支
场景:
  主分支有修改 
  本地分支有修改 

1. 在当前分支上进行 git stash  将修改先隐藏
2. git checkout main  回到主分支
3. git pull  拉取主分支上最新代码
4. git checkout <your branch name>  回到自己的分支
5. git merge main 将主分支的代码merge到自己的分支
6. git stash pop  释放之前修改的内容
7. 手动解决冲突 (删代码....)
8. git add .
9. git commit ...
10. git push
