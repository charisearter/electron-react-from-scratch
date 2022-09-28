import React, { useState } from 'react';

function App() {
	const [msg, setMsg] = useState('This is the initial message');
	const [count, setCount] = useState(0);

	// say Hello - will appear in console where electron starts
	const getGreeting = async () => {
		const result = await api.sayHello('Here is your greeting: Hello!');
		console.log(result);
	};

	// Send message Renderer -> Main
	const sendMessage = () => {
		window.api.sendMsg(msg);
		// clear out message when done
		setMsg('');
	};

	const onMsgChange = e => {
		e.preventDefault();
		setMsg(e.target.value);
	};

	// Auto counter Main --> Renderer
	// window.api.onCount(data => {
	// 	setCount(data);
	// });

	return (
		<main>
			<h1> Hello! This is the App component</h1>

			<h2> Say Hello - Renderer to Main </h2>
			<button onClick={getGreeting}> Greeting Button</button>

			<hr />

			<h2>
				Send Messages (using Hooks) - Renderer to Main to Renderer -
				Bi-directional
			</h2>
			<p>
				Change the initial message to see it pop into console when button is
				clicked
			</p>
			<input type='text' value={msg} onChange={onMsgChange} />
			<button onClick={sendMessage}> Send message to Main</button>

			<hr />

			{/* <h2> Auto Counter </h2>
			<h1> Count: {count}</h1> */}
		</main>
	);
}

export default App;
