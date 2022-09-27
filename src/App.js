import React from 'react';

function App() {
	// say Hello - will appear in console where electron starts
  const getGreeting = async () => {
		const result = await api.sayHello('Here is your greeting: Hello!');
		console.log(result);
	};
	return (
		<main>
			<h1> Hello! This is the App component</h1>

			<h2> Say Hello - Renderer to Main </h2>
			<button onClick={getGreeting}> Greeting Button</button>
		</main>
	);
}

export default App;
