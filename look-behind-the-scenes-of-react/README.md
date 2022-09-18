# Section 12

## A Look Behind The Scenes of React & Optimization Techniques

## 리액트가 하는 역할

가상 DOM이라는 개념을 사용하는 것

- 가상 DOM
  - 앱이 마지막에 만들어내는 컴포넌트 트리를 결정
  - 각각 하위 트리를 갖고 있는 컴포넌트들은 JSX 코드를 반환하고 가상 DOM은 컴포넌트 트리의 현재 모양과 최종 모양을 정한다.
  - 상태가 업데이트괴면 이 정보는 리액트 DOM으로 전달되어 갱신 전후의 상태 차이를 인식하고 리액트가 컴포넌트 트리를 통해 구성한 가상 스냅샷인 가상 DOM과 일치하도록 실제 DOM을 조작하는 방법을 알 수 있게 해준다.

상태나 props, 컨텍스트, 컴포넌트에 변경이 발생되면 컴포넌트 함수가 재실행되어 리액트가 이를 재평가 하게 된다.
하지만 이 재평가가 DOM을 다시 렌더링 하는 것은 아니다.
실제 DOM은 리액트가 구성한 컴포넌트의 이전 상태와 트리, 그리고 현재의 상태간의 차이점을 기반으로 변경이 필요할 때만 업데이트 된다. 즉, 실제 DOM은 필요한 경우에만 변경된다.

## React.memo()

React.memo는 함수형 컴포넌트를 최적화할 수 있다.
React.memo는 인자로 들어간 컴포넌트에 어떤 props가 입력되는지 확인하고 입력되는 모든 props의 신규 값을 확인한 뒤 이를 기존의 props의 값과 비교하도록 리액트에게 전달한다.

- props의 값이 바뀐 경우에만 컴포넌트를 재실행 및 재평가하게 된다.
- 부모 컴포넌트가 변경되었지만 그 컴포넌트의 props 값이 바뀌지 않았다면 컴포넌트 실행은 건너뛴다.

```js
const DemoOutput = props => {
  console.log('DemoOutput Running');
  return <MyParagraph>{props.show ? 'This is new!' : ''}</MyParagraph>;
};

export default React.memo(DemoOutput);
```

**왜 모든 컴포넌트에 적용하지 않을까?**

- 최적화에는 비용이 따른다.
- memo 메소드는 App에 변경이 발생할 때마다 이 컴포넌트로 이동하여 기존 props 값과 새로운 값을 비교한다.

그러면 리액트는 두 가지 작업을 할 수 있어야 한다.

- 기존의 props 값을 저장할 공간이 필요하고 비교하는 작업도 필요
- 이 각각의 작업은 개별적인 성능 비용이 필요하다.
- 이 성능 효율은 어떤 컴포넌트를 최적화 하느냐에 따라 달라지게 되고 컴포넌트를 재평가하는 데에 필요한 성능 비용과 props를 비교하는 성능 비용을 서로 맞바꾸게 된다.

자식 컴포넌트가 많아서 컴포넌트 트리가 매우 크다면 이 React.memo는 매우 유용하게 사용할 수 있다. 그리고 컴포넌트 트리의 상위에 위치해있다면 전체 컴포넌트 트리에 대한 쓸데없는 재렌더링을 막을 수 있다.

반대로 부모 컴포넌트를 매 번 재평가할 때마다 컴포넌트의 변화가 있거나 props의 값이 변화할 수 있는 경우라면 React.memo는 크게 의미를 갖지 못한다.

- 어떻게든 컴포넌트의 재렌더링이 필요하기 때문

```js
const Button = props => {
  console.log('Button Running');

  return (
    <button
      type={props.type || 'button'}
      className={`${classes.button} ${props.className}`}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default React.memo(Button);
```

**Button 컴포넌트에 React.memo를 적용했을 때에는 props에 있는 함수가 변경되지 않아도 계속 실행된다.**

이유는

- App컴포넌트는 함수이기 때문에 일반적인 자바스크립트 함수처럼 재실행된다.
- 이 함수는 사용자가 아닌 리액트에 의해 호출된다는 것
- App 함수의 모든 렌더링, 또는 모든 실행 사이클에서 완전히 새로운 함수이다. 즉 재사용하지 않는다.
- 매번 다시 만드는 상수이기 때문이다.

## useCallback()

컴포넌트 실행 전반에 걸쳐 함수를 저장할 수 있게 하는 훅으로 리액트에, 우리는 이 함수를 저장하고 매번 실행때마다 이 함수를 재생성할 필요가 없다는걸 알릴 수 있다.

- 객체 1과 객체 2가 있을 때 같을 메모리 안의 같은 위치를 가리키고 있다면 이 두 객체를 같은 객체라고 간주한다.

useEffect롸 마찬가지로, useCallback은 두 번째 인자가 필요하며, useEffect보다 더 많은 인자가 있어야 한다.

- 상태나, props, 컨텍스트를 지정할 수 있다.

```js
const toggleParagraphHandler = useCallback(() => {
  setShowParagraph(prev => !prev);
}, []);
```

## useMemo()

useCallback 이 함수에 대한 것을 저장하듯 모든 종류의 데이터를 저장할 수 있다.

- 첫 번재 인자에는 함수가 들어가야한다. 하지만 함수를 기억하는 것은 아니고 저장하고 싶은 것을 반환한다.
- 두 번째 인자에는 의존성 배열이 들어가게 되고 이 의존성 배열을 통해 저장된 값에 변경 사항이 생길 때마다 업데이트 된다.

useMemo를 사용해 데이터를 저장하면 이는 메모리를 사용하는 것이고 이런 함수 저장 또한 일정 성능을 사용하는 것이다.
