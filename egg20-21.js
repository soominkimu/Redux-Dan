ReactDOM.render(
	<div>
		<h3>20-21. Extracting Presentational Components (Todo, TodoList / AddTodo, Footer, FilterLink)</h3>
	</div>,
	document.getElementById('title')
);

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

// visibilityFilter
const vFilter = (state = 'SHOW_ALL', action) => {	// reducer
	switch (action.type) {
		case 'SET_VISIBILITY_FILTER':
			console.log(`SET_VISIBILITY_FILTER:${action.filter}`);
			return action.filter;
		default:
			return state;
	}
};

const { combineReducers } = Redux;
const todoApp = combineReducers({
	todos,
	vFilter
});

const { createStore } = Redux;
const store = createStore(todoApp);

const { Component } = React;

const FilterLink = ({ // Presentational Component
	filter,
	currentFilter,
	children,
	onClick
}) => {
	if (filter === currentFilter) {
		return <span>{children}</span>;
	}
	return (
		<a href='#'
			onClick={e => {
				e.preventDefault();
				onClick(filter);
			}}
		>{children}</a>
	);
};

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

const AddTodo = ({ // Presentational Component
	onAddClick
}) => {
	let input;
	return (
		<div>
			<input ref={node => { input = node; }} />
			<button onClick={() => {
				onAddClick(input.value);
				input.value = '';
			}}>Add Todo</button>
		</div>
	);
};

const Footer = ({ // Presentational Component
	vFilter,
	onFilterClick
}) => (
	<p>
		Show:
		{' '}<FilterLink 
				filter='SHOW_ALL'
				currentFilter={vFilter}
				onClick={onFilterClick}>All
			</FilterLink>
		{' '}<FilterLink 
				filter='SHOW_ACTIVE'
				currentFilter={vFilter}
				onClick={onFilterClick}>Active
			</FilterLink>
		{' '}<FilterLink 
				filter='SHOW_COMPLETED'
				currentFilter={vFilter}
				onClick={onFilterClick}>Completed
			</FilterLink>
	</p>
);

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

let nextTodoId = 0;
const TodoApp = ({	// Container Component
	todos,
	vFilter
}) => (
	<div>
		<AddTodo
			onAddClick={text => {
				store.dispatch({
					type: 'ADD_TODO',
					id: nextTodoId++,
					text
				});
				console.log('store.dispatch(ADD_TODO)');
			}}
		/>
		<TodoList
			todos={getVisibleTodos(todos, vFilter)}
			onTodoClick={id => {
				store.dispatch({
					type: 'TOGGLE_TODO',
					id
				});
				console.log('store.dispatch(TOGGLE_TODO)');
			}}
		/>
		<Footer
			vFilter={vFilter}
			onFilterClick={filter => {
				store.dispatch({
					type: 'SET_VISIBILITY_FILTER',
					filter
				});
				console.log('store.dispatch(SET_VISIBILITY_FILTER)');
			}}
		/>
	</div>
);

const render = () => {
	console.log('render()');
	ReactDOM.render(
		<TodoApp {...store.getState()} />,
		document.getElementById('root')
	);
};

console.log('store.subscribe(render))');
store.subscribe(render);
render();

