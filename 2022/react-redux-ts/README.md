principle of redux

1. only one store
2. read only
3. pure function to change state

Steps to use the redux

-----------preparation steps----------

1. design reducer
2. design action-creators
3. design action-types which is an enum
4. design actions which define the typeof dispatch, it will determines whether the payload type is correct
5. create store and provide it in root file(index.tsx)

------------use steps ----------------
store is a collection of reducers

1. useDispatch(dispatch the action with reducer and change the state from store)
2. useSelector(get state from reducer)
3. dispacth(action.payload) //this is from action function
