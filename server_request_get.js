const http = require('http');
// 1. 요청한 url을 객체로 만들기 위해 url 모듈 사용
const url = require('url');
// 2. 요청한 url 중에 Query String을 객체로 만들기 위해
// querystring 모듈 사용
const querystring = require('querystring');

const server = http.createServer(function(request, response){
    // 3. 콘솔화면에 로그 시작 부분을 출력
    console.log('---log start---');
    // 4. 브라우저에서 요청한 주소를 parsing 하여 객체화 후 출력
    const parsedUrl = url.parse(request.url);
    console.log(parsedUrl);
    // 5. 객체화 된 url 중에 Query String 부분만 따로 객체화 후 출력
    const parsedQuery = querystring.parse(parsedUrl.query, '&', '=');
    console.log(parsedQuery);
    console.log('---log end---');

    response.writeHead(200, {'Content-Type':'text/html'});
    response.end('var1의값=' + parsedQuery.var1 + ', var2의값=' + parsedQuery.var2 + ', var3의값=' +parsedQuery.var3);
});



server.listen(8080, function(){
    console.log('Server is running...');
});