import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import Types from './Types';
import Note from './Note'; // A Note component, Actions: drag/drop/animate

const notestyle = {
  margin: '0 auto',
  background: '#efefef',
  padding:'2em'
};

const notesTarget = {
  drop(props, monitor, component) {
    const item = monitor.getItem();
    const delta = monitor.getDifferenceFromInitialOffset();
    const left = Math.round(item.left + delta.x);
    const top = Math.round(item.top + delta.y);
    const zIndex = Math.round(999);
    component.moveNote(item.id, left, top, zIndex);
  }
};


function collect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    highlighted: monitor.canDrop(),
    itemType: monitor.getItemType()
  };
}
const propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  hideSourceOnDrag: PropTypes.bool.isRequired,
};

class NotesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notes: {},
      counter: 1
    };
  }

  addNote = () => {
    if(!this.state.active) {
      let notes = Object.assign({}, this.state.notes);
      let i = this.state.counter++;
      const randomLeft = Math.floor(Math.random() * 400) + 100;
      const randomTop = Math.floor(Math.random() * 200) + 50;
      const randomZindex = Math.floor(Math.random() * 100) - 10;
      notes[i] = {left: 100 + randomLeft, top: 40 + randomTop, zIndex: 100 + randomZindex};
      this.setState({notes});
    }
  };

  moveNote(id, left, top, zIndex) {
    // set higher zIndex
    let notes = Object.assign({}, this.state.notes);
    for(let i in notes){
      if(notes.hasOwnProperty(i)) {
        notes[i] = {
          id: notes[i].id,
          top: notes[i].top,
          left: notes[i].left,
          zIndex: notes[i].zIndex
        };
      }
    }
    this.setState({notes});
    // move Note
    this.setState(
        update(this.state, {
          notes: {
            [id]: {
              $merge: { left, top, zIndex },
            },
          },
        }),
    );
  }

  render() {
    const { connectDropTarget, hideSourceOnDrag } = this.props;
    let { notes } = this.state;
    return connectDropTarget(
      <div id="notesContainer">
        <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
          <RaisedButton
              label="Add Note"
              secondary={true}
              onTouchTap={this.addNote}/>
        </MuiThemeProvider>
        <p>&nbsp;</p>
        {Object.keys(notes).map(key => {
          const { left, top, zIndex } = notes[key];
          return (
            <Note
              key={key}
              id={key}
              left={left}
              top={top}
              zIndex={zIndex}
              hideSourceOnDrag={hideSourceOnDrag}
              >
            </Note>
          )
        })}
      </div>
    );
  }
}

export default DropTarget(Types.NOTE, notesTarget, collect)(NotesContainer);
