/**
 * Implements a Note Container
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { createStore } from 'redux';
import counter from './reducers';
import update from 'immutability-helper';
import { DropTarget } from 'react-dnd';
import Types from './Types';
import Note from './Note'; // A Note component, Actions: drag/drop/animate

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

// counter store from redux
const store = createStore(counter);


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
  onIncrement: PropTypes.func.isRequired,
  counter: PropTypes.number.isRequired,
};

class NotesContainer extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      notes: {}
    };
  }

  addNote = () => {
    if(!this.state.active) {
      store.dispatch({ type: 'INCREMENT' });
      let notes = Object.assign({}, this.state.notes);
      const counter = store.getState();
      const devicePixelRatio = window.devicePixelRatio||1;
      const clientBoundingWidth = Math.round(document.body.getBoundingClientRect().width / devicePixelRatio);
      const clientBoundingHeight = Math.round(document.body.getBoundingClientRect().height / devicePixelRatio);
      const randomLeft = Math.floor(Math.random() * clientBoundingWidth-250) + 10;
      const randomTop = Math.floor(Math.random() * clientBoundingHeight) + 10;
      notes[counter] = {left: randomLeft, top: (randomTop + 50), zIndex: 998};
      this.setState({notes});
    }
  };

  moveNote(id, left, top, zIndex) {
    // set higher zIndex
    let notes = Object.assign({}, this.state.notes);
    for(let i in notes){
      if(notes.hasOwnProperty(i) && i !== id) {
        notes[i] = {
          id: notes[i].id,
          top: notes[i].top,
          left: notes[i].left,
          zIndex: 10
        };
      }
    }
    this.setState({notes});
    // moved Note
    this.setState(
        update(this.state, {
          notes: {
            [id]: {
              $merge: { left, top, zIndex }
            },
          },
        }),
    );
    //+zIndex
    this.setState(
        notes[id] = {
          zIndex: 999,
          styles: {
            zIndex: 999
          }
        }
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
        <p>Counter: {store.getState()}</p>
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
