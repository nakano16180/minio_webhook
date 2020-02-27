'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

var config = require('config');

var mcConfig = config.get('config');
if (mcConfig.endPoint === '<endpoint>') {
    console.log('Please configure your endpoint in \"config/webhook.json\".');
    process.exit(1);
}

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/'));

const PORT = process.env.PORT || 3000;


app.post('/', (req, res) => {
  console.log(req); //Minio serverから送られて来る情報の確認
  console.log('-----------')
  console.log(req.body); //Minio serverから送られて来る情報の確認
  res.end(JSON.stringify({}));
});


var server = app.listen(PORT, () =>{
  console.log(`listening on *:${PORT}`);
});



var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})