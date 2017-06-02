import React, { Component } from "react";
import InputField from './InputField';
import BankAccounts from './BankAccounts';

class App extends Component {
    constructor(props){
      super(props);
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            firstNameErr: null,
            lastNameErr: null,
            emailErr: null
        };
    this.onSubmit = this.onSubmit.bind(this);
    this.validateFirstName = this.validateFirstName.bind(this);
    this.validateLastName = this.validateLastName.bind(this);
    this.validateEmail = this.validateEmail.bind(this);

    }

    validateFirstName(value) {
        let valid = false;
        let errorMessage = null;
        if (!value){
            errorMessage = 'First name is required';
        }
        else{
            valid = this.validatename(value);
            if (!valid){
                errorMessage = 'Should contain only small and capital letters';
            }
        }
        this.setState({
            firstName: value,
            firstNameErr: errorMessage
        });
        return valid;
    }
    validateLastName(value) {
        let valid = false;
        let errorMessage = null;
         if (!value){
             errorMessage = 'Last name is required';
         }
        else{
           valid = this.validatename(value);
           if (!valid){
               errorMessage = 'Should contain only small and capital letters';
           }
         }
        this.setState({
            lastName: value,
            lastNameErr: errorMessage
        });
        return valid;
    }
    validateEmail(value) {
        let valid = false;
        let errorMessage = null;
        if (!value){
            errorMessage = 'Email is required';
        }
        else if (!valid){
            let pattern = new RegExp(/^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i);
             valid = pattern.test(value);
            if (!valid){
                errorMessage = 'Should be a valid E-mail address';
            }
        }
        else {
            this.setState({
                email: value
            });
        }
        this.setState({
            email: value,
            emailErr: errorMessage
        });
        return valid;
    }
    validatename(value){
         let re = /^[a-zA-Z]*$/g;
         return re.test(value);
    }
    getData() {
        let bankData = this.bankAccounts.getData();
        console.log(bankData);
        return {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            bankAccounts: bankData.bankAccounts
        };
    }
    onSubmit(e){
         e.preventDefault();
        const {firstName,lastName, email} = this.state;

        const validFirstName = this.validateFirstName(firstName);
        const validLastName = this.validateLastName(lastName);
        const validEmail = this.validateEmail(email);

        let valid = this.bankAccounts.validateFields() && validFirstName && validLastName && validEmail;

        valid &&  alert('Form data ' + JSON.stringify(this.getData(),null, 4));
    }
    render() {
        const {firstNameErr,lastNameErr, emailErr} = this.state;
        return (
            <div className="App">
                <div className="title">
                   <h2>Register Account</h2>
                </div>
                <form onSubmit={ this.onSubmit} >
                    <InputField
                        type="text"
                        uniqueName='firstName'
                        label="First name"
                        validate={this.validateFirstName}
                        errorMessage= { firstNameErr }
                    />
                    <InputField
                        type="text"
                        uniqueName="lastName"
                        label="Last name"
                        validate={this.validateLastName}
                        errorMessage= { lastNameErr }
                    />
                    <InputField
                        type="email"
                        uniqueName="email"
                        label="Email"
                        validate={this.validateEmail}
                        errorMessage= { emailErr }
                    />
                    <div className="bank-accounts">
                        <BankAccounts ref={(input) => { this.bankAccounts = input; }} />
                    </div>
                    <button className="btn btn-warning submit-button" type="submit">Submit</button>
                </form>
            </div>
        )
    }
}

export default App;