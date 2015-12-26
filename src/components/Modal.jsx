import React from 'react';
import { connect } from 'react-redux';
import ReactModal from 'react-modal';
import ReactDOM from 'react-dom';

export default class Modal extends React.Component {
  constructor(props) {
    super(props);
  }

  requestClose() {
    if (this.props.onRequestClose) {
      this.props.onRequestClose();
    }
  }

  render() {
    const styles = {
      content: {
        top: null,
        right: null,
        bottom: null,
        left: null,
        padding: null
      }
    };

    let className = this.props.className || '';
    className = 'my-modal ' + className;

    return (
      <ReactModal 
        style={styles}
        {...this.props}
        className={className}
      >
        <h2 className="my-modal-title">{this.props.title}</h2>
        <div className="my-modal-inner">
          {this.props.children}
        </div>
      </ReactModal>
    );
  }
}

// {(() => {
//   if (this.props.showCloseButton) {
//     return <span onClick={this.requestClose.bind(this)} className="my-modal-close">X</span>
//   } else {
//     return '';
//   }
// })()}