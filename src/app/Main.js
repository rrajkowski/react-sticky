/**
 * In this file, we create the Main React component
 */
import React, {Component} from 'react';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import Notes from './Notes'; // A Group of Notes



class Main extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: false,
      value: null
    };
  }


  render() {
    return (
      <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
        <div id="main">
          <h1>Sticky Notes</h1>
          <Notes/>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Main;
