import React, {Component} from 'react';

class ModalBg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      display: false
    };
  }

  toggleState = () => {
    this.setState = {
      display: !this.state.active ? 'block' : 'none'
    };
  };

  render() {
    return (
       <div className="paper-bg" style={Object.assign({display:this.state.display})} />
    );
  }
}

export default ModalBg;
