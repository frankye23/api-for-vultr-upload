# AWS S3 文件上传服务

本仓库提供了一个使用 Express 和 AWS S3 (Vultr) 的文件上传API。你可以使用这个API上传文件到 AWS S3 (Vultr) 并返回上传后文件的公共访问链接。


## 如何使用

克隆或下载本仓库到本地：

``git clone https://github.com/frankye23/api-for-vultr-upload.git``

安装依赖：
`
cd api-for-vultr-upload 
npm install
`

启动接口：
`
node app.js
`


### 配置 Vultr (其实就是AWS S3)

在使用该服务之前，你需要配置 AWS S3 (vultr) 并获得 `AWS_ACCESS_KEY`、`AWS_SECRET_KEY`、`AWS_REGION`、`AWS_BUCKET_NAME` 四个参数。可以参考 [AWS 文档](https://docs.aws.amazon.com/zh_cn/AmazonS3/latest/userguide/creating-bucket.html) 配置 S3。
当然Vulter会很简单，在你的面板里就能看到。这里可以看到你的Region信息[Vulter Endpoint](https://www.vultr.com/docs/vultr-server-status-json-endpoints/)

## 技术栈

本仓库使用以下技术：

- Nodejs, Express - 基于 Node.js 的 Web 应用程序框架
- multer - 处理上传的文件中间件
- AWS SDK for JavaScript - 用于访问 AWS 的 JavaScript SDK
