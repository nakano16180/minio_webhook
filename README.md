## minio_webhook

- [MinIO | Learn how to use MinIO Bucket Notifications](https://docs.min.io/docs/minio-bucket-notification-guide.html#webhooks)
### build & run webhook server

```
$ cd ./minio_webhook/
$ docker build -t kaito/minio_webhook .
$ docker run --name minio-hook --net=s3_practice_default -it -p 3000:3000 kaito/minio_webhook
```

### run with minio server

- https://github.com/nakano16180/s3_practice

```
$ docker run --name mc --net=s3_practice_default -it --entrypoint=/bin/sh minio/mc
# mc alias set minio http://minio:9000 minioadmin minioadmin
# mc admin config set minio notify_webhook:1 queue_limit="0"  endpoint="http://minio-hook:3000" queue_dir=""
# mc admin service restart minio

# mc mb minio/mybucket
# mc event add minio/mybucket arn:minio:sqs::1:webhook --event put
```

![Screenshot from 2021-08-21 11-04-28](https://user-images.githubusercontent.com/36945685/130307335-87485c1a-5200-4ea2-a0e3-ce6f66cf90ed.png)
