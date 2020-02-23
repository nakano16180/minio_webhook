'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(__dirname+'/'));

const PORT = 3000;

const axios = require('axios');
const url = "http://d-lambda:9001/2015-03-31/functions/myfunction/invocations";

async function main(req, res) {
  try {
    const result = await axios.post(url, req.body);
    console.log(result);
    console.log('###########################################');
    return result;
  } catch (error) {
    console.log('catch error');
    console.log('###########################################');
    console.log(error);
    console.log('###########################################');
  }
}


app.post('/', (req, res) => {
    console.log(req.body); //Minio serverから送られて来る情報の確認
    const result = main(req, res);
    //res.end(JSON.stringify({}));
});


app.listen(PORT);
console.log(`listening on *:${PORT}`);


var process = require('process')
process.on('SIGINT', () => {
  console.info("Interrupted")
  process.exit(0)
})