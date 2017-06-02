import React, { Component } from "react";
import InputField from './InputField';
let IBAN = require('iban');

class BankAccounts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bankAccounts: [],
            errors: [],
            EmptyAcErr:''
        };
        this.addBankAccounts = this.addBankAccounts.bind(this);
    }
    addBankAccounts() {
        let accounts = this.state.bankAccounts.concat({ iban: "", bankName: ""});
        this.setState({
            bankAccounts: accounts,
            EmptyAcErr:''
        });
    }
    removeBankAccount(e, index) {
        this.setState({
            bankAccounts: this.state.bankAccounts.filter(function (account, indexFilter) {
                return index !== indexFilter;
            }),
        });
    }

    handleIBAN(value, index) {
        let bankAccounts = this.state.bankAccounts;
        let errors = this.state.errors;
        let valid = false;
        let errorMessage = null;

        if (!value){
            errorMessage = 'IBAN is required';
        }
        else{
            valid = IBAN.isValid(value); //IBAN.isValid('BE68539007547034'); // true
            if (!valid){
                errorMessage = 'Must be a valid IBAN';
            }
        }
        // Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object.
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        let bankAccount = Object.assign({}, bankAccounts[index], {iban: value});

        let error = Object.assign({}, errors[index], {iban: errorMessage});

        const newAccounts = [
            ...this.state.bankAccounts.slice(0, index),
            bankAccount,
            ...this.state.bankAccounts.slice(index + 1),
        ];
        const newErrors = [
            ...this.state.errors.slice(0, index),
            error,
            ...this.state.errors.slice(index + 1),
        ];

        this.setState({
            bankAccounts: newAccounts,
            errors: newErrors
        });
    }

    handleBankName(value, index) {
        let bankAccounts = this.state.bankAccounts;
        let errors = this.state.errors;
        let errorMessage = null;

        if (!value){
            errorMessage = 'Bank name is required';
        }
        // Object.assign() copies the values (of all enumerable own properties) from one or more source objects to a target object.
        // https://developer.mozilla.org/en/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
        let bankAccount = Object.assign({}, bankAccounts[index], {bankName: value});
        const newAccounts = [
            ...this.state.bankAccounts.slice(0, index),
            bankAccount,
            ...this.state.bankAccounts.slice(index + 1),
        ];


        let error = Object.assign({}, errors[index], {bankName: errorMessage});
        const newErrors = [
            ...this.state.errors.slice(0, index),
            error,
            ...this.state.errors.slice(index + 1),
        ];

        this.setState({
            bankAccounts: newAccounts,
            errors: newErrors
        });

    }
    validateFields() {
        let valid = true,
            errors = [],
            bankAccounts = this.state.bankAccounts;
        if (bankAccounts.length === 0) {
            this.setState({EmptyAcErr: "You should provide at least one bank account!"});
            valid = false;
        } else {
            this.setState({EmptyAcErr: ""});
        }

        bankAccounts.map((account, index) => {
            if (account.iban.length === 0){
                errors[index] = errors[index] || {};
                errors[index].iban = "IBAN is required";
                valid = false;
            }
            else if (!IBAN.isValid(account.iban)){
                errors[index] = errors[index] || {};
                errors[index].iban = "Must be a valid IBAN";
                valid = false;
            }

            if (account.bankName.length === 0){
                errors[index] = errors[index] || {};
                errors[index].bankName = "Bank name is required";
                valid = false;
            }

            return errors;
        });

        this.setState({errors: errors});

        return valid;

    }
    getData() {
        return {
            bankAccounts: this.state.bankAccounts
        };
    }

    render() {
        const { bankAccounts, errors, EmptyAcErr } = this.state;
        return (
            <div className="bank-accounts-section">
                <h2>Bank accounts</h2>
                {bankAccounts.length >0 && <div className="bank-account-list">
                    {bankAccounts.map((account, index) => {
                        const errorMsg = errors[index] || false;
                        return <div className="bank-account-elements" key={index}>
                            <span className="delete-account glyphicon glyphicon-trash" onClick={(e) =>this.removeBankAccount(e,index)}></span>
                            <InputField
                                type="text"
                                uniqueName={`${index}-iban`}
                                label="IBAN"
                                validate={(e)=>this.handleIBAN(e,index)}
                                errorMessage= { errorMsg.iban }
                            />
                            <InputField
                                type="text"
                                uniqueName={`${index}-bankname`}
                                label="Bank name"
                                required={true}
                                validate={(e)=>this.handleBankName(e,index)}
                                errorMessage= { errorMsg.bankName }/>
                        </div>
                    })}

                </div>}
                <span className="empty-error">{ EmptyAcErr }</span>
                <button className="btn btn-default add-bank-acc" type="button" onClick={this.addBankAccounts}>+Add bank account</button>
            </div>
        );
    }
}
export default BankAccounts;