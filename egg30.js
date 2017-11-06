ReactDOM.render(
	<div>
		<h3>30. Extracting Action Creators</h3>
	</div>,
	document.getElementById('title')
);

//*** Reducers ***
const todo = (state, action) => {	// individual to-dos
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

const todos = (state = [], action) => {		// to-do's array
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

const vFilter = (state = 'SHOW_ALL', action) => { // visibilityFilter
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			console.log(`SET_VISIBILITY_FILTER:${action.filter}`);
			return action.filter;
		default:
			return state;
	}
};
//*** Reducers ***

const { combineReducers } = Redux;
const todoApp = combineReducers({
	todos,
	vFilter
});

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

const { Component } = React;
const { Provider, connect } = ReactRedux;	// React bindings to the Redux library

const Todo = ({ // Presentational Component
	onClick,	// doesn't specify any behavior, but it knows how to render
	completed,
	text
}) => (
	<li
		onClick={onClick}
		style={{	// text-decoration CSS property
			textDecoration: completed ?
				'line-through red' :
				'none'
		}}>
		{text}
	</li>
);

const TodoList = ({ // Presentational Component
	todos,
	onTodoClick
}) => (
	<ul>
		{todos.map(todo =>
			<Todo
				key={todo.id}
				{...todo}
				onClick={() => onTodoClick(todo.id)}
			/>
		)}
	</ul>
);

let AddTodo = ({ dispatch }) => {	// either presentational and container
	let input;			// Referencing Context in Stateless Functional Components
	return (
		<div>
			<input ref={node => { input = node; }} />
			<button onClick={() => {
				dispatch(addTodo(input.value));
				console.log('store.dispatch(ADD_TODO)');
				input.value = '';
			}}>Add Todo</button>
		</div>
	);
};
AddTodo = connect()(AddTodo);	// not subscribe to the store, just inject dispatch as a prop

const getVisibleTodos = (
	todos,
	filter
) => {
	switch (filter) {
		case 'SHOW_ALL':		return todos;
		case 'SHOW_COMPLETED':	return todos.filter(t => t.completed);
		case 'SHOW_ACTIVE':		return todos.filter(t => !t.completed);
	}
};

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
			dispatch(toggleTodo(id));
			console.log('store.dispatch(TOGGLE_TODO)');
		}
	};
};
const VisibleTodoList = connect(	// results to a Container Component
	mapStateToTodoListProps,
	mapDispatchToTodoListProps
)(TodoList);	// Presentational Component to connect to the Redux store

const Link = ({ // Presentational Component
	active,
	children,
	onClick
}) => {
	if (active) {
		return <span>{children}</span>;		// not clickable
	}
	return (
		<a href='#'
			onClick={e => {
				e.preventDefault();	// to prevent the page scrolling to top for each click
				onClick();
			}}
		>{children}</a>
	);
};

const mapStateToLinkProps = (state, ownProps) => {
	return {
		active:
			ownProps.filter === state.vFilter
	};
};
const mapDispatchToLinkProps = (dispatch, ownProps) => {
	return {
		onClick: () => {
			dispatch(setVisibilityFilter(ownProps.filter));
			console.log("store.dispatch(SET_VISIBILITY_FILTER)");
		}
	};
};
const FilterLink = connect(
	mapStateToLinkProps,
	mapDispatchToLinkProps
)(Link);

const Footer = () => ( // Presentational Component
	<p>
		Show:
		{' '}<FilterLink filter='SHOW_ALL'		>All</FilterLink>
		{' '}<FilterLink filter='SHOW_ACTIVE'	>Active</FilterLink>
		{' '}<FilterLink filter='SHOW_COMPLETED'>Completed</FilterLink>
	</p>
);

const TodoApp = ({ store }) => (
	<div>
		<AddTodo />
		<VisibleTodoList />
		<Footer />
	</div>
);

const { createStore } = Redux;

ReactDOM.render(
	<Provider store={createStore(todoApp)} >
		<TodoApp />
	</Provider>,
	document.getElementById('root')
);
