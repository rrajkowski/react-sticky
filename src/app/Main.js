import React, { Component } from 'react';
import NotesContainer from './NotesContainer';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';

class Main extends Component {
  constructor(props, context) {
    super(props);
    this.state = {
      hideSourceOnDrag: true,
      active: false
    }
  };
  render() {
    const { hideSourceOnDrag } = this.state;
    return (
      <div id="main">
        <h1>Sticky Notes</h1>
        <NotesContainer hideSourceOnDrag={hideSourceOnDrag} />
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend)(Main);
