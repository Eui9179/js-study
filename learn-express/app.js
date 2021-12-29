const express = require('express');
const path = require('path');
// express 모듈을 실행해 app 변수에 할당
// 내부에 http 모듈이 내장되어 있기때문에 서버 역할 가능
const app = express();

// 서버가 실행 될 포트 설정
app.set('port', process.env.PORT || 3000);

app.use((req, res, next)=>{
    console.log('모든 요')
})
// app.get(주소, 라우터)
// get 요청이 올때 어떤 동작을 할지 적는 부분
// app.post, app.put, app.delete ...
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, '/index.html')); // res.end, res.write 대신 res.send 사용
});

// 포트 연결 후 서버 실행
app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), 'server is running...');
});