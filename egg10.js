ReactDOM.render(
	<h3>10. Redux: Avoiding Object Mutations with Object.assign() and ...spread</h3>,
	document.getElementById('title')
);

const toggleTodo = (todo) => {
	//	todo.completed = !todo.completed;
	// 	return todo;

	//	return {
	//		id: todo.id,
	//		text: todo.text,
	//		completed: !todo.completed
	//	};

	//	return Object.assign({}, todo, {
	//		completed: !todo.completed
	//	});

	return {
		...todo,
		completed: !todo.completed
	};
};

const testToggleTodo = () => {
	const todoBefore = {
		id: 0,
		text: 'Learn Redux',
		completed: false
	};
	const todoAfter = {
		id: 0,
		text: 'Learn Redux',
		completed: true
	};

	deepFreeze(todoBefore);
	expect( toggleTodo(todoBefore) ).toEqual(todoAfter);
};

testToggleTodo();
console.log('All tests passed.');
