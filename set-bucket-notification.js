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


// Bucket Notification //////////////////////////////////////////
// Create a new notification object
var bucketNotification = new Minio.NotificationConfig();

// Setup a new Queue configuration
var arn = Minio.buildARN('minio', 'sqs', 'us-west-1', 1, 'webhook')
var queue = new Minio.QueueConfig(arn)

queue.addFilterSuffix('.mp4')
queue.addEvent(Minio.ObjectCreatedAll)

// Add the queue to the overall notification object
bucketNotification.add(queue)

minioClient.setBucketNotification('mybucket', bucketNotification, function(err) {
  if (err) return console.log(err)
  console.log('Success')
})
