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
$ docker run --name minio_hook -it -p 3000:3000 kaito/minio_webhook
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
