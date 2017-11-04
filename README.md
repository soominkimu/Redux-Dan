# Redux-Dan
##### Dan Abramov's egghead lecture codes

1. Redux: The Single Immutable
```
(1) The entire state of the application will be represented by one JavaScript object.
```
2. Redux: Describing State Changes with Actions
```
(2) The state tree is read only. Any time you want to change the state, you have to dispatch an action.
```
3. Redux: Pure and Impure Functions
4. Redux: The Reducer Function
```
(3) To describe state mutations you have to write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the Reducer.
```
5. Redux: Writing a Counter Reducer with Tests
6. Redux: Store Methods: getState(), dispatch(), and subscribe()
7. Redux: Implementing Store from Scratch
```
const createStore = (reducer) => {
  let state;
  let listeners = [];
  const getState = () => state;
  const dispatch = (action) => {
    state = reducer(state, action);
    listeners.forEach(listener => listener());
  };
  const subscribe = (listener) => {
    listeners.push(listener);
    return() => {
      listeners = listeners.filter(l => l !== listener);
    }
  };
  dispatch({});   // dummy dispatch
  return {getState, dispatch, subscribe};
};
```
8. Redux: React Counter Example
9. Redux: Avoiding Array Mutations with concat(), slice(), and ...spread
10. Redux: Avoiding Object Mutations with Object.assign() and ...spread
11-12. Redux: Writing a Todo List Reducer (Adding & Toggling a Todo)
13-15. Redux: Reducer Composition with Arrays, Objects, and combineReducers()
16. Redux: Implementing combineReducers() from Scratch
17-19. Redux: React Todo List Example (Adding, Toggling, and Filtering Todos)
20-21. Redux: Extracting Presentational Components (Todo, TodoList / AddTodo, Footer, FilterLink)
22-23. Redux: Extracting Container Components (FilterLink / VisibleTodoList, AddTodo)

