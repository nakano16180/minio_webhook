var Minio = require('minio')

endpoint_url = "localhost"
PORT = 9000
ACCESS_KEY = "minioadmin"
SECRET_KEY = "minioadmin"

var minioClient = new Minio.Client({
  endPoint: endpoint_url,
  port: PORT,
  useSSL: false,
  accessKey: ACCESS_KEY,
  secretKey: SECRET_KEY
});


minioClient.bucketExists('mybucket', function(err, exists) {
  if (err) {
    return console.log(err)
  }
  if (exists) {
    //  Bucket Notification //////////////////////////////////////////
    //  Create a new notification object
    var bucketNotification = new Minio.NotificationConfig();

    // Setup a new Queue configuration
    var arn = Minio.buildARN('minio', 'sqs', '', 1, 'webhook')
    var queue = new Minio.QueueConfig(arn)

    queue.addFilterSuffix('.mp4')
    queue.addEvent(Minio.ObjectCreatedAll)

    // Add the queue to the overall notification object
    bucketNotification.add(queue)

    minioClient.setBucketNotification('mybucket', bucketNotification, function(err) {
      if (err) return console.log(err)
      console.log('Success')
    })

    return console.log('Bucket exists.')
  }else{
    minioClient.makeBucket('mybucket', 'us-east-1', function(err) {
      if (err) return console.log('Error creating bucket.', err)
      console.log('Bucket created successfully in "us-east-1".')
    })
  }
})
