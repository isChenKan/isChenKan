---
date: 2018-04-21
tags: 其它
author: 葵花养殖技术人员
location: Chengdu
---

# Git命令大全
> 这里是平时自己记录的一些常用的git命令

`git pull`强制覆盖本地文件：
```bash
git fetch —all
git reset —hard origin/master
git pull
```

撤回上一次`git pull origin`：
```bash
git reflog (查看合并历史)
git reset —hard 1b50574 (版本号)
```

强行覆盖：
```bash
git push origin master --force
```

比较最近两次提交的差异：
```bash
git log -p -2 
```

查看提交的简略信息：
```bash
git log —stat :
git log —pretty=format
%an(author)；%cn(commiter); %ce(email); %cd(date); %s(msg)
```

创建文件并写入内容：
```bash
echo ‘write something’ > test.txt
```

取消暂存：
```bash
git reset HEAD <file>
```

取消修改：
```bash
git checkout — <file>
```

初始化本地git仓库：
```bash
git init 
```

查看远程分支：
```bash
git remote 
```

关联远程git仓库：
```bash
git remote add <name> <url>
```

查看远程分支：
```bash
git branch -a 
```

删除远程分支：
```bash
git push origin —delete <branchName>
```

删除本地分支（-D强制删除未合并的分支）：
```bash
git branch -d <branchName>
```

查看分支的最后一次提交：
```bash
git branch -v
```

查看已经合并（未合并）的分支：
```bash
git branch —merged (—no-merged)
```

撤销对文件的更改：
```bash
git checkout — <file>
```