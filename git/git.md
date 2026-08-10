# Git 全面操作指南

这份指南涵盖了 Git 的绝大部分操作指令，按应用场景进行了分类和整理，便于快速查阅。

## 1. 基础工作区操作
调整、添加与删除文件。

```bash
git add [file]              # 将指定文件添加到暂存区
git add -p                  # 交互式添加更改的部分到暂存区
git rm [file]               # 删除文件并将其从暂存区和工作区中移除
git rm --cached [file]      # 停止追踪文件，但保留在工作区（如 .gitignore 添加后）
git mv [file] [new-file]    # 重命名或移动文件，并将更改放入暂存区
```

## 2. 分支管理 (Branch)
管理并行开发的不同主干与分支。

### 基本查看与创建
```bash
git branch                  # 列出所有本地分支
git branch -a               # 查看所有分支（含远程分支）
git branch [branch-name]    # 创建新分支
git checkout -b [branch]    # 创建并立刻切换到新分支
```

### 切换与分支调整
```bash
git checkout [branch-name]  # 切换到已有分支
git checkout -              # 切换回上一个分支
git branch -m [old] [new]   # 重命名分支
```

### 合并与分离
```bash
git merge [branch]          # 将指定分支合并到当前分支
git merge --no-ff [branch]  # 强制生成合并提交（推荐，保留分支历史）
git cherry-pick [commit]    # 挑选并应用某个提交到当前分支
git rebase [branch]         # 变基操作：将当前分支的提交应用到指定分支的最新进度
```

### 删除分支
```bash
git branch -d [branch-name] # 安全删除本地分支（需已合并）
git branch -D [branch-name] # 强制删除本地分支
git push origin --delete [branch] # 删除远程分支
```

## 3. 远程仓库同步 (Remote & Sync)
处理远程主机与本地仓库之间的数据同步。

```bash
git remote -v               # 查看当前的远程仓库地址
git remote add origin [url] # 添加一个远程仓库（通常名为 origin）
git remote set-url origin [url] # 修改远程仓库地址
git remote rm [remote]      # 删除本地记录的远程仓库关联

git fetch [remote]          # 获取远程仓库的最新变更（但不自动合并）
git pull [remote] [branch]  # 拉取并自动合并（fetch + merge）
git pull --no-ff            # 拉取并强制生成合并提交

git push [remote] [branch]  # 将本地提交推送到远程
git push [remote] --force   # 强制推送到远程（覆盖，高危！）
git push --set-upstream origin [branch] # 首次推送并建立本地与远程的跟踪绑定关系
```

## 4. 提交信息的查阅 (Log & Status)
查看提交历史以及文件的变更细节。

```bash
git log                     # 查看所有提交记录
git log --oneline           # 单行精简模式查看历史
git log -n [num]            # 查看最近的 num 条记录
git log -p [file]           # 查看某个文件详细的变更历史（diff）
git log --stat              # 查看提交历史并附带每个提交的文件改动统计
git show [commit]           # 显示某次特定提交的详情
```

## 5. 撤销与回退 (Reset & Revert)
**警告：带 `--hard` 的操作会彻底抹除代码，请谨慎操作。**

### 工作区与暂存区
```bash
git checkout [file]         # 撤销工作区的修改（恢复成上次提交状态）
git checkout .              # 撤销当前目录下的所有修改
git reset [file]            # 将文件移出暂存区，但不改变工作区内容
```

### 提交的回退
```bash
git reset --soft [commit]   # 回退到某次提交，保留修改在暂存区
git reset --hard [commit]   # 彻底回退到某次提交，清除所有修改（高危）
git revert [commit]         # 撤销某次提交（生成一个新的反向提交，不改写历史）
```

## 6. 储藏 (Stash)
在不想提交当前零碎代码时，将其临时保存。

```bash
git stash                   # 储藏当前未提交的变动
git stash list              # 查看所有储藏记录
git stash pop               # 恢复最近的一次储藏，并将其从队列中移除
git stash apply stash@{num} # 恢复指定的储藏，但不移除记录
git stash drop stash@{num}  # 删除某一条储藏记录
```

## 7. 标签 (Tag)
主要用于发布版本的标记。

```bash
git tag [tag]               # 在当前提交新建一个标签
git tag [tag] [commit]      # 在指定提交上新建标签
git push [remote] [tag]     # 将标签推送到远程
git push [remote] --tags    # 推送所有未推送到远程的标签
git tag -d [tag]            # 删除本地标签
git push origin :refs/tags/[tag] # 删除远程标签
```
