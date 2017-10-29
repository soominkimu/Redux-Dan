ReactDOM.render(
	<h3>11. Redux: Writing a Todo List Reducer (Adding a Todo)</h3>,
	document.getElementById('title')
);

const todos = (state = [], action) => {
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

testAddTodo();
console.log('All tests passed.');
