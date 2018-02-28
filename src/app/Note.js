import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Paper from 'material-ui/Paper';
import {DragSource} from 'react-dnd';
import Types from './types';


/**
 * Implements the drag note
 */
const noteSource = {
  beginDrag(props) {
    const { id, left, top } = props
    return { id, left, top }
  },
};


function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  text: PropTypes.string.isRequired,
  isDragging: PropTypes.bool.isRequired,
  connectDragSource: PropTypes.func.isRequired
};

class Note extends Component {
  constructor(props, context, enableModal) {
    super(props, context);
    this.state = {
      active: enableModal,
      bgColor: '#FFFFA5',
      close: 'none'
    };
  }

  toggleNote = () => {
    // Toggle bgColor, flip, & zoom
    this.setState({
      active: !this.state.active,
      bgColor: !this.state.active ? '#29B6F6' : '#FFFFA5',
      opacity: !this.state.active ? 0.9 : 1,
      transform: !this.state.active ? 'scale(3.0) rotateY(180deg)' : 'scale(1.0) rotateY(0)',
      transition: !this.state.active ? '300ms ease-in' : '300ms ease-out',
      close: !this.state.active ? 'block' : 'none',
      position: !this.state.active ? 'fixed' : '',
      zIndex: !this.state.active ? 1000 : 100,
      margin: !this.state.active ? '-6% 0 0 6%' : '20px',
    });
    this.props.enableModal(!this.state.active);
  };

  render() {
    const { isDragging, connectDragSource } = this.props;
    if (isDragging) {
      return null
    }
    return connectDragSource(
      <div className="dragable">
        <Paper
          className="note"
          style={Object.assign({
              backgroundColor:this.state.bgColor,
              opacity: this.state.opacity,
              transform: this.state.transform,
              transition: this.state.transition,
              position: this.state.position,
              zIndex: this.state.zIndex,
              margin: this.state.margin
              })}
          zDepth={4}
          rounded={true}
          onClick={this.toggleNote}>
          <span className="close" style={Object.assign({}, close, {display: this.state.close})}>×</span>
        </Paper>
      </div>
    );
  }
}

export default DragSource(Types.NOTE, noteSource, collect)(Note);
