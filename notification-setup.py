from minio import Minio
from minio.notificationconfig import (NotificationConfig, SuffixFilterRule, PrefixFilterRule,
                                      QueueConfig)
from minio.error import S3Error

endpoint_url = "localhost"
PORT = 9000
ACCESS_KEY = "minioadmin"
SECRET_KEY = "minioadmin"


def main():
    client = Minio(
        "localhost:9000", 
        access_key=ACCESS_KEY, 
        secret_key=SECRET_KEY,
        secure=False
    )

    found = client.bucket_exists("my-bucket")
    if not found:
        client.make_bucket("my-bucket")
        print("Bucket created")
    else:
        print("Bucket Exists")
    
    config = NotificationConfig(
        queue_config_list=[
            QueueConfig(
                "arn:minio:sqs::1:webhook",
                ["s3:ObjectCreated:*"],
                config_id="1",
                suffix_filter_rule=SuffixFilterRule(".txt"),
            ),
        ],
    )
    client.set_bucket_notification("my-bucket", config)
    print("set notification")



if __name__ == "__main__":
    try:
        main()
    except S3Error as exc:
        print("error occurred.", exc)