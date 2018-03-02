import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Paper from 'material-ui/Paper';
import {DragSource} from 'react-dnd';
import Types from './Types';
import ModalBg from './ModalBg';

/**
 * Implements a sticky note
 */


const noteSource = {
  beginDrag(props) {
    const { id, left, top, zIndex } = props;
    return { id, left, top, zIndex }
  },
};

function collect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  };
}

const propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  id: PropTypes.any.isRequired,
  left: PropTypes.number.isRequired,
  top: PropTypes.number.isRequired,
  zIndex: PropTypes.number.isRequired,
  hideSourceOnDrag: PropTypes.bool.isRequired,
  children: PropTypes.node,
};

class Note extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      bgColor: '#FFFFA5',
      close: 'none'
    };
  }

  // Toggle bgColor, flip, & scale with css
  toggleNote = () => {
    this.setState({
      active: !this.state.active,
      left: !this.state.active ? '45%': this.props.left,
      top: !this.state.active ? '45%' : this.props.top,
      bgColor: !this.state.active ? '#29B6F6' : '#FFFFA5',
      transform: !this.state.active ? 'scale(3.0) rotateY(180deg)' : 'scale(1.0) rotateY(0)',
      transition: !this.state.active ? '300ms ease-in' : '300ms ease-out',
      close: !this.state.active ? 'block' : 'none',
      position: !this.state.active ? 'fixed' : 'relative',
      zIndex: !this.state.active ? 10001 : this.state.zIndex,
    });
  };

  render() {
    const {
        hideSourceOnDrag,
        left,
        top,
        connectDragSource,
        isDragging,
        children,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null
    }

    return connectDragSource(
        <div className="dragable" >
         <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
         <Paper
           className="note"
           style={Object.assign({
           left: this.props.left,
           top: this.props.top,
           backgroundColor:this.state.bgColor,
           transform: this.state.transform,
           transition: this.state.transition,
           position: this.state.position,
           zIndex: this.state.zIndex,
         })}
         left={this.props.left}
         top={this.props.top}
         ref={this.props.id}
         zDepth={4}
         rounded={true}
         onClick={this.toggleNote}>
         <span className="close" style={Object.assign({}, close, {display: this.state.close})}>×</span>
         {!this.state.active && <p>Note:{this.props.id}</p>}
         </Paper>
         </MuiThemeProvider>
         {this.state.active && <ModalBg style={Object.assign({ zIndex: this.state.zIndex-1})} />}
         </div>
    )
  }
}

export default DragSource(Types.NOTE, noteSource, collect)(Note);
