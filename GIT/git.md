# GIT

-------
## �½�������һ���µ� git �汾�⡣����汾������á��洢����Ϣ�ᱻ���浽git �ļ�����
**��ʼ����ǰ��Ŀ**
```gitignore
$ git init
```

**�½�һ��Ŀ¼�������ʼ��ΪGit�����( ֻ������Ŀ¼�� .git �ļ� )**
```gitignore
$ git init [project-name]
```

**����һ����ֿ⣬����ֻ�� .git �ļ��е�Ԫ����**
```gitignore
$ git init --bare <directory>
```

**����һ����Ŀ����������������ʷ**
```gitignore
$ git clone [url]
```

## ���ã��������á������ǰ汾������ã�Ҳ������ϵͳ�Ļ�ȫ�ֵ�

**��ʾ��ǰ��Git����**
```gitignore
$ git config --list
```

**�༭Git�����ļ�**
```gitignore
# �༭ȫ�ֵ�
$ git config -e --global
# �༭��ǰ�ֿ��
$ git config -e
```

**��������û�����ȫ�ֱ���**
```gitignore
# ����˻����������
$ git config --global user.email
$ git config --global user.name
# �޸��˻����������
$ git config --global user.email 'MyEmail@gmail.com'
$ git config --global user.name 'martea'
```

**ΪGit�����һ����ݷ�ʽ��������**
```gitignore
$ git config --global alias.<alias.name> <git-command>
# git config --global alias.gl "log --graph --oneline --decorate --all"
# ���κ� Git �ֿ������� git gl ʱ����ʵ���ϻ�ִ�� git log --graph --oneline --decorate --all ���
```

**���嵱ǰ�û������ύʹ�õ��������䡣**
```gitignore
$ git config --system core.editor < editor >
```

## ״̬����ʾ�����ļ���Ҳ���ǵ�ǰ�����ռ䣩�͵�ǰ��ͷָ��ָ����ύ�Ĳ�ͬ

**��ʾ��֧��δ�����ļ������ĺ�������ͬ**
```gitignore
$ git status
```

**�鿴������git status���÷�**
```gitignore
# ��תҳ��鿴�����ĵ�
$ git help status
```

## ��Ϣ����ȡĳЩ�ļ���ĳЩ��֧��ĳ���ύ�� git ��Ϣ

**��ʾcommit��ʷ���Լ�ÿ��commit����������ļ�**
```gitignore
$ git log --stat
# ֻ��ʾ��ʷ��¼
$ git log
```

**�����ύ��ʷ�����ݹؼ���( �ؼ���ͨ���������ݽ������� )**
```gitignore
$ git log -S [keyword]
```

**��ʾ�� tag ��ǩ����ǰ��֧���� commit ֮������б䶯��ÿ��commitռ��һ��**
```gitignore
# tag �� git tag ��ȡ
$ git log [tag] HEAD --pretty=format:%s
```

**��ʾĳ��commit֮������б䶯����"�ύ˵��"���������������**
```gitignore
# feature Ϊ��������
$ git log [tag] HEAD --grep feature
```

**��ʾĳ���ļ��İ汾��ʷ�������ļ�����**
```gitignore
$ git log --follow [file]
$ git whatchanged [file]
```

**��ʾָ���ļ���ص�ÿһ��diff**
```gitignore
$ git log -p [file]
```

**��ʾ��ȥ5���ύ**
```gitignore
$ git log -5 --pretty --online
```

**��ʾ�����ύ�����û������ύ��������**
```gitignore
$ git shortlog -sn
```

**��ʾָ���ļ���ʲô����ʲôʱ���޸Ĺ�**
```gitignore
$ git blame [file]
```

**��ʾ�ݴ����͹������Ĳ���**
```gitignore
$ git diff
```

**��ʾ�ݴ�������һ��commit�Ĳ���**
```gitignore
$ git diff --cached [file]
```

**��ʾ�������뵱ǰ��֧����commit֮��Ĳ���**
```gitignore
$ git diff HEAD
```

**�Ƚ�������֧֮��Ĳ���**
```gitignore
$ git diff [first-branch]...[second-branch]
```

**��ʾ������д�˶����д���**
```gitignore
$ git diff --shortstat "@{0 day ago}"
```

**�Ƚ��ݴ����Ͱ汾�����**
```gitignore
$ git diff --staged
```

**�Ƚ��ݴ����Ͱ汾�����**
```gitignore
$ git diff --cached
```

**�����Ƚ�ͳ����Ϣ**
```gitignore
$ git diff --stat
```

**��ʾĳ���ύ��Ԫ���ݺ����ݱ仯**
```gitignore
# commit ��ϣֵ
$ git show [commit]
```

**��ʾĳ���ύ�����仯���ļ�**
```gitignore
$ git show --name-only [commit]
```

**��ʾĳ���ύʱ��ĳ���ļ�������**
```gitignore
# filenmae ����ڲֿ�ĸ�Ŀ¼
$ git show [commit]:[filename]
```

**��ʾ��ǰ��֧����������ύ**
```gitignore
$ git reflog
```

**�鿴Զ�̷�֧**
```gitignore
$ git branch -r
```

**�鿴���ط�֧**
```gitignore
$ git branch
```

**�����µķ�֧( ���� )**
```gitignore
$ git branch [new_branch]
```

**�鿴������֧����ύ��Ϣ**
```gitignore
$ git branch -v
```

**�鿴�Ѿ����ϲ�����ǰ��֧�ķ�֧**
```gitignore
$ git branch --merged
```

**�鿴��δ���ϲ�����ǰ��֧�ķ�֧**
```gitignore
$ git branch --no-merged
```

## ��ӣ�����ļ�����ǰ�����ռ��С�����㲻ʹ�� git add ���ļ���ӽ�ȥ����ô��Щ�ļ�Ҳ������ӵ�֮����ύ֮��

**���һ���ļ�**
```gitignore
git add [file]
```

**���һ����Ŀ¼�е��ļ�**
```gitignore
$ git add /path/to/file/test.js
```

**֧��������ʽ**
```gitignore
$ git add ./*.js
```

**���ָ���ļ����ݴ���**
```gitignore
$ git add [file1] [file2] ...
```

**���ָ��Ŀ¼���ݴ�����������Ŀ¼**
```gitignore
$ git add [dir]
```

**��ӵ�ǰĿ¼�������ļ����ݴ���**
```gitignore
$ git add .
```

```gitignore
$ git reset ȡ����ӵ�
```



```gitignore
#���ÿ���仯ǰ������Ҫ��ȷ��
#����ͬһ���ļ��Ķദ�仯������ʵ�ִַ��ύ
$ git add -p
```

## ɾ����rm ������� add �����෴���ӹ����ռ���ȥ��ĳ���ļ�
**�Ƴ� HelloWorld.js**
```gitignore
$ git rm HelloWorld.js
```

**�Ƴ���Ŀ¼�е��ļ�**
```gitignore
$ git rm /pather/to/the/file/HelloWorld.js
```

**ɾ���������ļ������ҽ����ɾ�������ݴ���**
```gitignore
$ git rm [file1] [file2] ...
```

**ֹͣ׷��ָ���ļ��������ļ��ᱣ���ڹ�����**
```gitignore
$ git rm --cached [file]
```

## ��֧�������֧������ͨ����������Է�֧������ɾ�Ĳ��л���

**�鿴���еķ�֧��Զ�̷�֧**
```gitignore
$ git branch -a
```

**����һ���µķ�֧**
```gitignore
$ git branch [branch-name]
```
```gitignore
# ��������֧
# git branch -m <������> <������>
$ git branch -m [branch-name] [new-branch-name]
```

**�༭��֧�Ľ���**
```gitignore
$ git branch [branch-name] --edit-description
```

**�г����б��ط�֧**
```gitignore
$ git branch
```

**�½�һ����֧�����л����÷�֧**
```gitignore
$ git checkout -b [branch]
```

**�½�һ����֧��ָ��ָ��commit**
```gitignore
# commit Ϊ��ϣֵ
$ git branch [branch] [commit]
```

**�½�һ����֧����ָ����Զ�̷�֧����׷�ٹ�ϵ**
```gitignore
$ git branch --track [branch] [remote-branch]
```

**�л���ָ����֧�������¹�����**
```gitignore
$ git checkout [branch-name]
```

**�л�����һ����֧**
```gitignore
$ git checkout -
```

**����׷�ٹ�ϵ�������з�֧��ָ����Զ�̷�֧֮��**
```gitignore
git branch --set-upstream-to=[remote-branch] [branch]
```

**�ϲ�ָ����֧����ǰ��֧**
```gitignore
$ git merge [branch]
```

**ѡ��һ��commit���ϲ�����ǰ��֧**
```gitignore
$ git cherry-pick [commit]
```

**ɾ����֧**
```gitignore
$ git branch -d [branch-name]
```

**ɾ��Զ�̷�֧**
```gitignore
$ git push origin --delete [branch-name]
# ����
$ git branch -dr [remote/branch]
```

**�л���ĳ����֧**
```gitignore
$ git checkout < branch >
```

**�����µķ�֧�������л���ȥ**
```gitignore
$ git checkout -b < new_branch >
```

**���� branch �����µ� new_branch**
```gitignore
$ git checkout -b < new_branch > < branch >
```


**ǿ��ɾ��ĳ����֧ (δ���ϲ��ķ�֧��ɾ����ʱ����Ҫǿ��)**
```gitignore
$ git br -D [branch-name]
```

## ���������ǰ�����ռ���µ���������ʶ�Ļ���ĳһ�ض��Ĺ����ռ�
**���һ���汾�⣬Ĭ�Ͻ����µ�master��֧**
```gitignore
$ git checkout
```

**�л���һ���ض��ķ�֧**
```gitignore
$ git checkout branchName
```

**�½�һ����֧�������л���ȥ���൱��"git branch <����>; git checkout <����>"**
```gitignore
$ git checkout -b [newBranch]
```

## Զ��ͬ����Զ��ͬ����Զ�˷�֧

**����Զ�ֿ̲�����б䶯**
```gitignore
# remote �ֿ��ַ
$ git fetch [remote]
```

**��ʾ����Զ�ֿ̲�**
```gitignore
$ git remote -v
```

**��ʾĳ��Զ�ֿ̲����Ϣ**
```gitignore
$ git remote show [remote]
```

**����һ���µ�Զ�ֿ̲⣬������**
```gitignore
$ git remote add [shortname] [url]
```

**���Զ�ֿ̲��ַ**
```gitignore
��һ������ Git �ֿ���Զ�ֿ̲⣨���� GitHub �ϵĲֿ⣩����������  
$ git remote add origin https://xxx/xxx.git
```

**����Զ�ֿ̲��ַ(�����޸�Զ�ֿ̲��ַ)**
```gitignore
$ git remote set-url origin https://xxx/xxx.git
```

**ɾ��Զ�ֿ̲�**
```gitignore
$ git remote rm <repository>
```
```gitignore
# �ϴ�����ָ����֧��Զ�ֿ̲�
# �ѱ��صķ�֧���µ�Զ��origin��master��֧��
# git push <Զ��> <��֧>
# git push �൱�� git push origin master

$ git push [remote] [branch]
```

**ǿ�����͵�ǰ��֧��Զ�ֿ̲⣬��ʹ�г�ͻ**
```gitignore
$ git push [remote] --force
```

**�������з�֧��Զ�ֿ̲�**
```gitignore
$ git push [remote] --all
```

**���ڽ����ط�֧�ĸ������͵�Զ�ֿ̲⣬��ͬʱ���øñ��ط�֧��Զ�̷�֧�ĸ��ٹ�ϵ**
```gitignore
$ git push --set-upstream origin [remote]
```

## ������
**�ָ��ݴ�����ָ���ļ���������**
```gitignore
$ git checkout [file]
```

**�ָ�ĳ��commit��ָ���ļ����ݴ����͹�����**
```gitignore
$ git checkout [commit] [file]
```

**�ָ��ݴ����������ļ���������**
```gitignore
$ git checkout .
```
**���ڻ���Զ�̷�֧ origin/[remote] �������л���һ���µı��ط�֧ [remote]**
```gitignore
git checkout -b [remote] origin/[remote]
```

**�����ݴ�����ָ���ļ�������һ�� commit ����һ�£�������������**
```gitignore
$ git reset [file]
```

**�����ݴ����빤����������һ��commit����һ��**
```gitignore
$ git reset --hard
```

**���õ�ǰ��֧��ָ��Ϊָ��commit��ͬʱ�����ݴ�����������������**
```gitignore
$ git reset [commit]
```

���õ�ǰ��֧��HEADΪָ��commit��ͬʱ�����ݴ����͹���������ָ��commitһ��
```gitignore
$ git reset --hard [commit]
# �ָ��� git reflog �� git reset --hard
```

���õ�ǰHEADΪָ��commit���������ݴ����͹���������
```gitignore
$ git reset --keep [commit]
```

```gitignore
# �½�һ��commit����������ָ��commit
# ���ߵ����б仯������ǰ�ߵ���������Ӧ�õ���ǰ��֧
$ git revert [commit]
```

**�ָ����һ���ύ��״̬**
```gitignore
$ git revert HEAD
```

git revert  ������һ���µ��ύ������ĳ���ύ���˴��ύ֮ǰ��commit���ᱻ����

git reset  �ǻص�ĳ���ύ���ύ��֮ǰ��commit���ᱻ���������Ǵ˴�֮����޸Ķ��ᱻ�˻ص��ݴ���

**��ʱ��δ�ύ�ı仯�Ƴ����Ժ�������**
```gitignore
$ git stash
# ��ɾ���ݴ����ļ�¼
$ git stash pop
```

**������stash**
```gitignore
$ git stash list
```

**�ָ��ݴ������**
```gitignore
$ git stash apply stash@{num}
```

**ɾ���ݴ���( ���һ�� )**
```gitignore
$ git stash drop
# �ƶ�ɾ���ݴ�����ĳһ��
$ git stash drop stash@{num}
```

## �ύ��commit ����ǰ�����ĸ��ı���Ϊһ���µ��ύ������ύ�����û������ĸ�������Ϣ

**�ύ�ݴ������ֿ��������ύ��Ϣ**
```gitignore
$ git commit -m [message]
```

**�ύ�ݴ�����ָ���ļ����ֿ���**
```gitignore
$ git commit [file1] [file2] ... -m [message]
```

**�ύ���������ϴ� commit ֮��ı仯��ֱ�ӵ��ֿ���**
```gitignore
$ git commit -a
```

**�ύʱ��ʾ����diff��Ϣ**
```gitignore
$ git commit -v
```

```gitignore
# ʹ��һ���µ�commit�������һ���ύ
# �������û���κ��±仯����������д��һ��commit���ύ��Ϣ
$ git commit --amend -m [message]
```

**������һ��commit��������ָ���ļ����±仯**
```gitignore
$ git commit --amend [file1] [file2] ...
```

## log: ��ʾ����汾��������ύ

**��ʾĳ�����ύ��Ϣ**
```gitignore
$ git log -n 10
```

**����ʾ�ϲ��ύ**
```gitignore
$ git log --merges
```

**�鿴���ļ�ÿ���ύ��¼**
```gitignore
$ git log < file >
```

**�鿴ÿ����ϸ�޸����ݵ�diff**
```gitignore
$ git log -p < file >
```


**�鿴���������ϸ�޸����ݵ�diff**
```gitignore
$ git log -p -2
```

**�鿴�ύͳ����Ϣ**
```gitignore
$ git log --stat
```

## merge: �ϲ����ǽ��ⲿ���ύ�ϲ����Լ��ķ�֧��

**��������֧�ϲ�����ǰ��֧**
```gitignore
$ git merge [branchName]
```

```gitignore
# �ںϲ�ʱ����һ���µĺϲ�����ύ
# ��Ҫ Fast-Foward �ϲ��������������� merge �ύ
$ git merge --no-ff [branchName]
```

## mv�����������ƶ�һ���ļ�

**������**
```gitignore
$ git mv [file1] [file2]
```

**�ƶ�**
```gitignore
$ git mv [file] [path]
```

**�����ļ������ҽ�������������ݴ���**
```gitignore
$ git mv [file] [file-renamed]
```

## tag:

**�½�һ��tag�ڵ�ǰcommit**
```gitignore
$ git tag [tag]
```

**�½�һ��tag��ָ��commit**
```gitignore
$ git tag [tag] [commit]
```

**ɾ������tag**
```gitignore
$ git tag -d [tag]
```

**ɾ��Զ��tag**
```gitignore
$ git push origin :refs/tags/[tagName]
```

**�鿴tag��Ϣ**
```gitignore
$ git show [tag]
```

**�ύָ��tag**
```gitignore
$ git push [remote] [tag]
```

**�ύ����tag**
```gitignore
$ git push [remote] --tags
```

**�½�һ����֧��ָ��ĳ��tag**
```gitignore
$ git checkout -b [branch] [tag]
```

## push����Զ�˰汾��ϲ�����ǰ��֧

```gitignore
# ��Զ��origin��master��֧���°汾��
# git pull <Զ��> <��֧>
$ git pull origin master
```

**ץȡԶ�ֿ̲����з�֧���²��ϲ������أ���Ҫ����ϲ�**
```gitignore
$ git pull --no-ff
```


## rebase������ʹ�ã�����һ����֧�����е��ύ��ʷ��Ӧ�õ���һ����֧�ϲ�Ҫ��һ���Ѿ�������Զ�˷�֧��ʹ�� rebase.
```gitignore
#��experimentBranchӦ�õ�master����
#git rebase < basebranch > < topicbranch >
$ git rebase [master] [experimentBranch]
```

