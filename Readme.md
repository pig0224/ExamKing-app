## Git 协作流程
> Git全局配置（必须）

```sh
git config --global user.name "你的昵称"
git config --global user.email "邮箱地址"
```

#### 1.拉取远程项目
```sh
git clone 自己到仓库地址
```
#### 2.拉取devlop分支到本地，并切换到此分区
```sh
git checkout -b develop origin/develop
```
#### 3.创建feature-pig224-v0.0.1,并切换到此分区
> ⚠️ 注意：feature命名规范feature-英文名-版本号

```sh
# 创建feature分支
git branch feature-pig224-v0.0.1

#切换此分区
git checkout feature-pig224-v0.0.1
```
#### 4.代码开发

> ⚠️ 注意：代码开发不要有冲突，尽量不要删除别人的文件。规范创建自己的文件及文件夹。

#### 5.提交代码
```sh
# 提交代码到暂存区
git add .
# 提交代码到本地分支仓库
git commit -m "提交说明"
```

#### 6. 推送代码
```sh
# 切换到develop分支
git checkout develop

# 更新远程develop分支到本地develop分支
git pull origin develop

# 合并本地feature分支到本地develop分支
git merge feature-pig224-v0.0.1

# 推送代码到远程仓库
git push origin develop
```

#### 7. Pull Request

> Gitee后台请求Pull Request到主要仓库

## Git 常用命令

#### 1.拉取项目
```sh
git clone [url]
```

#### 2.设置提交代码时的用户信息
```sh
git config [--global] user.name "[name]"
git config [--global] user.email "[email address]"
```

#### 3.添加文件到暂存区
```sh
git add [file1] [file2]

# 添加当前目录全部文件到暂存区
git add .
```

#### 4.删除暂存区的文件
```sh
# 删除工作区文件，并且将这次删除放入暂存区
git rm [file1] [file2] ...
```

#### 5.代码提交仓库区
```sh
# 提交暂存区到仓库区
git commit -m [message]
```

#### 6.分支
```sh
# 更新远程分支信息到本地
git remote update origin -p

# 列出所有本地分支和远程分支
git branch -a

# 拉取远程分支到本地指定分支
git checkout -b [remote] [branch-name]

# 新建一个分支，但依然停留在当前分支
git branch [branch-name]

# 切换到指定分支，并更新工作区
git checkout [branch-name]

# 删除本地分支
git branch -d [branch-name]

# 删除远程分支
git push origin --delete [branch-name]
git branch -dr [remote/branch]
```

#### 7. 标签
```sh
# 列出所有tag
git tag

# 新建一个tag在当前commit
git tag [tag]

# 删除远程tag
git push origin :refs/tags/[tagName]

# 查看tag信息
git show [tag]

# 提交指定tag
git push [remote] [tag]

# 提交所有tag
git push [remote] --tags

# 新建一个分支，指向某个tag
git checkout -b [branch] [tag]
```

#### 8.远程同步
```sh
# 下载远程仓库的所有变动
git fetch [remote]

# 显示所有远程仓库
git remote -v

# 显示某个远程仓库的信息
git remote show [remote]

# 增加一个新的远程仓库，并命名
git remote add [shortname] [url]

# 取回远程仓库的变化，并与本地分支合并
git pull [remote] [branch]

# 上传本地指定分支到远程仓库
git push [remote] [branch]

# 强行推送当前分支到远程仓库，即使有冲突
git push [remote] --force

# 推送所有分支到远程仓库
git push [remote] --all
```