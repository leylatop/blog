```js
/**
 * 1. 状态映射属性
 * 2. dispatch映射属性
 * 3. 状态变化监听，让组件刷新
 */
import React, { useContext, useLayoutEffect, useMemo, useReducer } from 'react'
import bindActionCreators from '../redux/bindActionCreators'
import ReactReduxContext from './ReactReduxContext'
/**
 * 
 * @param {*} mapStateToProps 把仓库状态映射为当前组件的属性
 * @param {*} mapDispatchToProps 把派发动作的方法映射为组件的属性（可以是函数、对象、或不传）  
 * 如果第二个参数可以不传的话，可以在组件中直接使用 this.props.dispatch({types: xxx, params:{}}) => 继承的是Provider
 * @returns 
 */
function connect(mapStateToProps, mapDispatchToProps = undefined) {
    return function (OldComponent) { // 参数为老组件
        // 返回的是新高阶组件（props）
        return function (props) {
            let { store } = React.useContext(ReactReduxContext)
            let { getState, dispatch, subscribe } = store
            // 拿到老的总状态
            const prevState = getState()
            // 状态映射为属性
            const stateProps = useMemo(() => mapStateToProps(prevState), [prevState])

            // 把dispatch映射为属性
            let dispatchProps = useMemo(() => {
                let dispatchProps
                if (typeof mapDispatchToProps === 'function') {
                    dispatchProps = mapDispatchToProps(dispatch)
                } else if (typeof mapDispatchToProps === 'object') {
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
                } else {
                    dispatchProps = { dispatch }
                }
                return dispatchProps
            }, [dispatch])


            // forceUpdate模拟的类组件的强制刷新方法
            const [, forceUpdate] = useReducer(x => x + 1, 0) // x+1是随意的，目的是为了刷新
            // 如果仓库中的状态发生变化之后，就会执行forceUpdate
            useLayoutEffect(() => {
                // subscribe 会return 一个取消订阅的函数，在函数销毁的时候会执行
                return subscribe(forceUpdate);
            }, [subscribe])

            // 本质上还是要渲染老组件，在新(函数)组件中返回老组件
            return <OldComponent {...props} {...stateProps} {...dispatchProps} />
        }
    }
}


function connect(mapStateToProps, mapDispatchToProps = undefined) {
    return function (OldComponent) {
        return class extends React.PureComponent {
            static contextType = ReactReduxContext;
            constructor(props, context) {
                super(props)
                let { store } = context
                let { getState, subscribe, dispatch } = store
                this.state = mapStateToProps(getState())
                // 当状态发生变化的时候，state会更新，继而更新子组件
                this.unsubscribe = subscribe(() => {
                    this.setState(mapStateToProps(getState()))
                })
                // 把dispatch映射为属性
                let dispatchProps;
                if (typeof mapDispatchToProps === 'function') {
                    dispatchProps = mapDispatchToProps(dispatch)
                } else if (typeof mapDispatchToProps === 'object') {
                    dispatchProps = bindActionCreators(mapDispatchToProps, dispatch)
                } else {
                    dispatchProps = { dispatch }
                }
                this.dispatchProps = dispatchProps
            }
            componentWillUnmount() {
                this.unsubscribe()
            }
            render() {
                return <OldComponent {...this.props} {...this.state} {...this.dispatchProps} />
            }
        }
    }
}

export default connect
```


#React/Redux