# 生产环境部署指南

本指南将帮助您编译最新的前端项目，并将其上传到云服务器以替换旧版本。

## 1. 编译最新项目
```bash
npm run build
```
## 2. 上传项目到云服务器
```bash
scp -r ./dist/* root@us-hudiyun.vincentzyu233.cn:/data/gemini_request_frontend
```

## 3. 替换旧的前端文件

上传完成后，您需要登录到您的云服务器，然后执行以下步骤来替换旧的前端文件。

1.  **SSH 连接到您的云服务器：**

    ```bash
    ssh <username>@<your_server_ip>
    ```

2.  **进入前端项目目录：**

    ```bash
    cd <remote_path_to_frontend_dir>
    ```

    **示例：**

    ```bash
    cd /data/gemini_request_frontend
    ```

3.  **备份旧的前端文件（可选但强烈推荐）：**

    在替换之前，最好备份当前的生产文件，以防新版本出现问题。

    ```bash
    mv assets assets_backup_$(date +%Y%m%d%H%M%S)
    mv index.html index.html_backup_$(date +%Y%m%d%H%M%S)
    ```

4.  **删除旧的前端文件：**

    ```bash
    rm -rf assets index.html
    ```

5.  **移动新文件到位：**

    将 `new_dist` 目录中的内容移动到当前目录。

    ```bash
    mv new_dist/* .
    rmdir new_dist
    ```

    或者，如果 `new_dist` 内部结构与您期望的 `assets` 和 `index.html` 相同，您可以直接移动：

    ```bash
    mv new_dist/assets .
    mv new_dist/index.html .
    rmdir new_dist
    ```

现在，您的云服务器上的前端文件已经更新为最新版本。您可以通过访问您的网站来验证部署是否成功。