# Section 08 ~ 09

## Add-User-Card

### - 재사용 가능한 "Card" 컴포넌트 추가

```js
// AddUser.js
<Card className={styles.input}>
  <form onSubmit={addUserHandler}>
    <label htmlFor="username">UserName</label>
    <input type="text" id="username" />
    <label htmlFor="age">Age (Years)</label>
    <input type="number" id="age" />
    <button type="submit">Add User</button>
  </form>
</Card>
```

여기서 Card는 사용자 지정 컴포넌트이지만 내장된 html 컴포넌트가 아니다.

사용자 정의 컴포넌트이기 때문에 그 컴포넌트 안에서 사용하는 props를 통해서만 작동할 수 있다.

```js
return <div className={styles.card}>{props.children}</div>;
```

- 우리가 원하는 것은 className의 도움으로 div에 적용하고 있는 css 클래스가 이미 적용하고 있는 card 클래스에 반영되는 것뿐만 아니라 Card 컴포넌트의 className props에 잠재적으로 들어오는 클래스에도 적용되도록 하는 것이다.

<br />

- 해결방법

```js
return (
  <div className={`${styles.card} ${props.className}`}>{props.children}</div>
);
```

- div에 값으로 className을 갖는 탬플릿 리터럴을 추가, 그 후 동적으로 추가 해준다. ${ styles.card }
- 두번째 값으로 ${props.className}을 추가 해준다.

### - 재사용 가능한 "Button" 컴포넌트 추가

Button 컴포넌트의 type 속성에 할당되는 값을 동적인 값이 된다.
type 값은 props.type으로 접근할 수 있게 설정하고 값이 지정되지 않을 경우를 대비해서 OR 연산자를 써주고 button을 설정해 줍니다.

```js
<button
  className={styles.button}
  type={props.type || 'button'}
  onClick={props.onClick}
>
  {props.children}
</button>
```

- 사용자 지정 button 컴포넌트에 있는 props를 통해 handler 함수를 가져오기 위해 props.onClick을 전달

### 이전 상태에 의존해서 상태를 업데이트

- 함수를 전달하는 폼을 사용한다.
- 리액트가 여기서 상태를 업데이트할 때 그 함수는 자동으로 이전 상태 중 가장 최신의 스냅샷을 갖고 온다.

```js
setUsersList(prevUsersList => {
  return [...prevUsersList, { name: uName, age: uAge }];
});
```

### 리액트 포탈

- modal같은 컴포넌트는 전체 페이지에 대한 오버레이다.
- 다른 모든 것 위에 있지만 html 코드 안에 중첩되어 있기 때문에 좋은 코드가 아니다.
- 오버레이 내용이 중첩되어 있으면 스크린 리더가 렌더링 되는 html코드를 해석할 때 일반적인 오버레이라고 인식하지 못할 수 있다.

포털을 사용하는데에 두 가지가 필요.

- 컴포넌트를 이동시킬 장소가 필요
- 컴포넌트에게 그 곳에 포탈을 가져야 한다고 알려줘야 한다.

```js
// public/index.html
  <div id="backdrop-root"></div>
  <div id="overlay-root"></div>
  <div id="root"></div>
```

div id 를 추가해서 나중에 이 장소를 찾아오는데 사용한다.

```js
// Backdrop 과 ModalOverlay 컴포넌트를 추가한다.
const Backdrop = props => {
  return <div className={styles.backdrop} onClick={props.onConfirm} />;
};

const ModalOverlay = props => {
  return (
    <Card className={styles.modal}>
      <header className={styles.header}>
        <h2>{props.title}</h2>
      </header>
      <div className={styles.content}>
        <p>{props.message}</p>
      </div>
      <footer className={styles.actions}>
        <Button onClick={props.onConfirm}>Okay</Button>
      </footer>
    </Card>
  );
};
```

모달을 두 개의 개별 컴포넌트로 나눴다.
이렇게 해야 포탈을 사용하기 쉽기 때문.

우선 react-dom에서 import를 해야 한다.

```js
import ReactDOM from 'react-dom';
```

이제 ReactDom에서 createPortal 메소드를 호출할 수 있다.

- createPortal 메소드는 두 개의 인수를 가진다.
- 첫 번째는 렌더링되어야 하는 리액트 노드
- 두 번째는 요소가 렌더링되어야 하는 실제 DOM의 컨테이너를 가리키는 포인터

```js
const ErrorModal = props => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop onConfirm={props.onConfirm} />,
        document.getElementById('backdrop-root')
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          title={props.title}
          message={props.message}
          onConfirm={props.onConfirm}
        />,
        document.getElementById('overlay-root')
      )}
    </>
  );
};
```

포털은 렌더링된 html 내용을 다른 곳으로 옮기는 것. jsx 코드 안에서
ReactDOM.createPortal은 어디에서나 사용할 수 있습니다
JSX 코드를 사용하는 어디에서나
