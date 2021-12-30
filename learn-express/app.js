const express = require('express');

// morgan: 요청과 응답에 대한 정보를 콘솔에 기록한다
const morgan = require('morgan');

// cookie-parser는 요청에 동봉된 쿠키를 해석해 req.cookies 객체로 만든다.
// ex) app.use(cookieParser(비밀키));
const cookieParser = require('cookie-parser');
const session = require('express-session');

// .env 파일을 읽어서 process.env 로 만든다.
// env파일로 따로 관리하는 이유는 보안과 설정의 편의성
const dotenv = require('dotenv'); 
const path = require('path');

dotenv.config();

const indexRouter = require('./routes');
const userRouter = require('./routes/user');

// express 모듈을 실행해 app 변수에 할당
// 내부에 http 모듈이 내장되어 있기때문에 서버 역할 가능
const app = express();

// 서버가 실행 될 포트 설정
app.set('port', process.env.PORT || 3000);

app.use(
    // 개발환경에서는 env, 배포 환경에서는 combined
    morgan('dev'),
    // static: 정적인 파일들을 제공하는 라우터 역할
    // app.use('요청경로', express.static('실제 경로'));
    // ex) public/stylesheets/style.css
    express.static('/', path.join(__dirname, 'public')),
    // 요청의 본문에 있는 데이터를 해석해서 req.body 객체로 만들어 주는 미들웨어
    // npm i body-parser raw, text 형식의 데이터를 추가로 해석
    express.json(),
    express.urlencoded({extended: false}),
    
    cookieParser(process.env.COOKIE_SECRET)
)

// 세션관리용 미들웨어
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie:{
        httpOnly: true,
        secure: false,
    },
    name: 'session-cookie',
}));

app.use('/',indexRouter);
app.use('/user', userRouter);

app.use((req, res, next)=>{
    res.status(404).send('Not Found');
})

// 파일 전송 npm
const multer = require('multer');
const fs = require('fs');

try{
    fs.readdirSync('uploads');
} catch (error){
    console.error('uploads 폴더가 없어 uploads 폴더를 생성합니다.');
    fs.mkdirSync('uploads');
}

const upload = multer({
    storage: multer.diskStorage({
        destination(req, file, done){
            done(null, 'uploads/');
        },
        filename(req, file, done){
            const ext = path.extname(file.originalname);
            done(null, path.basename(file.originalname, ext) + Date.now() + ext);
        },
    }),
    limits: {fileSize: 5 * 1024 * 1024},
});

app.get('/upload', (req, res) => {
    res.sendFile(path.join(__dirname, 'multipart.html'));
});

app.post('/upload', upload.fields([{name:'image1'}, {name:'image2'}]),
    (req, res) => {
        console.log(req.files, req.body);
        res.send('ok');
    },
);

app.use((req, res, next)=>{
    console.log('모든 요청에 실행');
    next();
});

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