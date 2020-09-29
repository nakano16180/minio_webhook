## minio webhook

### run webhook server

```
$ cd ./minio_webhook/
$ docker build -t kaito/minio_webhook .
$ docker run --name minio-hook --net=minio-lambda-net -it -p 3000:3000 kaito/minio_webhook
```

open terminal

```
$ curl -X POST http://localhost:3000 -d {}
```

### run with minio server

- https://github.com/nakano16180/s3_practice