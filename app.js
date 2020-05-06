'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(express.static(__dirname+'/'));
app.use(bodyParser.json()); // for parsing application/json

const port = process.env.PORT || 3000;

function baseName(str){
  var base = new String(str).substring(str.lastIndexOf('/') + 1); 
   if(base.lastIndexOf(".") != -1)       
       base = base.substring(0, base.lastIndexOf("."));
  return base;
}

app.post('/', (req, res) => {
  console.log(req.body);
  console.log('=============================');
  var bucketName = req.body.Records[0].s3.bucket.name;
  console.log('==== bucket information =====');
  console.log(bucketName);
  console.log('=============================');

  var uplodedFile = req.body.Records[0].s3.object.key;
  console.log('==== uploaded file ====');
  console.log(uplodedFile);
  var filename = baseName(uplodedFile);
  console.log(filename);
  console.log('=============================');
  
  res.send("");
});


var server = app.listen(port, () =>{
  console.log(`listening on *:${port}`);
});


process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})
