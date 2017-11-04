ReactDOM.render(
	<div>
		<h3>05. Writing a Counter Reducer with Tests</h3>
		<h3>06. Store Methods: getState(), dispatch(), and subscribe()</h3>
		<h3>07. Implementing Store from Scratch</h3>
		<br/>
	</div>,
	document.getElementById('title')
);
//*** 05. Redux: Writing a Counter Reducer with Tests
// function counter(state = 0, action) {
const counter = (state = 0, action) => {
	switch (action.type) {
		case 'INCREMENT':	return state + 1;
		case 'DECREMENT':	return state - 1;
		default:			return state;
	}
}

expect( counter(0, { type: 'INCREMENT' }) ).toEqual(1);
expect( counter(1, { type: 'INCREMENT' }) ).toEqual(2);
expect( counter(2, { type: 'DECREMENT' }) ).toEqual(1);
expect( counter(1, { type: 'DECREMENT' }) ).toEqual(0);
expect( counter(1, { type: 'SOMETHING_ELSE' }) ).toEqual(1);
expect( counter(undefined, {}) ).toEqual(0);

console.log('Tests passed!');

//*** 06. Redux: Store Methods: getState(), dispatch(), and subscribe()
// const { createStore } = Redux;

//*** 07. Redux: Implementing Store from Scratch
const createStore = (reducer) => {
	let state;
	let listeners = [];

	console.log('createStore()');
	const getState = () => state;

	const dispatch = (action) => {
		state = reducer(state, action);
		listeners.forEach(listener => listener());
	};

	const subscribe = (listener) => {
		listeners.push(listener);
		return () => {
			listeners = listeners.filter(l => l != listener);
		};
	};

	dispatch({});

	return { getState, dispatch, subscribe };
};

const store = createStore(counter);

const render = () => {
	document.body.innerText += store.getState();
};

store.subscribe(render);
render();

document.addEventListener('click', () => {
	store.dispatch({ type: 'INCREMENT' });
});
