# Git 常用指令沉淀

这是一份遵循极简与实用原则的 Git 核心指令总结，覆盖了日常开发的绝大部分工作流。

## 1. 基础配置 (Setup)
*建立你的身份标识。*
```bash
git config --global user.name "你的名字"
git config --global user.email "你的邮箱"
git config --list # 查看当前配置
```

## 2. 仓库初始化与获取 (Init & Clone)
*代码仓的起点。*
```bash
git init                  # 在当前目录初始化一个新的本地仓库
git clone <url>           # 从远程服务器克隆仓库
```

## 3. 日常工作流 (Daily Workflow)
*文件状态演变：工作区 -> 暂存区 -> 本地仓库*
```bash
git add <file>            # 指定文件添加到暂存区
git add .                 # 所有更改添加到暂存区
git commit -m "提交信息"    # 暂存区提交到本地仓库
git commit --amend        # 修改最后一次提交（补充文件或改注释）
```

## 4. 分支操作 (Branching)
*并行开发的基础。*
```bash
git branch                # 列出所有本地分支
git branch <分支名>        # 创建新分支
git checkout <分支名>      # 切换分支
git checkout -b <分支名>   # 创建并切换到新分支（推荐）
git merge <分支名>         # 将指定分支合并到当前分支
git branch -d <分支名>     # 删除本地分支
```

## 5. 远程协作 (Remote & Sync)
*与团队代码保持一致。*
```bash
git remote -v             # 查看远程仓库
git fetch                 # 拉取远程最新变化（不合并）
git pull                  # 拉取并合并 (fetch + merge)
git push                  # 推送本地提交到远程
git push origin <分支名>   # 推送当前分支到远程对应分支
```

## 6. 查看状态与历史 (Inspect & Log)
*掌控当前进度和历史轨迹。*
```bash
git status                # 查看当前工作区和暂存区的状态
git log                   # 查看历史提交
git log --oneline         # 单行精简历史
git diff                  # 查看工作区与暂存区的差异
git diff --staged         # 查看暂存区与上次提交的差异
```

## 7. 撤销与回退 (Undo)
*修改错误时的“后悔药”。*
```bash
git restore <file>        # 撤销工作区修改（未 add）
git restore --staged <file> # 撤销暂存区修改（已 add，未 commit）
git reset --soft HEAD~    # 撤销最近一次 commit，改动退回暂存区
git reset --hard HEAD~    # 彻底撤销最近一次 commit，改动丢失 (高危)
git stash                 # 暂存当前未提交的修改
git stash pop             # 恢复暂存的修改
```
