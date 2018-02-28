import React, {Component} from 'react';

class ModalBg extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      active: true
    };
  }

  render() {
    return (
       <div className="paper-bg" />
    );
  }
}

export default ModalBg;
