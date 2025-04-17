# GIT

-------
## 新建：创建一个新的 git 版本库。这个版本库的配置、存储等信息会被保存到git 文件夹中
**初始化当前项目**
```gitignore
$ git init
```

**新建一个目录，将其初始化为Git代码库( 只含工作目录和 .git 文件 )**
```gitignore
$ git init [project-name]
```

**创建一个裸仓库，其中只含 .git 文件中的元数据**
```gitignore
$ git init --bare <directory>
```

**下载一个项目和它的整个代码历史**
```gitignore
$ git clone [url]
```

## 配置：更改设置。可以是版本库的设置，也可以是系统的或全局的

**显示当前的Git配置**
```gitignore
$ git config --list
```

**编辑Git配置文件**
```gitignore
# 编辑全局的
$ git config -e --global
# 编辑当前仓库的
$ git config -e
```

**输出、设置基本的全局变量**
```gitignore
# 输出账户邮箱和名称
$ git config --global user.email
$ git config --global user.name
# 修改账户邮箱和名称
$ git config --global user.email 'MyEmail@gmail.com'
$ git config --global user.name 'martea'
```

**为Git命令创建一个快捷方式（别名）**
```gitignore
$ git config --global alias.<alias.name> <git-command>
# git config --global alias.gl "log --graph --oneline --decorate --all"
# 在任何 Git 仓库中运行 git gl 时，它实际上会执行 git log --graph --oneline --decorate --all 命令。
```

**定义当前用户所有提交使用的作者邮箱。**
```gitignore
$ git config --system core.editor < editor >
```

## 状态：显示索引文件（也就是当前工作空间）和当前的头指针指向的提交的不同

**显示分支，未跟踪文件，更改和其他不同**
```gitignore
$ git status
```

**查看其他的git status的用法**
```gitignore
# 跳转页面查看帮助文档
$ git help status
```

## 信息：获取某些文件，某些分支，某次提交等 git 信息

**显示commit历史，以及每次commit发生变更的文件**
```gitignore
$ git log --stat
# 只显示历史记录
$ git log
```

**搜索提交历史，根据关键词( 关键字通过更改内容进行搜索 )**
```gitignore
$ git log -S [keyword]
```

**显示从 tag 标签到当前分支最新 commit 之间的所有变动，每个commit占据一行**
```gitignore
# tag 由 git tag 获取
$ git log [tag] HEAD --pretty=format:%s
```

**显示某个commit之后的所有变动，其"提交说明"必须符合搜索条件**
```gitignore
# feature 为搜索条件
$ git log [tag] HEAD --grep feature
```

**显示某个文件的版本历史，包括文件改名**
```gitignore
$ git log --follow [file]
$ git whatchanged [file]
```

**显示指定文件相关的每一次diff**
```gitignore
$ git log -p [file]
```

**显示过去5次提交**
```gitignore
$ git log -5 --pretty --online
```

**显示所有提交过的用户，按提交次数排序**
```gitignore
$ git shortlog -sn
```

**显示指定文件是什么人在什么时间修改过**
```gitignore
$ git blame [file]
```

**显示暂存区和工作区的差异**
```gitignore
$ git diff
```

**显示暂存区和上一个commit的差异**
```gitignore
$ git diff --cached [file]
```

**显示工作区与当前分支最新commit之间的差异**
```gitignore
$ git diff HEAD
```

**比较两个分支之间的差异**
```gitignore
$ git diff [first-branch]...[second-branch]
```

**显示今天你写了多少行代码**
```gitignore
$ git diff --shortstat "@{0 day ago}"
```

**比较暂存区和版本库差异**
```gitignore
$ git diff --staged
```

**比较暂存区和版本库差异**
```gitignore
$ git diff --cached
```

**仅仅比较统计信息**
```gitignore
$ git diff --stat
```

**显示某次提交的元数据和内容变化**
```gitignore
# commit 哈希值
$ git show [commit]
```

**显示某次提交发生变化的文件**
```gitignore
$ git show --name-only [commit]
```

**显示某次提交时，某个文件的内容**
```gitignore
# filenmae 相对于仓库的根目录
$ git show [commit]:[filename]
```

**显示当前分支的最近几次提交**
```gitignore
$ git reflog
```

**查看远程分支**
```gitignore
$ git branch -r
```

**查看本地分支**
```gitignore
$ git branch
```

**创建新的分支( 本地 )**
```gitignore
$ git branch [new_branch]
```

**查看各个分支最后提交信息**
```gitignore
$ git branch -v
```

**查看已经被合并到当前分支的分支**
```gitignore
$ git branch --merged
```

**查看尚未被合并到当前分支的分支**
```gitignore
$ git branch --no-merged
```

## 添加：添加文件到当前工作空间中。如果你不使用 git add 将文件添加进去，那么这些文件也不会添加到之后的提交之中

**添加一个文件**
```gitignore
git add [file]
```

**添加一个子目录中的文件**
```gitignore
$ git add /path/to/file/test.js
```

**支持正则表达式**
```gitignore
$ git add ./*.js
```

**添加指定文件到暂存区**
```gitignore
$ git add [file1] [file2] ...
```

**添加指定目录到暂存区，包括子目录**
```gitignore
$ git add [dir]
```

**添加当前目录的所有文件到暂存区**
```gitignore
$ git add .
```

```gitignore
$ git reset 取消添加的
```



```gitignore
#添加每个变化前，都会要求确认
#对于同一个文件的多处变化，可以实现分次提交
$ git add -p
```

## 删除：rm 和上面的 add 命令相反，从工作空间中去掉某个文件
**移除 HelloWorld.js**
```gitignore
$ git rm HelloWorld.js
```

**移除子目录中的文件**
```gitignore
$ git rm /pather/to/the/file/HelloWorld.js
```

**删除工作区文件，并且将这次删除放入暂存区**
```gitignore
$ git rm [file1] [file2] ...
```

**停止追踪指定文件，但该文件会保留在工作区**
```gitignore
$ git rm --cached [file]
```

## 分支：管理分支，可以通过下列命令对分支进行增删改查切换等

**查看所有的分支和远程分支**
```gitignore
$ git branch -a
```

**创建一个新的分支**
```gitignore
$ git branch [branch-name]
```
```gitignore
# 重命名分支
# git branch -m <旧名称> <新名称>
$ git branch -m [branch-name] [new-branch-name]
```

**编辑分支的介绍**
```gitignore
$ git branch [branch-name] --edit-description
```

**列出所有本地分支**
```gitignore
$ git branch
```

**新建一个分支，并切换到该分支**
```gitignore
$ git checkout -b [branch]
```

**新建一个分支，指向指定commit**
```gitignore
# commit 为哈希值
$ git branch [branch] [commit]
```

**新建一个分支，与指定的远程分支建立追踪关系**
```gitignore
$ git branch --track [branch] [remote-branch]
```

**切换到指定分支，并更新工作区**
```gitignore
$ git checkout [branch-name]
```

**切换到上一个分支**
```gitignore
$ git checkout -
```

**建立追踪关系，在现有分支与指定的远程分支之间**
```gitignore
git branch --set-upstream-to=[remote-branch] [branch]
```

**合并指定分支到当前分支**
```gitignore
$ git merge [branch]
```

**选择一个commit，合并进当前分支**
```gitignore
$ git cherry-pick [commit]
```

**删除分支**
```gitignore
$ git branch -d [branch-name]
```

**删除远程分支**
```gitignore
$ git push origin --delete [branch-name]
# 或者
$ git branch -dr [remote/branch]
```

**切换到某个分支**
```gitignore
$ git checkout < branch >
```

**创建新的分支，并且切换过去**
```gitignore
$ git checkout -b < new_branch >
```

**基于 branch 创建新的 new_branch**
```gitignore
$ git checkout -b < new_branch > < branch >
```


**强制删除某个分支 (未被合并的分支被删除的时候需要强制)**
```gitignore
$ git br -D [branch-name]
```

## 检出：将当前工作空间更新到索引所标识的或者某一特定的工作空间
**检出一个版本库，默认将更新到master分支**
```gitignore
$ git checkout
```

**切换到一个特定的分支**
```gitignore
$ git checkout branchName
```

**新建一个分支，并且切换过去，相当于"git branch <名字>; git checkout <名字>"**
```gitignore
$ git checkout -b [newBranch]
```

## 远程同步：远程同步的远端分支

**下载远程仓库的所有变动**
```gitignore
# remote 仓库地址
$ git fetch [remote]
```

**显示所有远程仓库**
```gitignore
$ git remote -v
```

**显示某个远程仓库的信息**
```gitignore
$ git remote show [remote]
```

**增加一个新的远程仓库，并命名**
```gitignore
$ git remote add [shortname] [url]
```

**添加远程仓库地址**
```gitignore
将一个本地 Git 仓库与远程仓库（例如 GitHub 上的仓库）关联起来的  
$ git remote add origin https://xxx/xxx.git
```

**设置远程仓库地址(用于修改远程仓库地址)**
```gitignore
$ git remote set-url origin https://xxx/xxx.git
```

**删除远程仓库**
```gitignore
$ git remote rm <repository>
```
```gitignore
# 上传本地指定分支到远程仓库
# 把本地的分支更新到远端origin的master分支上
# git push <远端> <分支>
# git push 相当于 git push origin master

$ git push [remote] [branch]
```

**强行推送当前分支到远程仓库，即使有冲突**
```gitignore
$ git push [remote] --force
```

**推送所有分支到远程仓库**
```gitignore
$ git push [remote] --all
```

**用于将本地分支的更改推送到远程仓库，并同时设置该本地分支与远程分支的跟踪关系**
```gitignore
$ git push --set-upstream origin [remote]
```

## 撤销：
**恢复暂存区的指定文件到工作区**
```gitignore
$ git checkout [file]
```

**恢复某个commit的指定文件到暂存区和工作区**
```gitignore
$ git checkout [commit] [file]
```

**恢复暂存区的所有文件到工作区**
```gitignore
$ git checkout .
```
**用于基于远程分支 origin/[remote] 创建并切换到一个新的本地分支 [remote]**
```gitignore
git checkout -b [remote] origin/[remote]
```

**重置暂存区的指定文件，与上一次 commit 保持一致，但工作区不变**
```gitignore
$ git reset [file]
```

**重置暂存区与工作区，与上一次commit保持一致**
```gitignore
$ git reset --hard
```

**重置当前分支的指针为指定commit，同时重置暂存区，但工作区不变**
```gitignore
$ git reset [commit]
```

重置当前分支的HEAD为指定commit，同时重置暂存区和工作区，与指定commit一致
```gitignore
$ git reset --hard [commit]
# 恢复先 git reflog 再 git reset --hard
```

重置当前HEAD为指定commit，但保持暂存区和工作区不变
```gitignore
$ git reset --keep [commit]
```

```gitignore
# 新建一个commit，用来撤销指定commit
# 后者的所有变化都将被前者抵消，并且应用到当前分支
$ git revert [commit]
```

**恢复最后一次提交的状态**
```gitignore
$ git revert HEAD
```

git revert  是生成一个新的提交来撤销某次提交，此次提交之前的commit都会被保留

git reset  是回到某次提交，提交及之前的commit都会被保留，但是此次之后的修改都会被退回到暂存区

**暂时将未提交的变化移除，稍后再移入**
```gitignore
$ git stash
# 会删除暂存区的记录
$ git stash pop
```

**列所有stash**
```gitignore
$ git stash list
```

**恢复暂存的内容**
```gitignore
$ git stash apply stash@{num}
```

**删除暂存区( 最近一条 )**
```gitignore
$ git stash drop
# 制定删除暂存区的某一条
$ git stash drop stash@{num}
```

## 提交：commit 将当前索引的更改保存为一个新的提交，这个提交包括用户做出的更改与信息

**提交暂存区到仓库区附带提交信息**
```gitignore
$ git commit -m [message]
```

**提交暂存区的指定文件到仓库区**
```gitignore
$ git commit [file1] [file2] ... -m [message]
```

**提交工作区自上次 commit 之后的变化，直接到仓库区**
```gitignore
$ git commit -a
```

**提交时显示所有diff信息**
```gitignore
$ git commit -v
```

```gitignore
# 使用一次新的commit，替代上一次提交
# 如果代码没有任何新变化，则用来改写上一次commit的提交信息
$ git commit --amend -m [message]
```

**重做上一次commit，并包括指定文件的新变化**
```gitignore
$ git commit --amend [file1] [file2] ...
```

## log: 显示这个版本库的所有提交

**显示某几条提交信息**
```gitignore
$ git log -n 10
```

**仅显示合并提交**
```gitignore
$ git log --merges
```

**查看该文件每次提交记录**
```gitignore
$ git log < file >
```

**查看每次详细修改内容的diff**
```gitignore
$ git log -p < file >
```


**查看最近两次详细修改内容的diff**
```gitignore
$ git log -p -2
```

**查看提交统计信息**
```gitignore
$ git log --stat
```

## merge: 合并就是将外部的提交合并到自己的分支中

**将其他分支合并到当前分支**
```gitignore
$ git merge [branchName]
```

```gitignore
# 在合并时创建一个新的合并后的提交
# 不要 Fast-Foward 合并，这样可以生成 merge 提交
$ git merge --no-ff [branchName]
```

## mv：重命名或移动一个文件

**重命名**
```gitignore
$ git mv [file1] [file2]
```

**移动**
```gitignore
$ git mv [file] [path]
```

**改名文件，并且将这个改名放入暂存区**
```gitignore
$ git mv [file] [file-renamed]
```

## tag:

**新建一个tag在当前commit**
```gitignore
$ git tag [tag]
```

**新建一个tag在指定commit**
```gitignore
$ git tag [tag] [commit]
```

**删除本地tag**
```gitignore
$ git tag -d [tag]
```

**删除远程tag**
```gitignore
$ git push origin :refs/tags/[tagName]
```

**查看tag信息**
```gitignore
$ git show [tag]
```

**提交指定tag**
```gitignore
$ git push [remote] [tag]
```

**提交所有tag**
```gitignore
$ git push [remote] --tags
```

**新建一个分支，指向某个tag**
```gitignore
$ git checkout -b [branch] [tag]
```

## push：从远端版本库合并到当前分支

```gitignore
# 从远端origin的master分支更新版本库
# git pull <远端> <分支>
$ git pull origin master
```

**抓取远程仓库所有分支更新并合并到本地，不要快进合并**
```gitignore
$ git pull --no-ff
```


## rebase（谨慎使用）：将一个分支上所有的提交历史都应用到另一个分支上不要在一个已经公开的远端分支上使用 rebase.
```gitignore
#将experimentBranch应用到master上面
#git rebase < basebranch > < topicbranch >
$ git rebase [master] [experimentBranch]
```

