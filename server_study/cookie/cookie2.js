const http = require('http');
const fs = require('fs').promises;
const url = require('url');
const qs = require('querystring');

const parseCookies = (cookie = '') => 
    cookie
        .split(';')
        .map(v => v.split('='))
        .reduce((acc, [k, v])=>{
            acc[k.trim()] = decodeURIComponent(v);
            return acc;
        }, {});

http.createServer((req, res)=>{
    const cookies = parseCookies(req.headers.cookie);

    //주소가 login으로 시작하는 경우
    if (req.url.startsWith('/login')){
        const { query } = url.parse(req.url);
        const { name } = qs.parse(query);
        const expires = new Date();
        //유효시간 5분
        expires.setMinutes(expires.getMinutes() + 5);
        res.writeHead(302, {
            Location: '/',
            // encodeURIComponent: 한글은 header에 넣을 수 없으므로 함수로 인코딩 후 넣는다.
            // 옵션은 ;로 구별
            'Set-Cookie': `name=${encodeURIComponent(name)}; Expires=${expires.toGMTString()}; HttpOnly; path=/`,
        });
        res.end();

    //name이라는 쿠키가 있는경우
    } else if (cookies.name){
        res.writeHead(200, {'Content-type': 'text/plain; charset=utf-8'});
        res.end(`${cookies.name}님 안녕하세요`);
    } else {
        try{
            const data = await fs.readFile('./cookie2.html');
            res.writeHead(200, {'Content-type':'text/html; charset=utf-8'});
            res.end(data);
        } catch(err) {
            res.writeHead(500, {'Content-type': 'text/plain; charset=utf-8'});
            res.end(err.message);
        }
    }
})
    .listen(8080, ()=>{
        console.log('8080 server is running...');
    })