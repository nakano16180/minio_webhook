## minio webhook

### run webhook server
```
$ NODE_ENV=webhook node app.js 
```

```
$ curl -d {} http://localhost:3000
$ curl -d '{"first_name": "Kenji", "last_name": "Yamada"}' http://localhost:3000
```

### use docker

```
$ cd ./minio_webhook/
$ docker build -t kaito/minio_webhook .
$ docker run --name minio-hook --net=minio-lambda-net -it -p 3000:3000 kaito/minio_webhook
```

open terminal

```
$ curl -X POST http://localhost:3000 -d {}
```

### run minio server

```
$ docker pull minio/minio
$ docker run -p 9000:9000 minio/minio server /data
```

以下の手順でサーバーの設定を行う

```
$ docker run --rm --name mc --net=minio-lambda-net -it --entrypoint=/bin/sh minio/mc
# mc config host add myminio http://172.18.0.3:9000 minioadmin minioadmin
# mc mb myminio/test

# mc admin config set myminio notify_webhook:1 queue_limit="0"  endpoint="http://minio-hook:3000" queue_dir=""
# mc admin service restart myminio

# mc event add myminio/test arn:minio:sqs::1:webhook --event put --suffix .mp4

# mc event list myminio/test
```

ブラウザーを開き、testという名前のバケットにmp4をアップロードするとeventが発火する。