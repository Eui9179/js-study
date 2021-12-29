const http = require('http');
const fs = require('fs').promises;
// 에러 처리
http.createServer(async (req, res)=>{
    try{
        const data = await fs.readFile('./server2.html');
        res.writeHead(200, {'Content-type': 'text/html; charset=utf-8'});
        res.end(data);
    } catch(err){
        console.error(err);
        res.writeHead(500, {'Content-type':'text/plain; charset=uft-8'});
        res.end(err.message);
    }
})
    .listen(8080, ()=>{
        console.log('Server:8080 is running...');
    });