/**
 * Implements a Note
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import Paper from 'material-ui/Paper';
import {DragSource} from 'react-dnd';
import Types from './Types';
import ModalBg from './ModalBg';

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
      styles:{
        backgroundColor: '#FFFFA5',
        transform: '',
        transition: '',
        position: '',
        left: this.props.left,
        top: this.props.top,
      },
      zIndex: this.props.zIndex,
      close: 'none',
      active: false
    };
  }

  // Toggle bgColor, flip, & scale with css
  toggleNote = () => {
    this.setState({
      active: !this.state.active,
      closeDisplay: !this.state.active ? 'block' : 'none',
      styles: {
        backgroundColor: !this.state.active ? '#29B6F6' : '#FFFFA5',
        transform: !this.state.active ? 'scale(2.5) rotateY(180deg)' : 'scale(1.0) rotateY(0)',
        transition: !this.state.active ? '300ms ease-in' : '300ms ease-out',
        position: !this.state.active ? 'fixed' : '',
      },
      left: !this.state.active ? '45%' : this.state.left,
      top: !this.state.active ? '35%' : this.state.top,
      zIndex: !this.state.active ? 1001 : 100,
    });
  };

  render() {
    const {
        hideSourceOnDrag,
        connectDragSource,
        isDragging,
        children,
    } = this.props;
    if (isDragging && hideSourceOnDrag) {
      return null
    }

    return connectDragSource(
        <div className="dragable">
         <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
         <Paper
           className="note"
           style={Object.assign(this.state.styles, {
             left: this.props.left,
             top: this.props.top,
             zIndex: this.state.zIndex,
           })}
           ref={this.props.id}
           zDepth={4}
           rounded={true}
           onClick={this.toggleNote}>
         <span className="close" style={Object.assign({}, {display: this.state.closeDisplay})}>×</span>
         {!this.state.active && <p>Note:{this.props.id}</p>}
         </Paper>
         </MuiThemeProvider>
         {this.state.active && <ModalBg style={Object.assign({ zIndex: this.state.zIndex-1})} />}
         </div>
    )
  }
}

export default DragSource(Types.NOTE, noteSource, collect)(Note);
