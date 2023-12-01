#### 安装 electron 太慢

```shell
sudo npm install electron --save-dev --verbose --unsafe-perm=true --ELECTRON_MIRROR="https://cdn.npm.taobao.org/dist/electron/"

# --verbose: 监控安装进度
# --unsafe-perm=true: 设置权限问题
# --ElECTRON...: 设置淘宝镜像
```

- Todo
1. 完善ui样式
2. 增加键盘事件
3. 增加试题与答案 json 文件 ✅
4. 将输入框改成div并增加 focus 样式以及数字填入和颜色填入
5. 将题目改成生成数独方法，这样就每次随机生成数独（增加进程来生成，后续，先直接调用生成）
6. 做一个保存功能
