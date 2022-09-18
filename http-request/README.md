# Section 14

## HTTP 요청 보내기(ex: 데이터베이스 연결)

### 리액트가 데이터베이스와 소통하는 방법

리액트 앱이나 일반적이 브라우저 앱에서는 브라우저에서 실행되는 자바스크립트 코드가 데이터베이스와 직접 통신하면 절대 안된다.

클라이언트 내부에서 데이터베이스에 직접 연결을 하거나 브라우저의 자바스크립트 코드를 통해 직접 연결을 한다면 코드를 통해 데이터베이스 인증 정보를 노출시키게 된다.

**데이터베이스에 직접 접근하는 것은 성능 문제와 같은 다른 문제를 발생시킬 수 있지만 무엇보다 보안 이슈 사항이 가장 큰 문제이다.**

- 백엔드 어플리케이션
  - 선택에 따른 모든 서버측 언어를 통해 만들 수 있다.
  - 사용자가 이 벡엔드 코드를 확인할 수 없기 때문에 데이터베이스의 인증 정보를 안전하게 저장할 수 있다.

### API(Application Programming Interface)

단순히 리액트나 HTTP 요청만 있는 것이 아니다.
코드를 통해 명확하게 정의된 인터페이스를 다루며 또 어떤 결과를 얻기 위한, 작업에 대한 규칙이 명확하게 정의된 것을 다루고 있다는 뜻.

보통 HTTP 요청에 대한 API를 말할 때는 REST, GraphQL API를 말하게 된다.
지금 사용한 스타워즈 API는 REST API이며, URL같은 곳에 요청을 전송하게 되면 특정한 형식에 맞춰서 데이터를 전달해준다.
서로 다른 URL에 각각 다른 요청을 보내게 되면 그에 맞는 서로 다른 데이터를 제공한다.

### GET 요청 보내기

자바스크립트 내에서 HTTP 요청을 전송하는 내장 메커니즘이 있는데 이를 Fetch API라고 한다.
Fetch API는 브라우저 내장형이며 데이터를 불러오고 이름과는 다르게 데이터 전송도 가능하다.

```js
const fetchMoviesHandler = () => {
  fetch('https://swapi.dev/api/films')
    .then(res => res.json())
    .then(data => {
      const transformedMovies = data.results.map(movieData => {
        return {
          id: movieData.episode_id,
          title: movieData.title,
          openingTest: movieData.opening_crawl,
          releaseDate: movieData.release_date,
        };
      });
      setMovies(transformedMovies);
    });
};
```

- 요청하려는 URL을 문자열로 전달하면 된다.
- 함수에 두 번째 인자를 전달할 수 있는데 이 인자를 통해 다양한 선택사항을 지정할 수 있는 자바스크립트 객체를 전달할 수 있다.
  - 예를 들어 추가적인 헤더나 바디, HTTP 요청 메서드의 변경
  - 여기서는 기본적으로 get() 메서드를 사용하기 때문에 넣지 않았다.
- fetch() 함수는 프로미스 객체를 반환하는데 이는 어떤 즉각적인 행동 대신 어떤 데이터를 전달하는 객체이다.
  - HTTP 요청은 비동기 작업이다.
- 그렇기 때문에 최종 함수에 then()을 추가한다. 이렇게 되면 최종 함수는 응답을 받을 때 호출된다.
- 괄호 안에 res(response)를 입력하는데 인자로 들어온 res는 객체이며 요청 응답에 대한 많은 데이터를 갖고있다.
  - 예를 들어 응답 헤더를 읽거나 상태 코드를 얻을 수도 있다.
- API는 JSON 형식으로 전송한다.
  - JSON의 이점은 자바스크립트로의 변환 작업이 필요하지만 파일에서 자바스크립트 객체로의 변환이 매우 쉽다는 것. 이를 수행하는 방법은 json() 메서드다. `res.json()`
  - 이 메서드 역시 프로미스 객체를 반환하므로 추가적인 then 구역을 생성해야 한다. 이렇게 하면 이 데이터 변환 작업이 끝날 때 작동하게 된다.

**어플리케이션에서 영화 제목과 개봉일 오프닝 텍스트를 추출하고 있으나 데이터의 이름과 다르기 때문에 props의 이름을 바꾸거나 다른 방법으로 들어오는 데이터의 형식을 바꿔서 우리가 어플리케이션 안에서 원하는 형식으로 변환해야 한다.**

```js
const transformedMovies = data.results.map(movieData => {
  return {
    id: movieData.episode_id,
    title: movieData.title,
    openingTest: movieData.opening_crawl,
    releaseDate: movieData.release_date,
  };
```

### 비동기 / 대기 사용하기

프로미스를 다룰 때 then 체인, 즉 then 호출 뒤에 then을 재차 호출할 수 있지만 async와 await 라는 문법을 사용할 수 있다.
함수 앞에 async 예약어를 추가하고 프로미스를 반환하는 작업 앞에 await 라는 예약어를 사용한다.

```js
const fetchMoviesHandler = async () => {
  const response = await fetch('https://swapi.dev/api/films');
  const data = await response.json();

  const transformedMovies = data.results.map(movieData => {
    return {
      id: movieData.episode_id,
      title: movieData.title,
      openingTest: movieData.opening_crawl,
      releaseDate: movieData.release_date,
    };
  });
  setMovies(transformedMovies);
};
```

### 요청에 useEffect() 사용하기

```js
useEffect(() => {
  fetchMoviesHandler();
}, [fetchMoviesHandler]);
```

의존성 배열에 함수를 추가했고 추가한 함수는 객체이기 때문에 컴포넌트가 재 렌더링될 때마다 함수 역시 바뀌게 된다.
이 해결책은 uesCallback을 사용하는 것이다.

```js
const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch('https://swapi.dev/api/films');
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    const transformedMovies = data.results.map(movieData => {
      return {
        id: movieData.episode_id,
        title: movieData.title,
        openingText: movieData.opening_crawl,
        releaseDate: movieData.release_date,
      };
    });
    setMovies(transformedMovies);
    setIsLoading(false);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}, []);
```

이렇게 하게 되면 이 상태 갱신 함수는 리액트가 절대 변경이 없을 것이라고 보장했으므로 의존성으로 추가할 필요가 없다.

### POST 요청 보내기

fetch API에 2번째 인자를 전달하면 된다.
method 키와 같은 걸 지정하면 되고 POST로 지정해준다. ` method: 'POST',`
firebase 서비스에 POST 요청을 보내면 firebase는 데이터베이스에 리소스를 만든다.
저장해야 하는 리소스를 만들어야하는데 이를 위해, fetch API 구성 객체에서 body라는 옵션을 추가한다. `body: JSON.stringify(movie)`
영화를 추가해야 하니 movie를 전달해주었다.
**body는 자바스크립트의 객체가 아닌 JSON 데이터를 필요로 하기 때문에 JSON.stringify를 호출해서 감싸주었다.**

좀 더 명확히 하기 위해 헤더를 추가합니다. headers 키를 추가하고 값으로 객체를 지정하면 된다.
여기에는 Content-Type이라고 쓰고 application/json이라고 작성하면 된다.

```js
headers: {
  'Content-Type': 'application/json',
},
```

이제 이 데이터를 가지고 URL에 POST요청을 보낼 수 있다. GET과 마찬가지로 이 작업은 비동기 작업이고 프로미스를 반환하기 때문에 앞에 async, await을 적어준다.

Add movie 버튼을 누르면 실시간 데이터베이스 항목에서 movies라는 새로운 노드가 보이게 된다.
이 노드 안에는 Firebase가 자동 생성한 암호화된 ID가 있고 그 안엔 전송된 데이터가 있다.
Firebase는 name 필드에 자동 생성된 ID를 적어 응답히게 된다.

```js
// addMovieHandler
const addMovieHandler = async movie => {
  setError(null);
  try {
    const response = await fetch(
      'https://react-http-c498a-default-rtdb.firebaseio.com/movies.json',
      {
        method: 'POST',
        body: JSON.stringify(movie),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error('Something went wrong!');
    }
    const data = await response.json();
    console.log(data);
  } catch (error) {
    setError(error.message);
  }
};

// fetchMoviesHandler
const fetchMoviesHandler = useCallback(async () => {
  setIsLoading(true);
  setError(null);
  try {
    const response = await fetch(
      'https://react-http-c498a-default-rtdb.firebaseio.com/movies.json'
    );
    if (!response.ok) {
      throw new Error('Something went wrong!');
    }

    const data = await response.json();

    const loadedMovies = [];

    for (const key in data) {
      loadedMovies.push({
        id: key,
        title: data[key].title,
        openingText: data[key].openingText,
        releaseDate: data[key].releaseDate,
      });
    }

    setMovies(loadedMovies);
    setIsLoading(false);
  } catch (error) {
    setError(error.message);
  }
  setIsLoading(false);
}, []);
```
