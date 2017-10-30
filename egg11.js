ReactDOM.render(
	<div>
		<h3>11. Redux: Writing a Todo List Reducer (Adding a Todo)</h3>
		<h3>12. Redux: Writing a Todo List Reducer (Toggling a Todo)</h3>
	</div>,
	document.getElementById('title')
);

const todos = (state = [], action) => {		// reducer
	switch (action.type) {
		case 'ADD_TODO':
			return [
				...state,
				{
					id: action.id,
					text: action.text,
					completed: false
				}
			];
		case 'TOGGLE_TODO':
			return state.map(todo => {		// map function
				if (todo.id !== action.id) {
					return todo;
				}

				return {
					...todo,
					completed: !todo.completed
				};
			});
		default:
			return state;
	}
};

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
