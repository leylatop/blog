store
getState
dispatch
reducer、action
subscribe 

- 一个简单的redux demo
```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
</head>

<body>
  <p id="value">0</p>
  <button id="add">+</button>
  <button id="sub">-</button>

  <script>
    function createStore(reducer) {
      let listeners = []
      let store = {
        num: 0
      }

      function getState() {
        return store
      }
      function dispatch(action) {
        store = reducer(store, action) // 每次调用dispatch都会返回一个新的state

        // 每次状态发生变化之后，都会执行listener 方法
        listeners.forEach(listener => listener())
      }

      function subscribe(listener) {
        listeners.push(listener)

        return function unsubscribe() {
          listeners = listeners.filter(l => l !== listener) // 取消订阅
        }
      }

      return {
        getState,
        dispatch,
        subscribe
      }
    }

    function reducer(state = {}, action) {
      switch (action.type) {
        case 'ADD':
          return {
            ...state,
            num: state.num + 1
          }
        case 'SUB':
          return {
            ...state,
            num: state.num - 1
          }
        default:
          return state
      }
    }

    const store = createStore(reducer)
    store.subscribe(() => {
      console.log('state changed')
    })

    const value = document.getElementById('value')
    const add = document.getElementById('add')
    const sub = document.getElementById('sub')

    function render(state) {
      value.innerHTML = state
    }



    add.addEventListener('click', (e) => {
      store.dispatch({ type: 'ADD' })
      render(store.getState().num)
    })

    sub.addEventListener('click', () => {
      store.dispatch({ type: 'SUB' })
      render(store.getState().num)
    })

  </script>
</body>

</html>
```