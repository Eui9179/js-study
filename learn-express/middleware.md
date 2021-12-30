# express

## 미들웨어 특성
미들웨어는 req, res, next를 매개변수로 가지는 함수(에러 처리 미들웨어만 예외적으로 err, req, res, next를 가집니다.)로서 app.use나 app.get, app.post 등으로 장착한다. 특정한 주소의 요청에만 미들웨어가 실행되게 하려면 첫 번째 인수로 주소를 넣으면 된다.

### 미들웨어 사용할 때 유용한 패턴

미들웨어 안에 미들웨어를 넣는 방식

    app.use(morgan('dev'));
    // 또는
    app.use((req, res, next) => {
        morgan('dev')(req, res, next);
    });

이 패턴이 유용한 이유근 기존 미들웨어의 기능을 확장할 수 있기 때문이다.

    app.use((req, res, next) => {
        if (preocess.env.NODE_ENV === 'production){
            morgan('combined)(req,res,next);
        } else {
            morgan('dev')(req, res, next);
        }

    })

## router

    router.route('/abc')
        .get((req, res)=>{
            res.send('GET');
        })
        .post((req, res)=>{
            res.send('POST');
        });