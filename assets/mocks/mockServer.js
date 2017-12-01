"use strict";

// const CONFIG = require('config');
const Koa = require('koa')
const cors = require('koa-cors')
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');

let app = new Koa()

app.use(cors())

app.use(function *(next){
  var file_path = `/${this.method.toLowerCase()}${this.path}`;
  if(file_path.split('.')[1] == ('png' || 'jpeg' || 'jpg')){
    return
  }
  if(file_path[file_path.length-1] == '/') {
    file_path = file_path.substring(0,file_path.length-1)
  }
  if(file_path.substr(-5) != '.json'){
    file_path += '.json'
  }
  console.log("MockFilePath: "+file_path+"\r\n");
	let data=JSON.parse(fs.readFileSync(__dirname + file_path, 'utf8'));
  this.body = data;
  this.type = 'json';
});

// app.listen(CONFIG.get('mockPort'));
app.listen(3020, () => {
    console.log(chalk.green('mockServer run in 127.0.0.1:3020'));
});