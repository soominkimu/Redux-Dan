ReactDOM.render(
	<div>
		<h3>11-12. Writing a Todo List Reducer (Adding & Toggling a Todo)</h3>
		<h3>13-15. Reducer Composition with Arrays, Objects, and combineReducers()</h3>
		<h3>16. Implementing combineReducers() from Scratch</h3>
	</div>,
	document.getElementById('title')
);

// 13. Reducer Composition with Arrarys
const todo = (state, action) => {	// reducer, individual to-dos
	switch (action.type) {
		case 'ADD_TODO':
			return {
				id: action.id,
				text: action.text,
				completed: false
			};
		case 'TOGGLE_TODO':
			if (state.id !== action.id) {
				return state;
			}
			return {
				...state,
				completed: !state.completed
			};
		default:
			return state;
	}
};

// 11, 12. Todo List Reducer (Adding & Toggling)
const todos = (state = [], action) => {		// reducer, to-do's array
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				todo(undefined, action)
			];
		case 'TOGGLE_TODO':
			return state.map(t => todo(t, action));
		default:
			return state;
	}
};

// 11, 12. Todo List Reducer (Adding & Toggling)	addresses two different concerns
//const todos = (state = [], action) => {		// reducer
//	switch (action.type) {
//		case 'ADD_TODO':
//			return [
//				...state,
//				{
//					id: action.id,
//					text: action.text,
//					completed: false
//				}
//			];
//		case 'TOGGLE_TODO':
//			return state.map(todo => {		// map function
//				if (todo.id !== action.id) {
//					return todo;
//				}
//
//				return {
//					...todo,
//					completed: !todo.completed
//				};
//			});
//		default:
//			return state;
//	}
//};

const testAddTodo = () => {
	const stateBefore = [];
	const action = {
		type: 'ADD_TODO',
		id: 0,
		text: 'Learn Redux'
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);
	expect( todos(stateBefore, action) ).toEqual(stateAfter);
};

const testToggleTodo = () => {
	const stateBefore = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Go shopping',
			completed: false
		}
	];
	const action = {
		type: 'TOGGLE_TODO',
		id: 1
	};
	const stateAfter = [
		{
			id: 0,
			text: 'Learn Redux',
			completed: false
		},
		{
			id: 1,
			text: 'Go shopping',
			completed: true
		}
	];

	deepFreeze(stateBefore);
	deepFreeze(action);
	expect( todos(stateBefore, action) ).toEqual(stateAfter);
}

testAddTodo();
testToggleTodo();
console.log('All tests passed.');

// 14. Reducer Composition with Objects
const visibilityFilter = (state = 'SHOW_ALL', action) => {	// reducer
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			return action.filter;
		default:
			return state;
	}
};

// 16. Implementing combineReducers() from Scratch
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

// 15. Reducer Composition with combineReducers()
//const { combineReducers } = Redux;
const todoApp = combineReducers({
	todos,
	visibilityFilter
});

//const todoApp = (state = {}, action) => {
//	return {
//		todos: todos(
//			state.todos,
//			action
//		),
//		visibilityFilter: visibilityFilter(
//			state.visibilityFilter,
//			action
//		)
//	};
//};

const { createStore } = Redux;
const store = createStore(todoApp);

const logState = (title) => {
	console.log(title);
	console.log(store.getState());
	console.log('--------------');
}

logState('Initial state:');

console.log('Dispatching ADD_TODO.');
store.dispatch({
	type: 'ADD_TODO',
	id: 0,
	text: 'Learn Redux'
});
logState('Current state:');

console.log('Dispatching ADD_TODO.');
store.dispatch({
	type: 'ADD_TODO',
	id: 0,
	text: 'Go shopping'
});
logState('Current state:');

console.log('Dispatching TOGGLE_TODO.');
store.dispatch({
	type: 'TOGGLE_TODO',
	id: 0
});
logState('Current state:');

console.log('Dispatching SET_VISIBILITY_FILTER');
store.dispatch({
	type: 'SET_VISIBILITY_FILTER',
	filter: 'SHOW_COMPLETED'
});
logState('Current state:');

