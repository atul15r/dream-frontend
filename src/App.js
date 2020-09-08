import React from "react";
import "./App.css";
import "antd/dist/antd.css";
import "semantic-ui-css/semantic.min.css";
import Nav from "./pages/Container";
import AddDream from "./components/AddDream";
import Dream from "./components/Dream";

function App() {
	return (
		<div className='App'>
			<Nav />
			<AddDream />
			<Dream />
		</div>
	);
}

export default App;
