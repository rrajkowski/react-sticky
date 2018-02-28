import React, {Component} from 'react';
import PropTypes from 'prop-types';
import RaisedButton from 'material-ui/RaisedButton';
import { DropTarget, DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'
import Note from './Note'; // A Note component, Actions: drag/drop/animate

const notestyle = {
  minHeight: '500px',
  width: '95%',
  margin: '0 auto',
  background: '#efefef',
  padding:'2em'
};


const StickyNoteGroup = () => (
    <div id="SkickyNotesGroup" style={notestyle} />
);

const boxTarget = {
  drop(monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    component.moveBox(item.id, left, top);
  },
};

function collect(connect) {
  return {
    connectDropTarget: connect.dropTarget()
  };
}

class Notes extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      numNotes: 0
    };
  }

  addNote = () => {
    this.setState({
      numNotes: this.state.numNotes + 1,
    });
  };

  render() {
    const notes = [];
    for (let i=0; i < this.state.numNotes; i += 1) {
      notes.push(<Note key={i} number={i} enableModal={() => this.props.active } />);
    }
    //console.warn('notes: ', notes);

    return (
      <div>
        <RaisedButton
        label="Add Note"
        secondary={true}
        onTouchTap={this.addNote}/>
        <p>&nbsp;</p>
        {notes}
      </div>
    );
  }
}

export default DragDropContext(HTML5Backend, boxTarget, collect)(Notes);
