## minio webhook

```
$ mkdir minio_webhook && cd minio_webhook/
$ npm init -y
$ npm i --save express body-parser
$ touch app.js
$ npm install --save minio config

```

## run server
```
$ NODE_ENV=webhook node app.js 
```


## use docker

```
$ cd ./minio_webhook/
$ docker build -t kaito/minio_webhook .
$ docker run --name minio_hook -it -p 3000:3000 kaito/minio_webhook
```