import React from 'react';
import {render} from 'react-dom';
import injectTapEventPlugin from 'react-tap-event-plugin';
import Main from './Main'; // Our main react component

// Needed for onTouchTap
injectTapEventPlugin();

// Render the main app react component into the app div.
render(<Main />, document.getElementById('app'));
