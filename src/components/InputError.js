import React, { Component } from "react";
var classNames = require('classnames');

class InputError extends Component {
    render() {
        let visibility = this.props.visible? this.props.visible : this.props.errorMessage;
        let errorClass = classNames(this.props.className, {
            'error_container':   true,
            'visible':           visibility,
            'invisible':         !visibility
        });
        return (
            <div className={errorClass}>
                <span>{this.props.errorMessage}</span>
            </div>
        );
    }
}

export default InputError;