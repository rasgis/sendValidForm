import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { AppUse } from './Components/AppUse/AppUse';
import { AppYup } from './Components/AppYup/AppYup';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
	<React.StrictMode>
		<div className="container">
			<AppUse />
			<AppYup />
		</div>
	</React.StrictMode>,
);
