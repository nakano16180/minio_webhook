## minio_webhook

### build & run webhook server

```
$ cd ./minio_webhook/
$ npm install
$ docker build -t kaito/minio_webhook .
$ docker run -d --name minio-hook --net=minio-lambda-net -it -p 3000:3000 --restart=always kaito/minio_webhook
```

### run with minio server

- https://github.com/nakano16180/s3_practice

```
$ cd s3_practice/
$ docker-compose exec mc /bin/sh

# mc admin config set minio notify_webhook:1 queue_limit="0"  endpoint="http://minio-hook:3000" queue_dir=""
# mc admin service restart minio
# exit
```

```
$ cd minio_webhook/
$ node set-bucket-notification.js
```