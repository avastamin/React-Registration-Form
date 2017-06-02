import React, { Component } from "react";
import InputError from './InputError';

class InputField extends Component {
    constructor(props){
        super(props);
        this.state ={
            value: null,
            valid: false,
            errorVisible: false
        }
        this.handleBlur = this.handleBlur.bind(this);
    }

    handleBlur(event) {
        let valid = this.props.validate(event.target.value);
        if (!valid){
            console.log(valid);
            this.setState({
                errorVisible: true
            });
        }

    }
    render() {
        return (
            <div className="input-wrap">
                <label>{this.props.label}</label>
                <input
                    type={this.props.type}
                    className={'form-control input-' + this.props.uniqueName}
                    onBlur={this.handleBlur}
                />
                <InputError
                    visible={this.state.errorVisible}
                    errorMessage={this.props.errorMessage} />
            </div>
        );
    }
}

export default InputField;