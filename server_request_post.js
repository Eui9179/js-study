const http = require('http');
const querystring = require('querystring');

const server = http.createServer(function(request, response){
    // 1. post로 전달된 데이터를 담을 변수 선언
    let postdata = '';
    // 2. request객체에 on() 함수로 'data' 이벤트 연결
    request.on('data', function(data){
        // 3. data 이벤트가 발생할 때마다 callback을 통해 postdata 변수에 값을 저장
        postdata = postdata + data;
    });

    // 4. request객체에 on()함수로 'end'이벤트 연결
    request.on('end', function(){
        const parsedQuery = querystring.parse(postdata);
        console.log(parsedQuery);

        response.writeHead(200, {'Content-Type':'text/html'});
        response.end('result '+postdata);
    });

});

server.listen(8080, function(){
    console.log('Server is running...');
});
