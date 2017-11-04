ReactDOM.render(
	<div>
		<h3>09. Redux: Avoiding Array Mutations with concat(), slice(), and ...spread</h3>
		<h3>10. Redux: Avoiding Object Mutations with Object.assign() and ...spread</h3>
	</div>,
	document.getElementById('title')
);

const addCounter = (list) => {
	//	list.push(0);
	//	return list;

	// 	return list.concat([0]);
	
	return [...list, 0];
};

const removeCounter = (list, index) => {
	//	list.splice(index, 1);
	//	return list;
	
	//	return list
	//		.slice(0, index)
	//		.concat(list.slice(index + 1));
	
	return [
		...list.slice(0, index),
		...list.slice(index + 1)
	];
};

const incrementCounter = (list, index) => {
	//	list[index]++;
	//	return list;
	
	//	return list
	//		.slice(0, index)
	//		.concat([list[index] + 1])
	//		.concat(list.slice(index + 1));
	
	return [
		...list.slice(0, index),
		list[index] + 1,
		...list.slice(index + 1)
	];
};	

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

const testAddCounter = () => {
	const listBefore = [];
	const listAfter = [0];

	deepFreeze(listBefore);
	expect( addCounter(listBefore) ).toEqual(listAfter);
};

const testRemoveCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 20];

	deepFreeze(listBefore);
	expect( removeCounter(listBefore, 1) ).toEqual(listAfter);
};

const testIncrementCounter = () => {
	const listBefore = [0, 10, 20];
	const listAfter = [0, 11, 20];

	deepFreeze(listBefore);
	expect( incrementCounter(listBefore, 1) ).toEqual(listAfter);
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

testAddCounter();
testRemoveCounter();
testIncrementCounter();
testToggleTodo();
console.log('All tests passed.');
