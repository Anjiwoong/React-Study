# Section 08 ~

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
return <div className={`${styles.card} ${props.className}`}>{props.children}</div>;
```

- div에 값으로 className을 갖는 탬플릿 리터럴을 추가, 그 후 동적으로 추가 해준다. ${ styles.card }
- 두번째 값으로 ${props.className}을 추가 해준다.

### - 재사용 가능한 "Button" 컴포넌트 추가

Button 컴포넌트의 type 속성에 할당되는 값을 동적인 값이 된다.
type 값은 props.type으로 접근할 수 있게 설정하고 값이 지정되지 않을 경우를 대비해서 OR 연산자를 써주고 button을 설정해 줍니다.

```js
<button className={styles.button} type={props.type || "button"} onClick={props.onClick}>
  {props.children}
</button>
```

- 사용자 지정 button 컴포넌트에 있는 props를 통해 handler 함수를 가져오기 위해 props.onClick을 전달
