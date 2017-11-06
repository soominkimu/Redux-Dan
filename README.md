# Redux-Dan
##### Dan Abramov's egghead lecture codes

#### 1. The Single Immutable
> #### 1st principle of Redux
> The entire *state* of the application will be represented by one JavaScript object.
#### 2. Describing State Changes with Actions
> #### 2nd principle of Redux
> The state tree is read only. Any time you want to change the state, you have to dispatch an *action*.
#### 3. Pure and Impure Functions
#### 4. The Reducer Function
> #### 3rd principle of Redux
> To describe state mutations you have to write a function that takes the previous state of the app and the action being dispatched, then returns the next state of the app. This function is called the *Reducer*.
#### 5. Writing a Counter Reducer with Tests
#### 6. Store Methods: getState(), dispatch(), and subscribe()
#### 7. Implementing Store from Scratch
```javascript
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
#### 8. React Counter Example
#### 9.10. Avoiding Array Mutations with concat(), slice(), and ...spread / Object.assign() and ...spread
#### 11.12. Writing a Todo List Reducer (Adding & Toggling a Todo)
#### 13.14.15. Reducer Composition with Arrays, Objects, and combineReducers()
#### 16. Implementing combineReducers() from Scratch
```javascript
const combineReducers = (reducers) => {
	return (state = {}, action) => {
		return Object.keys(reducers).reduce(
			(nextState, key) => {
				nextState[key] = reducers[key](state[key], action);
			return nextState;
			},
			{}
		);
	};
};
```
#### 17.18.19. React Todo List Example (Adding, Toggling, and Filtering Todos)
#### 20.21. Extracting Presentational Components (Todo, TodoList / AddTodo, Footer, FilterLink)
#### 22.23. Extracting Container Components (FilterLink / VisibleTodoList, AddTodo)
#### 24.25.26. Passing the Store Down Explicitly via Props / Implicitly via Context / with <Provider> from React Redux
```javascript
class provider extends component {
	getchildcontext() {	// the getchildcontext function will be called when the state or props changes.
		return {
			store: this.props.store
		};
	}
	render() {
		return this.props.children;
	}
}
provider.childcontexttypes = {
	store: proptypes.object		// prop-types.js (react.proptypes is deprecated)
};

const { createStore } = Redux;

ReactDOM.render(
	<Provider store={createStore(todoApp)} >
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);
```
#### 27.28.29. Generating Containers with connect() from React Redux (VisibleTodoList / AddTodo / FilterLink)
```javascript
const { connect } = ReactRedux;

const mapStateToTodoListProps = (state) => {
	return {
		todos: getVisibleTodos(
			state.todos,
			state.vFilter
		)
	};
};
const mapDispatchToTodoListProps = (dispatch) => {
	return {
		onTodoClick: (id) => {
			dispatch({
				type: 'TOGGLE_TODO',
				id
			});
			console.log('store.dispatch(TOGGLE_TODO)');
		}
	};
};
const VisibleTodoList = connect(	// results to a Container Component
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);	// Presentational Component to connect to the Redux store

let nextTodoId = 0;
let AddTodo = ({ dispatch }) => {	// either presentational and container
	let input;			// Referencing Context in Stateless Functional Components
	return (
		<div>
			<input ref={node => { input = node; }} />
			<button onClick={() => {
				dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text: input.value
				});
				console.log('store.dispatch(ADD_TODO)');
				input.value = '';
			}}>Add Todo</button>
		</div>
	);
};
AddTodo = connect()(AddTodo);	// not subscribe to the store, just inject dispatch as a prop

const mapStateToLinkProps = (state, ownProps) => {
	return {
		active:
			ownProps.filter === state.vFilter
	};
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch({
				type: 'SET_VISIBILITY_FILTER',
				filter: ownProps.filter
			});
			console.log("store.dispatch(SET_VISIBILITY_FILTER)");
		}
	};
};
const FilterLink = connect(
	mapStateToLinkProps,
	mapDispatchToLinkProps
)(Link);
```
#### 30. Extracting Action Creators
```javascript
//*** Action Creators ***
let nextTodoId = 0;
const addTodo = (text) => {
	return {
		type: 'ADD_TODO',
		id: nextTodoId++,
		text
	};
};

const toggleTodo = (id) => {
	return {
		type: 'TOGGLE_TODO',
		id
	};
};

const setVisibilityFilter = (filter) => {
	return {
		type: 'SET_VISIBILITY_FILTER',
		filter
	};
};
//*** Action Creators ***
```
