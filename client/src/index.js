import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom' 
import dotenv from "dotenv";
//style
import 'spectre.css/dist/spectre.min.css';
import 'spectre.css/dist/spectre-icons.css';
dotenv.config();

ReactDOM.render(
	<BrowserRouter>
		<App />
	</BrowserRouter>,
	document.getElementById('root')
)
