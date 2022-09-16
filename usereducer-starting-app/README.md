# Section 10

## useReducer-Starting-App

### Side Effects

애플리케이션에서 일어나는 다른 모든 것.

- http 리퀘스트를 보내는 것
- 브라우저 저장소에 무언가를 저장하는 것.

#### useEffect

두 개의 매개변수, 두 개의 인수와 같이 호출

- 첫 번 째 인수는 함수.
  - 모든 컴포넌트 평가 후에 실행되어야 하는 함수
- 지정된 의존성을 두 번째 인수로 넣어준다.
  - 의존성으로 구성된 배열
  - 의존성이 변경될 때마다 첫 번째 함수가 다시 실행된다.

clear up 함수

- useEffect가 다음 번에 함수를 실행하기 전에 실행
- useEffect 함수가 처음 실행되는 경우를 제외한 실행되기 전에 클린업 함수가 실행
- 즉 모든 새로운 사이드이펙트 함수가 실행되기 전에, 컴포넌트가 제거되기 전에 실행

```js
// useEffect cleanup 함수를 이용한 debounce 구현
useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity');
    setFormIsValid(
      enteredEmail.includes('@') && enteredPassword.trim().length > 6
    );
  }, 500);

  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier);
  };
}, [enteredEmail, enteredPassword]);
```

#### useReducer

state 관리를 도와준다. 그래서 useState와 약간 비슷함.
하지만 더 많은 기능이 존재.

- 대부분의 경우에는 useState를 사용하는 것이 좋음.

항상 두 개의 값이 있는 배열을 반환

```js
const [state, dispatchFn] = useReducer(reducerFn, initialState, initFn);
```

하나는 최신 state 스냅샷, 하나는 새로운 state 값을 설정하는 대신 액션을 디스패치
그 액션은 useReducer의 첫 번째 인수가 소비한다. (reducerFn)

- reducerFn

  - 최신 statae 스냅샷을 자동으로 가져오는 함수.
  - 리액트는 새 액션이 디스패치될 때마다 리듀서 함수를 호출하기 때문에 디스패치된 액션을 가져온다.
  - 새로운 업데이트된 state를 반환한다.
  - 컴포넌트 함수 바깥에 만든다. 리듀서 함수 내부에서는 컴포넌트 함수 내부에서 만들어진 어떤 데이터도 필요하지 않기 때문
  - 리액트가 이 함수를 실행할 때 함수 내부에서 요청되고 사용되는 모든 데이터는 이 함수로 전달된다.

- initialState

  - 초기 state나 초기 함수를 설정

- initFn
  - 초기 state를 설정하기 위해 실행해야 하는 함수.

### 중첩 속성을 useEffect에 종속성으로 추가하기

useEffect()에 객체 속성을 종속성으로 추가하기 위해 dstructuring을 사용했습니다.

```js
const { isValid: emailIsValid } = emailState;
const { isValid: passwordIsValid } = passwordState;

useEffect(() => {
  const identifier = setTimeout(() => {
    console.log('Checking form validity');
    setFormIsValid(emailIsValid && passwordIsValid);
  }, 500);

  return () => {
    console.log('CLEANUP');
    clearTimeout(identifier);
  };
}, [emailIsValid, passwordIsValid]);
```

핵심은 우리가 destructuring을 사용한다는 것이 아니라, 전체 개체 대신 특정 속성을 종속성으로 전달한다는 것입니다.

### useState() vs useReducer()

- useState

  - 주요 state 관리 도구
  - 개별 state 및 데이터들을 다루기에 적합
  - 간단한 state에 적합하고 state 업데이트가 쉽고, 몇 종류 안되는 경우에 적합
  - state로서의 객체나 비슷한게 없다면 적합하다.

- useReducer
  - state로서의 객체가 있는 경우 또는 복잡한 state가 있다면 useReducer를 고려 가능
  - 더 강력하기 때문인데 강력하다는 것은 리듀서 함수를 쓸 수 있다는 것.
  - 복잡할 수 있는 로직을 컴포넌트 함수 body에서 별도의 리듀서 함수로 이동시킬 수 있다.
  - 연관된 state 조각들로 구성된 state 관련 데이터를 다루는 경우.

### React Context

리액트 내부적으로 state를 관리할 수 있도록 해주는 것

```js
// store/auth-context.js
import React from 'react';

const AuthContext = React.createContext({
  isLoggedIn: false,
});

export default AuthContext;
```

이 특정 컨텍스트를 앱에서 사용하려면 두 가지 작업을 수행해야 한다.

- 먼저 공급, 리액트에게 알려주는 것
  - 항상 첫 번째로 해야 하는 일
  - 공급한다는 것은 JSX 코드로 감싸는 것을 뜻함.
  - 컨텍스트를 활용할 수 있어야 하는 모든 컴포넌트를 감싼다.
- 공급하는 것 외에도, 소비해야 한다. 연동해야 하고, 리스닝해야 한다.

```js
<AuthContext.Provider>
  <MainHeader isAuthenticated={isLoggedIn} onLogout={logoutHandler} />
  <main>
    {!isLoggedIn && <Login onLogin={loginHandler} />}
    {isLoggedIn && <Home onLogout={logoutHandler} />}
  </main>
</AuthContext.Provider>
```

### useContext

컨텍스트를 활용하고 리스닝할 수 있게 해줍니다.
리액트 컴포넌트 함수에서 useContext를 호출하면 된다.
그리고 컨텍스트를 가리키는 포인터를 컨텍스트에게 전달한다

```js
const Navigation = props => {
  const ctx = useContext(AuthContext);

  return (
    <nav className={classes.nav}>
      <ul>
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Users</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <a href="/">Admin</a>
          </li>
        )}
        {ctx.isLoggedIn && (
          <li>
            <button onClick={props.onLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};
```

### 리액트 훅으로 작업할 때 지켜야 할 규칙

리액트 훅은 단순히 use로 시작하는 모든 함수입니다.

1. 리액트 훅은 리액트 함수에서만 호출해야 한다. 즉, 리액트 함수에서만
2. 리액트 훅은 리액트 컴포넌트 함수 또는 사용자 정의 훅 함수의 최상위 수준에서만 호출해야 한다.
   - 중첩 함수에서 훅을 호출하지 않아야 한다.
3. useEffect훅 한정 항상 참조하는 모든 항목을 의존성으로 useEffect 내부에 추가해야 한다.
   - 즉, useEffect를 사용하는 컴포넌트 함수 내부에서 오는 데이터들은, 의존성 배열로 이동해야 한다.
