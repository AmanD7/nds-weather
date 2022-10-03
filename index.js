const fs=require("fs");
const http=require("http");
var requests=require("requests");


var file=fs.readFileSync("home.html","utf-8");
// file.replace("{%temp%}","sssss")
// console.log(file);
const server=http.createServer((req,res)=>{
  
  if(req.url=="/"){
    console.log("hi");
    requests('https://api.openweathermap.org/data/2.5/weather?lat=28.6517178&lon=77.2219388&appid=b96dc9b23d194a4720b078ce828b3c0b')
    .on('data', function (chunk) {
     const data=JSON.parse(chunk);
      file=file.replace("{%place%}",data.name);
      res.write(file.replace("{%temp%}",data.main.temp-273.15));
      // console.log(file);
    })
    .on('end', function (err) {
    if (err) return console.log('connection closed due to errors', err);
    res.end();
    });
  }


});

server.listen(8000,"127.0.0.1");


