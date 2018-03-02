import React from 'react';
import ReactDOM from 'react-dom'
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main';
//import Index from './Index';

// Needed for onTouchTap
injectTapEventPlugin();

// Render the main app react component into the app div.
//ReactDOM.render(<Index />, document.getElementById('app'));
ReactDOM.render(<Main />, document.getElementById('app'));